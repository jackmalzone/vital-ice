'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { WidgetManager } from '@/lib/widgets/WidgetManager';
import styles from './Widget.module.css';

interface WidgetProps {
  type: 'newsletter' | 'registration';
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
  onLoading?: () => void;
}

export const Widget: FC<WidgetProps> = ({ type, className, onError, onLoad, onLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [widgetHTML, setWidgetHTML] = useState('');
  const widgetKeyRef = useRef(`${type}-${Date.now()}`);
  const widgetKey = widgetKeyRef.current;

  // Store callbacks in refs to avoid dependency issues
  const onErrorRef = useRef(onError);
  const onLoadRef = useRef(onLoad);
  const onLoadingRef = useRef(onLoading);

  // Update refs when callbacks change
  onErrorRef.current = onError;
  onLoadRef.current = onLoad;
  onLoadingRef.current = onLoading;

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        onLoadingRef.current?.();

        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.id = widgetKey;

        const success = await WidgetManager.loadWidget(type, tempContainer);

        if (success) {
          // Get the widget HTML
          const html = WidgetManager.createWidgetHTML(type);
          setWidgetHTML(html);
          setIsLoading(false);
          setHasError(false);
          onLoadRef.current?.();
        } else {
          setIsLoading(false);
          setHasError(true);
          onErrorRef.current?.();
        }
      } catch (error) {
        console.error(`Failed to load ${type} widget:`, error);
        setIsLoading(false);
        setHasError(true);
        onErrorRef.current?.();
      }
    };

    loadWidget();

    // Cleanup function
    return () => {
      // Reset widget state when component unmounts
      WidgetManager.resetWidget(widgetKey);
    };
  }, [type]);

  const handleRetry = async () => {
    setHasError(false);
    setIsLoading(true);
    onLoadingRef.current?.();

    try {
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.id = widgetKey;

      const success = await WidgetManager.loadWidget(type, tempContainer);

      if (success) {
        const html = WidgetManager.createWidgetHTML(type);
        setWidgetHTML(html);
        setIsLoading(false);
        setHasError(false);
        onLoadRef.current?.();
      } else {
        setIsLoading(false);
        setHasError(true);
        onErrorRef.current?.();
      }
    } catch (error) {
      console.error(`Failed to retry ${type} widget:`, error);
      setIsLoading(false);
      setHasError(true);
      onErrorRef.current?.();
    }
  };

  return (
    <div className={`${styles.widgetContainer} ${className || ''}`}>
      <div className={styles.widgetContent} dangerouslySetInnerHTML={{ __html: widgetHTML }} />

      {isLoading && !hasError && (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p>Loading widget...</p>
        </div>
      )}

      {hasError && !isLoading && (
        <div className={styles.errorState}>
          <p>Widget temporarily unavailable</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
