// SentinelX Guardian - Content Script (Simplified & Robust)
// Runs on all web pages to analyze content and detect threats

(function () {
    'use strict';

    console.log('=== SentinelX Content Script Start ===');
    console.log('Page URL:', window.location.href);

    // Prevent multiple initializations
    if (window.sentinelXInitialized) {
        console.log('Already initialized, skipping...');
        return;
    }
    window.sentinelXInitialized = true;

    // Run analysis after a short delay to ensure page is loaded
    setTimeout(runAnalysis, 500);

    // Also run on DOM changes (debounced)
    let analyzeTimer = null;
    const observer = new MutationObserver(() => {
        if (analyzeTimer) clearTimeout(analyzeTimer);
        analyzeTimer = setTimeout(runAnalysis, 2000);
    });

    // Start observing when body is available
    function startObserving() {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            console.log('Started observing DOM changes');
        }
    }

    if (document.body) {
        startObserving();
    } else {
        document.addEventListener('DOMContentLoaded', startObserving);
    }

    function runAnalysis() {
        console.log('Running page analysis...');

        try {
            const pageData = collectPageData();
            console.log('Page data collected:', {
                url: pageData.url,
                textLength: pageData.text.length,
                forms: pageData.forms,
                links: pageData.links.length,
                scripts: pageData.scripts
            });

            // Send to background for analysis
            chrome.runtime.sendMessage(
                {
                    action: 'analyzePage',
                    data: pageData
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Runtime error:', chrome.runtime.lastError.message);
                        return;
                    }

                    if (response) {
                        console.log('Analysis received:', response);
                        showWarningIfNeeded(response);
                    } else {
                        console.warn('No response from background');
                    }
                }
            );

        } catch (error) {
            console.error('Analysis error:', error);
        }
    }

    function collectPageData() {
        // Get page text safely
        let text = '';
        try {
            text = document.body ? (document.body.innerText || '') : '';
        } catch (e) {
            console.warn('Could not get page text:', e);
        }

        // Count forms
        let forms = 0;
        try {
            forms = document.querySelectorAll('form').length;
        } catch (e) {
            console.warn('Could not count forms:', e);
        }

        // Get links
        let links = [];
        try {
            const linkElements = document.querySelectorAll('a[href]');
            links = Array.from(linkElements)
                .map(a => a.href)
                .filter(href => href && !href.startsWith('javascript:'));
        } catch (e) {
            console.warn('Could not get links:', e);
        }

        // Count scripts
        let scripts = 0;
        try {
            scripts = document.querySelectorAll('script[src]').length;
        } catch (e) {
            console.warn('Could not count scripts:', e);
        }

        return {
            url: window.location.href,
            text: text.substring(0, 10000), // Limit size
            forms: forms,
            links: links,
            scripts: scripts
        };
    }

    function showWarningIfNeeded(analysis) {
        console.log('Checking if warning needed for level:', analysis.threatLevel);

        // Only show for medium, high, or critical threats
        const shouldShow = ['medium', 'high', 'critical'].includes(analysis.threatLevel);

        if (!shouldShow) {
            console.log('Threat level too low, removing any existing warning');
            removeWarning();
            return;
        }

        console.log('Creating warning banner...');

        // Remove existing warning
        removeWarning();

        // Create and show warning
        if (document.body) {
            const warning = createWarningBanner(analysis);
            document.body.insertBefore(warning, document.body.firstChild);

            // Animate in
            setTimeout(() => {
                warning.style.transform = 'translateY(0)';
                warning.style.opacity = '1';
            }, 10);

            console.log('Warning banner shown');
        } else {
            console.warn('No document.body, cannot show warning');
        }
    }

    function createWarningBanner(analysis) {
        const banner = document.createElement('div');
        banner.id = 'sentinelx-warning';

        // Base styles
        banner.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 2147483647 !important;
      padding: 16px 20px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      transform: translateY(-100%) !important;
      opacity: 0 !important;
      transition: all 0.3s ease !important;
      color: white !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
    `;

        // Color based on threat level
        const colors = {
            medium: { bg: '#f59e0b', border: '#d97706' },
            high: { bg: '#dc2626', border: '#991b1b' },
            critical: { bg: '#991b1b', border: '#7f1d1d' }
        };

        const color = colors[analysis.threatLevel] || colors.high;
        banner.style.background = `linear-gradient(135deg, ${color.bg} 0%, ${color.bg}dd 100%)`;
        banner.style.borderBottom = `3px solid ${color.border}`;

        // Content
        const titles = {
            medium: '⚠️ Security Alert',
            high: '⚠️ High Risk Detected',
            critical: '🚨 CRITICAL THREAT DETECTED'
        };

        const title = titles[analysis.threatLevel] || 'Security Alert';
        const count = analysis.threats ? analysis.threats.length : 0;

        banner.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <div style="font-size: 24px; flex-shrink: 0;">⚠️</div>
        <div style="flex: 1; min-width: 200px;">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${title}</div>
          <div style="font-size: 14px; opacity: 0.95;">SentinelX detected ${count} security threat${count !== 1 ? 's' : ''} on this page. Exercise caution.</div>
        </div>
        <button id="sentinelx-close" style="background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; flex-shrink: 0;">✕</button>
      </div>
    `;

        // Close button handler
        const closeBtn = banner.querySelector('#sentinelx-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                banner.style.transform = 'translateY(-100%)';
                banner.style.opacity = '0';
                setTimeout(() => banner.remove(), 300);
            };

            closeBtn.onmouseover = () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            };

            closeBtn.onmouseout = () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            };
        }

        return banner;
    }

    function removeWarning() {
        const existing = document.getElementById('sentinelx-warning');
        if (existing) {
            existing.remove();
            console.log('Removed existing warning');
        }
    }

    console.log('=== SentinelX Content Script Ready ===');

})();