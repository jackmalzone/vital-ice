'use client';

import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function ProfilingTestPage() {
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runManualTransaction = async () => {
    addResult('Starting manual transaction test...');

    // Debug: Check if Sentry is available
    console.log('Sentry object:', Sentry);
    console.log('Sentry.startSpan available:', typeof Sentry.startSpan);
    console.log('Sentry.captureException available:', typeof Sentry.captureException);

    addResult('Sentry debug info logged to console');

    // Test basic Sentry functionality first
    try {
      Sentry.captureMessage('Profiling test started', {
        level: 'info',
        tags: {
          test_type: 'profiling_verification',
          browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 'other',
        },
      });
      addResult('✅ Basic Sentry message sent successfully');
    } catch (error) {
      addResult(`❌ Error sending basic Sentry message: ${error}`);
    }

    // Test browser profiling API availability
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg');
    const isEdge = userAgent.includes('Edg');

    addResult(`Browser: ${isChrome ? 'Chrome' : isEdge ? 'Edge' : 'Other'}`);
    addResult(`User Agent: ${userAgent.substring(0, 50)}...`);

    // Check if browser profiling API is available
    if (typeof window !== 'undefined' && 'Profiler' in window) {
      addResult('✅ Browser Profiling API is available');
    } else {
      addResult('❌ Browser Profiling API is NOT available');
      addResult('Note: Profiling only works in Chromium-based browsers');
    }

    // Test Document-Policy header
    try {
      const policy = document.policy;
      if (policy && policy.allowsFeature('js-profiling')) {
        addResult('✅ Document-Policy: js-profiling is set correctly');
      } else {
        addResult('❌ Document-Policy: js-profiling is NOT set correctly');
        addResult('Check Network tab → Response Headers for Document-Policy');
      }
    } catch (error) {
      addResult(`⚠️ Could not check Document-Policy: ${error}`);
    }

    // Use startSpan instead of startTransaction for client-side
    await Sentry.startSpan(
      {
        name: 'Manual Profiling Test',
        op: 'test.profiling',
      },
      async span => {
        try {
          // Add some attributes
          span.setAttribute('test_type', 'manual_transaction');
          span.setAttribute('browser', navigator.userAgent.includes('Chrome') ? 'chrome' : 'other');

          // Simulate some work that will be profiled
          addResult('Running CPU-intensive work...');
          const start = performance.now();

          let result = 0;
          for (let i = 0; i < 1000000; i++) {
            result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
            if (i % 100000 === 0) {
              // Allow other tasks to run
              await new Promise(resolve => setTimeout(resolve, 0));
            }
          }

          const end = performance.now();
          const duration = end - start;

          span.setAttribute('duration_ms', duration.toString());
          span.setAttribute('result', result.toString());

          addResult(`CPU work completed in ${duration.toFixed(2)}ms`);

          // Simulate an API call
          addResult('Simulating API call...');
          await Sentry.startSpan(
            {
              op: 'http.client',
              name: 'Test API Call',
            },
            async apiSpan => {
              apiSpan.setAttribute('http.url', 'https://api.example.com/test');
              apiSpan.setAttribute('http.method', 'GET');

              // Simulate network delay
              await new Promise(resolve => setTimeout(resolve, 500));

              // Simulate processing
              let apiResult = 0;
              for (let j = 0; j < 100000; j++) {
                apiResult += Math.log(j + 1);
              }

              apiSpan.setAttribute('result', apiResult.toString());
              addResult('API call completed');
            }
          );

          addResult('Manual transaction test completed successfully!');
        } catch (error) {
          addResult(`Error during test: ${error}`);
          Sentry.captureException(error);
        }
      }
    );

    addResult('Transaction finished and sent to Sentry');
  };

  useEffect(() => {
    // Wait for Sentry to be fully initialized before running tests
    const waitForSentry = async () => {
      addResult('Waiting for Sentry to initialize...');

      // Wait a bit longer to ensure profiling integration is ready
      await new Promise(resolve => setTimeout(resolve, 3000));

      addResult('Sentry should be initialized now, starting test...');
      await runManualTransaction();
    };

    waitForSentry();
  }, []);

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1>🚀 Sentry Profiling Test Page</h1>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Instructions:</h3>
        <ol>
          <li>This page automatically runs a manual transaction test</li>
          <li>Check the console for detailed logs</li>
          <li>Wait 2-5 minutes for data to appear in Sentry</li>
          <li>Go to Sentry → Performance → Look for &quot;Manual Profiling Test&quot;</li>
        </ol>
      </div>

      <button
        onClick={runManualTransaction}
        style={{
          backgroundColor: '#00b7b5',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Run Manual Transaction Test
      </button>

      <div
        style={{
          backgroundColor: '#000',
          color: '#00ff00',
          padding: '20px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        <h3 style={{ color: '#fff', marginTop: 0 }}>Test Results:</h3>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {result}
          </div>
        ))}
        {results.length === 0 && <div style={{ color: '#888' }}>Waiting for test to start...</div>}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
        }}
      >
        <h4>🔍 What to Check:</h4>
        <ul>
          <li>
            <strong>Browser Console:</strong> Look for Sentry logs and profiling messages
          </li>
          <li>
            <strong>Network Tab:</strong> Check for requests to Sentry
          </li>
          <li>
            <strong>Sentry Dashboard:</strong> Performance tab → Look for &quot;Manual Profiling
            Test&quot; transaction
          </li>
          <li>
            <strong>Profiling Data:</strong> Click on the transaction to see flame graphs and
            profiling data
          </li>
        </ul>
      </div>
    </div>
  );
}
