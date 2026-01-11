// SentinelX Guardian Pro - Enhanced Popup

console.log('🛡️ SentinelX Pro Popup initialized');

let currentTab = null;
let currentAnalysis = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      showError('No active tab');
      return;
    }

    currentTab = tab;
    console.log('Current tab:', tab.url);

    // Load stats
    await loadQuickStats();

    // Load analysis
    await loadAnalysis(tab.id);

    // Load recent activity
    await loadRecentActivity();

    // Setup event listeners
    setupEventListeners();

  } catch (error) {
    console.error('Init error:', error);
    showError('Failed to initialize');
  }
}

function setupEventListeners() {
  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById('rescanBtn')?.addEventListener('click', rescanPage);
  document.getElementById('whitelistBtn')?.addEventListener('click', whitelistSite);
  document.getElementById('blockBtn')?.addEventListener('click', blockSite);
  document.getElementById('viewHistoryBtn')?.addEventListener('click', viewHistory);
  document.getElementById('reportBtn')?.addEventListener('click', reportIssue);
  document.getElementById('helpBtn')?.addEventListener('click', showHelp);
}

async function loadQuickStats() {
  try {
    const stats = await chrome.runtime.sendMessage({ action: 'getStats' });

    if (stats) {
      document.getElementById('quickBlocked').textContent = stats.threatsBlocked || 0;
      document.getElementById('quickScanned').textContent = stats.sitesScanned || 0;
      document.getElementById('quickDetected').textContent = stats.threatsDetected || 0;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

async function loadAnalysis(tabId) {
  console.log('Loading analysis for tab:', tabId);
  showLoading();

  try {
    let analysis = await chrome.runtime.sendMessage({
      action: 'getAnalysis',
      tabId: tabId
    });

    console.log('Got analysis:', analysis);

    if (analysis) {
      currentAnalysis = analysis;
      displayAnalysis(analysis);
    } else {
      console.log('No analysis found, triggering scan...');

      // Trigger content script
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });

      // Wait and try again
      await new Promise(resolve => setTimeout(resolve, 1500));

      analysis = await chrome.runtime.sendMessage({
        action: 'getAnalysis',
        tabId: tabId
      });

      if (analysis) {
        currentAnalysis = analysis;
        displayAnalysis(analysis);
      } else {
        showNoData();
      }
    }
  } catch (error) {
    console.error('Analysis load error:', error);
    showError('Failed to load analysis');
  }
}

function displayAnalysis(analysis) {
  console.log('Displaying analysis:', analysis);

  const { threatLevel, threatScore, threats } = analysis;

  // Update threat card
  updateThreatCard(threatLevel, threatScore);

  // Display threats
  displayThreats(threats || []);

  // Animate
  animateIn();
}

function updateThreatCard(threatLevel, threatScore) {
  const threatCard = document.getElementById('threatCard');
  const threatIcon = document.getElementById('threatIcon');
  const threatLevelEl = document.getElementById('threatLevel');
  const threatDescription = document.getElementById('threatDescription');
  const threatScoreEl = document.getElementById('threatScore');

  if (!threatCard) return;

  // Remove existing classes
  threatCard.classList.remove('safe', 'low', 'medium', 'high', 'critical');
  threatCard.classList.add(threatLevel);

  const configs = {
    safe: { icon: '✅', title: 'Safe', description: 'No threats detected' },
    low: { icon: '🔵', title: 'Low Risk', description: 'Minor concerns found' },
    medium: { icon: '🟡', title: 'Medium Risk', description: 'Exercise caution' },
    high: { icon: '🟠', title: 'High Risk', description: 'Multiple threats detected' },
    critical: { icon: '🔴', title: 'CRITICAL THREAT', description: 'Do NOT enter personal info' }
  };

  const config = configs[threatLevel] || configs.safe;

  threatIcon.textContent = config.icon;
  threatLevelEl.textContent = config.title;
  threatDescription.textContent = config.description;
  threatScoreEl.textContent = threatScore;
}

function displayThreats(threats) {
  const threatList = document.getElementById('threatList');
  if (!threatList) return;

  if (!threats || threats.length === 0) {
    threatList.innerHTML = `
      <div class="no-threats">
        <div class="no-threats-icon">✨</div>
        <p>No threats detected</p>
      </div>
    `;
    return;
  }

  threatList.innerHTML = '';

  threats.forEach((threat, index) => {
    const item = document.createElement('div');
    item.className = `threat-item severity-${threat.severity || 'info'}`;
    item.style.animationDelay = `${index * 0.05}s`;

    const icons = {
      critical: '🔴',
      high: '🟠',
      medium: '🟡',
      low: '🔵',
      info: 'ℹ️'
    };

    item.innerHTML = `
      <div class="threat-item-header">
        <span class="threat-item-icon">${icons[threat.severity] || 'ℹ️'}</span>
        <span class="threat-item-type">${threat.type || 'Unknown'}</span>
        <span class="threat-item-severity">${threat.severity || 'info'}</span>
      </div>
      <div class="threat-item-description">${threat.description || 'No description'}</div>
    `;

    threatList.appendChild(item);
  });
}

async function loadRecentActivity() {
  try {
    const history = await chrome.runtime.sendMessage({ action: 'getThreatHistory' });

    const activityDiv = document.getElementById('recentActivity');
    if (!activityDiv) return;

    if (!history || history.length === 0) {
      activityDiv.innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 8px;">No recent activity</p>';
      return;
    }

    activityDiv.innerHTML = history.slice(0, 3).map(item => {
      const icons = {
        critical: '🔴',
        high: '🟠',
        medium: '🟡',
        low: '🔵',
        safe: '✅'
      };

      const url = new URL(item.url);
      const domain = url.hostname;

      return `
        <div style="padding: 8px; background: rgba(255,255,255,0.02); border-radius: 6px; margin-bottom: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-weight: 600;">${icons[item.threatLevel]} ${domain}</span>
            <span style="color: var(--text-muted); font-size: 10px;">${new Date(item.timestamp).toLocaleTimeString()}</span>
          </div>
          <div style="color: var(--text-muted); font-size: 11px;">
            ${item.blocked ? '🚫 Blocked' : item.threatLevel === 'safe' ? '✅ Safe' : '⚠️ Detected'}
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Failed to load activity:', error);
  }
}

async function rescanPage() {
  if (!currentTab) return;

  const btn = document.getElementById('rescanBtn');
  const originalHtml = btn?.innerHTML;

  if (btn) {
    btn.innerHTML = '<span class="btn-icon spinning">🔄</span> Scanning...';
    btn.disabled = true;
  }

  showLoading();

  try {
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      files: ['content.js']
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    await loadAnalysis(currentTab.id);
    await loadQuickStats();

  } catch (error) {
    console.error('Rescan error:', error);
    showError('Failed to rescan');
  } finally {
    if (btn) {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }
  }
}

async function whitelistSite() {
  if (!currentTab) return;

  if (confirm(`Trust this site?\n\n${currentTab.url}\n\nIt will never be blocked.`)) {
    await chrome.runtime.sendMessage({
      action: 'allowSite',
      url: currentTab.url
    });

    alert('✅ Site added to whitelist!');
    await loadAnalysis(currentTab.id);
  }
}

async function blockSite() {
  if (!currentTab) return;

  if (confirm(`Block this site?\n\n${currentTab.url}\n\nIt will always be blocked.`)) {
    await chrome.runtime.sendMessage({
      action: 'blockSite',
      url: currentTab.url
    });

    alert('🚫 Site added to blacklist!');
    chrome.tabs.goBack();
  }
}

function viewHistory() {
  chrome.runtime.openOptionsPage();
}

function reportIssue() {
  alert('📝 Report Issue\n\nThis feature will allow you to report false positives or suggest improvements.');
}

function showHelp() {
  alert('❓ SentinelX Guardian Pro Help\n\n🛡️ Real-time phishing protection\n🚫 Automatic threat blocking\n✅ Whitelist trusted sites\n⚙️ Customize in settings\n\nClick the settings icon for more options!');
}

function showLoading() {
  document.getElementById('threatLevel').textContent = 'Analyzing...';
  document.getElementById('threatDescription').textContent = 'Scanning for threats';
  document.getElementById('threatScore').textContent = '--';
}

function showNoData() {
  document.getElementById('threatLevel').textContent = 'No Data';
  document.getElementById('threatDescription').textContent = 'Unable to analyze this page';
  document.getElementById('threatScore').textContent = '--';
}

function showError(message) {
  document.getElementById('threatLevel').textContent = 'Error';
  document.getElementById('threatDescription').textContent = message;
  document.getElementById('threatScore').textContent = '--';
}

function animateIn() {
  // Animations are now handled via CSS for better reliability and performance
}
