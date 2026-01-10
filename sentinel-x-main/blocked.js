// Logic for the SentinelX blocked page (moved out of inline script for MV3 CSP)

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const blockedUrl = urlParams.get('url') || 'Unknown URL';
const reason = urlParams.get('reason') || 'Security threat detected';

function updateStatus(message) {
  const statusEl = document.getElementById('status');
  if (statusEl) statusEl.textContent = message;
}

function initBlockedPage() {
  // Display immediately
  const blockedUrlEl = document.getElementById('blockedUrl');
  const reasonTextEl = document.getElementById('reasonText');

  if (blockedUrlEl) blockedUrlEl.textContent = blockedUrl;
  if (reasonTextEl) reasonTextEl.textContent = 'Reason: ' + reason;

  console.log('Blocked URL:', blockedUrl);
  console.log('Reason:', reason);

  // Wire up buttons
  const goBackBtn = document.getElementById('goBackBtn');
  const whitelistBtn = document.getElementById('whitelistBtn');
  const proceedBtn = document.getElementById('proceedBtn');

  if (goBackBtn) {
    goBackBtn.addEventListener('click', handleGoBack);
  }

  if (whitelistBtn) {
    whitelistBtn.addEventListener('click', handleWhitelist);
  }

  if (proceedBtn) {
    proceedBtn.addEventListener('click', handleProceed);
  }

  console.log('Blocked page ready');
}

// Go Back handler
function handleGoBack() {
  console.log('Go Back clicked');
  updateStatus('Closing tab...');

  chrome.runtime.sendMessage(
    { action: 'closeCurrentTab' },
    (response) => {
      console.log('Close response:', response);
      if (!response || !response.success) {
        updateStatus('Could not close tab. Close it manually.');
      }
    }
  );
}

// Whitelist handler
function handleWhitelist() {
  console.log('Whitelist clicked');
  updateStatus('Adding to whitelist...');

  chrome.runtime.sendMessage(
    {
      action: 'allowSiteAndNavigate',
      url: blockedUrl,
    },
    (response) => {
      console.log('Whitelist response:', response);
      if (response && response.success) {
        updateStatus('Site whitelisted! Redirecting...');
      } else {
        updateStatus('Error whitelisting site');
      }
    }
  );
}

// Proceed handler
function handleProceed() {
  console.log('Proceed clicked');

  if (!confirm('WARNING: This site may be dangerous. Continue?')) {
    return;
  }

  if (!confirm('FINAL WARNING: Proceed at your own risk?')) {
    return;
  }

  updateStatus('Navigating...');

  chrome.runtime.sendMessage(
    {
      action: 'navigateToUrl',
      url: blockedUrl,
    },
    (response) => {
      console.log('Navigate response:', response);
    }
  );
}

// Initialize once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlockedPage);
} else {
  initBlockedPage();
}
