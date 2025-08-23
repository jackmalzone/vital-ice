// Centralized Widget Manager for Mindbody widgets
// Handles script loading, widget creation, and error suppression

interface WidgetConfig {
  type: 'newsletter' | 'registration';
  widgetId: string;
  dataType: string;
  partner?: string;
  version?: string;
}

export class WidgetManager {
  private static instances = new Map<string, boolean>();
  private static scripts = new Set<string>();
  private static scriptPromises = new Map<string, Promise<void>>();

  // Widget configurations
  private static readonly WIDGET_CONFIGS: Record<string, WidgetConfig> = {
    newsletter: {
      type: 'newsletter',
      widgetId: 'ec59331b5f7',
      dataType: 'prospects',
      partner: 'object',
      version: '0',
    },
    registration: {
      type: 'registration',
      widgetId: 'ec161013b5f7',
      dataType: 'registrations',
      partner: 'object',
      version: '0',
    },
  };

  // Script dependencies for each widget type
  private static readonly SCRIPT_DEPS: Record<string, string[]> = {
    newsletter: ['https://widgets.mindbodyonline.com/javascripts/healcode.js'],
    registration: [
      'https://brandedweb.mindbodyonline.com/embed/widget.js',
      'https://widgets.mindbodyonline.com/javascripts/healcode.js',
    ],
  };

  /**
   * Load a widget of the specified type into the given container
   */
  static async loadWidget(
    type: 'newsletter' | 'registration',
    container: HTMLElement
  ): Promise<boolean> {
    try {
      // Load required scripts
      await this.loadScripts(type);

      // Wait a bit for scripts to fully initialize
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create widget HTML string
      const widgetHTML = this.createWidgetHTML(type);
      container.innerHTML = widgetHTML;

      // Wait for widget to initialize
      await new Promise(resolve => setTimeout(resolve, 200));

      // Setup error suppression for this widget
      this.setupErrorSuppression();

      return true;
    } catch (error) {
      console.error(`Failed to create ${type} widget:`, error);
      return false;
    }
  }

  /**
   * Load all required scripts for a widget type
   */
  private static async loadScripts(type: string): Promise<void> {
    const scripts = this.SCRIPT_DEPS[type] || [];
    const loadPromises = scripts.map(src => this.loadScript(src));
    await Promise.all(loadPromises);
  }

  /**
   * Load a single script, with caching to prevent duplicate loads
   */
  private static async loadScript(src: string): Promise<void> {
    // Check if already loaded
    if (this.scripts.has(src)) {
      return;
    }

    // Check if already loading
    if (this.scriptPromises.has(src)) {
      return this.scriptPromises.get(src);
    }

    // Create loading promise
    const loadPromise = new Promise<void>((resolve, reject) => {
      // Check if script already exists in DOM
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        this.scripts.add(src);
        resolve();
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        this.scripts.add(src);
        resolve();
      };

      script.onerror = error => {
        console.error(`Failed to load script: ${src}`, error);
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
    });

    this.scriptPromises.set(src, loadPromise);
    await loadPromise;
    this.scriptPromises.delete(src);
  }

  /**
   * Create widget HTML string with proper attributes
   */
  static createWidgetHTML(type: string): string {
    const config = this.WIDGET_CONFIGS[type];
    if (!config) {
      throw new Error(`Unknown widget type: ${type}`);
    }

    // Build the HTML string with all required attributes
    let htmlString = `<healcode-widget data-type="${config.dataType}" data-widget-id="${config.widgetId}" data-widget-version="${config.version}"`;

    if (config.partner) {
      htmlString += ` data-widget-partner="${config.partner}"`;
    }

    // Add additional attributes to prevent null reference errors
    htmlString += ` data-widget-config="{}" data-widget-options="{}"></healcode-widget>`;

    return htmlString;
  }

  /**
   * Setup error suppression for Mindbody widgets
   */
  private static setupErrorSuppression(): void {
    // Suppress jQuery Migrate warnings
    if ((window as { jQuery?: { migrateMute?: boolean } }).jQuery) {
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery!.migrateMute = true;
    }

    // Suppress jQuery errors related to null properties
    const jQuery = (window as { jQuery?: { fn?: { error: () => unknown } } }).jQuery;
    if (jQuery?.fn) {
      jQuery.fn.error = function () {
        return this;
      };
    }
  }

  /**
   * Reset widget state (useful for testing or error recovery)
   */
  static resetWidget(widgetKey: string): void {
    this.instances.delete(widgetKey);
  }

  /**
   * Clear all widget instances (useful for cleanup)
   */
  static clearAll(): void {
    this.instances.clear();
  }

  /**
   * Get widget configuration
   */
  static getWidgetConfig(type: 'newsletter' | 'registration'): WidgetConfig | undefined {
    return this.WIDGET_CONFIGS[type];
  }

  /**
   * Check if widget is already created
   */
  static isWidgetCreated(widgetKey: string): boolean {
    return this.instances.has(widgetKey);
  }
}
