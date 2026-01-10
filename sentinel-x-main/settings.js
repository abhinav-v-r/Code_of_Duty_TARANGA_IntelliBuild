// SentinelX Guardian Pro - Settings Page Script

console.log('⚙️ Settings page loaded');

let config = {};
let stats = {};
let whitelist = [];
let blacklist = [];

// Load settings on page load
document.addEventListener('DOMContentLoaded', loadSettings);

async function loadSettings() {
    console.log('Loading settings...');

    // Get data from background
    const exportData = await chrome.runtime.sendMessage({ action: 'exportData' });

    if (exportData) {
        config = exportData.config || {};
        stats = exportData.stats || {};
        whitelist = exportData.whitelist || [];
        blacklist = exportData.blacklist || [];
    }

    // Populate UI
    populateSettings();
    populateStats();
    populateLists();

    // Setup event listeners
    setupEventListeners();
}

function populateSettings() {
    document.getElementById('protectionMode').value = config.protectionMode || 'balanced';
    document.getElementById('autoBlock').checked = config.autoBlock !== false;
    document.getElementById('showWarnings').checked = config.showWarnings !== false;
    document.getElementById('collectStats').checked = config.collectStats !== false;
}

function populateStats() {
    document.getElementById('sitesScanned').textContent = stats.sitesScanned || 0;
    document.getElementById('threatsBlocked').textContent = stats.threatsBlocked || 0;
    document.getElementById('threatsDetected').textContent = stats.threatsDetected || 0;
}

function populateLists() {
    // Whitelist
    const whitelistContainer = document.getElementById('whitelistContainer');
    if (whitelist.length === 0) {
        whitelistContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No whitelisted domains</p>';
    } else {
        whitelistContainer.innerHTML = whitelist.map(domain => `
      <div class="list-item">
        <span>${domain}</span>
        <button class="remove-btn" onclick="removeFromWhitelist('${domain}')">Remove</button>
      </div>
    `).join('');
    }

    // Blacklist
    const blacklistContainer = document.getElementById('blacklistContainer');
    if (blacklist.length === 0) {
        blacklistContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No blacklisted domains</p>';
    } else {
        blacklistContainer.innerHTML = blacklist.map(domain => `
      <div class="list-item">
        <span>${domain}</span>
        <button class="remove-btn" onclick="removeFromBlacklist('${domain}')">Remove</button>
      </div>
    `).join('');
    }
}

function setupEventListeners() {
    // Protection settings
    document.getElementById('protectionMode').addEventListener('change', saveSettings);
    document.getElementById('autoBlock').addEventListener('change', saveSettings);
    document.getElementById('showWarnings').addEventListener('change', saveSettings);
    document.getElementById('collectStats').addEventListener('change', saveSettings);

    // Whitelist/Blacklist
    document.getElementById('addWhitelistBtn').addEventListener('click', addToWhitelist);
    document.getElementById('addBlacklistBtn').addEventListener('click', addToBlacklist);

    // Data management
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', importData);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    document.getElementById('resetStatsBtn').addEventListener('click', resetStats);
    document.getElementById('resetAllBtn').addEventListener('click', resetAll);
}

async function saveSettings() {
    config = {
        protectionMode: document.getElementById('protectionMode').value,
        autoBlock: document.getElementById('autoBlock').checked,
        showWarnings: document.getElementById('showWarnings').checked,
        collectStats: document.getElementById('collectStats').checked
    };

    await chrome.runtime.sendMessage({
        action: 'updateConfig',
        config: config
    });

    console.log('✅ Settings saved');
    showNotification('Settings saved successfully!');
}

async function addToWhitelist() {
    const input = document.getElementById('whitelistInput');
    const domain = input.value.trim().toLowerCase();

    if (!domain) return;

    if (whitelist.includes(domain)) {
        showNotification('Domain already in whitelist', 'warning');
        return;
    }

    await chrome.runtime.sendMessage({
        action: 'allowSite',
        url: `https://${domain}`
    });

    whitelist.push(domain);
    input.value = '';
    populateLists();
    showNotification(`Added ${domain} to whitelist`);
}

async function addToBlacklist() {
    const input = document.getElementById('blacklistInput');
    const domain = input.value.trim().toLowerCase();

    if (!domain) return;

    if (blacklist.includes(domain)) {
        showNotification('Domain already in blacklist', 'warning');
        return;
    }

    await chrome.runtime.sendMessage({
        action: 'blockSite',
        url: `https://${domain}`
    });

    blacklist.push(domain);
    input.value = '';
    populateLists();
    showNotification(`Added ${domain} to blacklist`);
}

window.removeFromWhitelist = async function (domain) {
    if (!confirm(`Remove ${domain} from whitelist?`)) return;

    whitelist = whitelist.filter(d => d !== domain);
    // TODO: Send message to background to update
    populateLists();
    showNotification(`Removed ${domain} from whitelist`);
};

window.removeFromBlacklist = async function (domain) {
    if (!confirm(`Remove ${domain} from blacklist?`)) return;

    blacklist = blacklist.filter(d => d !== domain);
    // TODO: Send message to background to update
    populateLists();
    showNotification(`Removed ${domain} from blacklist`);
};

async function exportData() {
    const data = await chrome.runtime.sendMessage({ action: 'exportData' });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentinelx-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Settings exported successfully!');
}

async function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // Restore data
            if (data.config) {
                await chrome.runtime.sendMessage({
                    action: 'updateConfig',
                    config: data.config
                });
            }

            // Reload settings
            await loadSettings();
            showNotification('Settings imported successfully!');
        } catch (error) {
            showNotification('Failed to import settings', 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

async function clearHistory() {
    if (!confirm('Clear all threat history?')) return;

    await chrome.runtime.sendMessage({ action: 'clearHistory' });
    showNotification('History cleared');
}

async function resetStats() {
    if (!confirm('Reset all statistics?')) return;

    stats = {
        sitesScanned: 0,
        threatsBlocked: 0,
        threatsDetected: 0
    };

    populateStats();
    showNotification('Statistics reset');
}

async function resetAll() {
    if (!confirm('⚠️ WARNING: This will reset ALL settings, lists, and data.\n\nAre you sure?')) return;

    await chrome.storage.local.clear();
    location.reload();
}

function showNotification(message, type = 'success') {
    // Simple notification (you could enhance this)
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#10b981'};
    color: white;
    padding: 16px 24px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
