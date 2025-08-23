'use client';

import { FC, useEffect, useState } from 'react';
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
  const [widgetKey] = useState(`${type}-${Date.now()}`);

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setIsLoading(true);
        setHasError(false); // Reset error state when starting to load
        onLoading?.();

        // Add a small delay to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));

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
          onLoad?.();
        } else {
          setIsLoading(false);
          setHasError(true);
          onError?.();
        }
      } catch (error) {
        console.error(`Failed to load ${type} widget:`, error);
        setIsLoading(false);
        setHasError(true);
        onError?.();
      }
    };

    loadWidget();

    // Cleanup function
    return () => {
      // Reset widget state when component unmounts
      WidgetManager.resetWidget(widgetKey);
    };
  }, [type, widgetKey, onError, onLoad, onLoading]);

  const handleRetry = async () => {
    setHasError(false);
    setIsLoading(true);
    onLoading?.();

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
        onLoad?.();
      } else {
        setIsLoading(false);
        setHasError(true);
        onError?.();
      }
    } catch (error) {
      console.error(`Failed to retry ${type} widget:`, error);
      setIsLoading(false);
      setHasError(true);
      onError?.();
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
