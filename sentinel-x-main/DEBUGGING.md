# 🔧 SentinelX Guardian - Debugging Guide

## Issue: Extension Not Detecting Threats

If the extension isn't detecting threats, follow these steps:

---

## Step 1: Reload the Extension

1. Go to `chrome://extensions/`
2. Find "SentinelX Guardian"
3. Click the **Reload** icon (🔄)
4. Make sure **Developer mode** is still ON

---

## Step 2: Check Background Script

1. Go to `chrome://extensions/`
2. Find "SentinelX Guardian"
3. Click **"Service worker"** or **"Inspect views: service worker"**
4. A DevTools window will open - check the **Console** tab

### Expected Console Output:
```
SentinelX Guardian - Background service worker initialized
```

### When a page is analyzed:
```
Background received message: analyzePage from tab: 123
Analyzing page data: {url: "...", text: "...", ...}
Analysis complete: {threatLevel: "critical", threatScore: 85, ...}
Stored analysis for tab: 123
Sent response to content script
```

---

## Step 3: Check Content Script

1. Open the test phishing page (`test-phishing-page.html`)
2. Press **F12** to open DevTools
3. Check the **Console** tab

### Expected Console Output:
```
SentinelX Guardian - Content script loaded on: file:///d:/sentinel-x/test-phishing-page.html
Starting initial page analysis...
Collected page data: {...}
Page data summary: {url: "...", textLength: ..., forms: 4, ...}
Received analysis response: {threatLevel: "critical", ...}
Displaying threat warning for level: critical
Creating warning banner...
Warning banner displayed
```

---

## Step 4: Check Popup

1. Open the test phishing page
2. Click the SentinelX extension icon
3. Right-click in the popup and select **Inspect**
4. Check the **Console** tab

### Expected Console Output:
```
SentinelX Popup initialized
Current tab: file:///d:/sentinel-x/test-phishing-page.html
Loading analysis for tab: 123
Got analysis: {threatLevel: "critical", threatScore: 85, ...}
Displaying analysis: {...}
```

---

## Common Issues & Solutions

### Issue 1: "No active tab found"
**Solution:** The popup can't access the tab. Try:
- Refresh the page
- Reload the extension
- Check if you're on a restricted page (chrome://, chrome-extension://)

### Issue 2: "Cannot analyze this page"
**Solution:** Content scripts can't run on certain pages:
- Chrome internal pages (`chrome://`)
- Chrome Web Store
- Extension pages

**Fix:** Test on regular web pages or the test file

### Issue 3: No console output in Content Script
**Solution:** Content script didn't inject:
- Reload the page
- Check manifest.json has correct permissions
- Manually inject via popup (click Rescan)

### Issue 4: Background script shows no messages
**Solution:** Communication isn't working:
- Check if service worker is active
- Look for errors in red in console
- Reload the extension completely

### Issue 5: Threats not showing in popup
**Solution:** Data isn't being stored/retrieved:
- Check background console for "Stored analysis" message
- Verify tab ID matches
- Click "Rescan Page" button

---

## Manual Testing Steps

1. **Reload Extension:**
   - `chrome://extensions/` → Find SentinelX → Click Reload

2. **Open Test Page:**
   - Navigate to: `file:///d:/sentinel-x/test-phishing-page.html`
   - Or right-click file → "Open with Chrome"

3. **Check Page Console (F12):**
   ```
   Should see: "SentinelX Guardian - Content script loaded..."
   Should see: "Received analysis response: ..."
   Should see: "Warning banner displayed"
   ```

4. **Check for Warning Banner:**
   - A red warning banner should appear at the top of the page
   - Contains: "⚠️ CRITICAL THREAT DETECTED"

5. **Open Popup:**
   - Click the SentinelX extension icon in toolbar
   - Should show: "CRITICAL THREAT" with score of 85
   - Should list multiple threats

6. **Verify Badge:**
   - Extension icon should show a red badge with "⚠"

---

## If Still Not Working

### Check File Permissions
Ensure all files are in the correct location:
```
d:\sentinel-x\
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── style.css
└── test-phishing-page.html
```

### Check Manifest Permissions
Open `manifest.json` and verify:
```json
{
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "tabs"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

### Complete Fresh Reload
1. Remove extension from Chrome
2. Close all browser tabs
3. Restart browser
4. Re-install extension
5. Try again

---

## Expected Behavior on Test Page

When you open `test-phishing-page.html`, you should see:

✅ **Warning Banner** (auto-appears at top)
✅ **Extension Badge** (red with ⚠)  
✅ **Popup Shows:** 
   - 🔴 CRITICAL THREAT
   - Score: 70-90
   - 5-8 threats listed
   - Forms detected: 4

### Sample Threats Detected:
- Phishing Content - "verify account" detected
- Phishing Content - "urgent action" detected  
- Suspicious Keywords - "act now" detected
- Data Collection - Page contains 4 forms
- And more...

---

## Debugging Commands

### View Service Worker Console:
```
chrome://extensions/ → SentinelX → Service Worker
```

### View Page Console:
```
F12 → Console tab
```

### View Popup Console:
```
Right-click popup → Inspect
```

### Reload Extension:
```
chrome://extensions/ → Reload icon
```

---

## Contact

If you've tried all steps and it still doesn't work, check:
1. ✅ Developer mode is ON
2. ✅ All files are present
3. ✅ Extension is loaded (not just uploaded)
4. ✅ Page was refreshed after loading extension
5. ✅ Console shows no red errors

---

**Debug Checklist:**
- [ ] Extension reloaded
- [ ] Background console checked
- [ ] Content script console checked  
- [ ] Popup console checked
- [ ] Test page opened
- [ ] Page refreshed
- [ ] All console logs appearing
- [ ] No red errors in console
