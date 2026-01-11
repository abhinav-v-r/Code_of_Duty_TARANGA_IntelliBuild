import React, { useState, useEffect } from 'react';

const PhishingEmailLabView = ({ lab, onEvent, onExit }) => {
  const inbox = lab.environment?.inbox || [];
  const loginPage = lab.environment?.loginPage;
  const [selectedId, setSelectedId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showSenderDetails, setShowSenderDetails] = useState(false);
  const [activeFolder, setActiveFolder] = useState('Inbox');

  const selected = inbox.find((m) => m.id === selectedId);

  // Auto-select first email on mount
  useEffect(() => {
    if (inbox.length > 0 && !selectedId) {
      setSelectedId(inbox[0].id);
      onEvent('view-inbox', { emailCount: inbox.length });
    }
  }, [inbox, selectedId, onEvent]);

  const selectMessage = (id) => {
    setSelectedId(id);
    setShowSenderDetails(false);
    onEvent('open-email', { messageId: id });
  };

  const handleHoverLink = (message, link) => {
    setHoveredLink(link);
    onEvent('hover-link', { messageId: message.id, linkId: link.id, url: link.url });
  };

  const handleLeaveLink = () => {
    setHoveredLink(null);
  };

  const handleClickLink = (message, link) => {
    onEvent('click-link', { messageId: message.id, linkId: link.id, url: link.url });
    if (link.isMalicious && loginPage) {
      setShowLogin(true);
    }
  };

  const handleInspectSender = () => {
    if (!selected) return;
    setShowSenderDetails(true);
    onEvent('inspect-sender', { messageId: selected.id, fromAddress: selected.fromAddress });
  };

  const handleReport = () => {
    if (!selected) return;
    onEvent('report-email', { messageId: selected.id });
    // Move to next email
    const idx = inbox.findIndex((m) => m.id === selectedId);
    if (idx < inbox.length - 1) {
      setSelectedId(inbox[idx + 1].id);
    } else if (inbox.length > 1) {
      setSelectedId(inbox[0].id);
    }
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onEvent('submit-login', {
      loginPageId: loginPage.id,
      usernameFilled: !!loginForm.userId,
      passwordFilled: !!loginForm.password,
    });
    setShowLogin(false);
    setLoginForm({ userId: '', password: '' });
  };

  const folders = [
    { name: 'Inbox', icon: '📥', count: inbox.length },
    { name: 'Sent', icon: '📤', count: 0 },
    { name: 'Spam', icon: '⚠️', count: 1 },
    { name: 'Trash', icon: '🗑️', count: 0 },
  ];

  return (
    <div className="space-y-4">
      {/* Status Bar - Shows hovered link URL */}
      <div className="h-6 flex items-center">
        {hoveredLink && (
          <div className="text-xs text-slate-500 font-mono animate-fade-in truncate">
            🔗 {hoveredLink.url}
          </div>
        )}
      </div>

      {/* Email Client Container */}
      <div className="browser-chrome min-h-[500px]">
        {/* Browser Header */}
        <div className="browser-header">
          <div className="browser-dots">
            <span className="browser-dot browser-dot-red" />
            <span className="browser-dot browser-dot-yellow" />
            <span className="browser-dot browser-dot-green" />
          </div>
          <div className="browser-address-bar">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="truncate">mail.securemail.com/inbox</span>
          </div>
        </div>

        {/* Email Client Body */}
        <div className="flex min-h-[460px]">
          {/* Sidebar */}
          <div className="email-sidebar flex flex-col">
            <div className="p-3 border-b border-cyber-700/30">
              <button className="w-full btn-primary text-xs py-2">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Compose
                </span>
              </button>
            </div>
            <nav className="flex-1 py-2">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setActiveFolder(folder.name)}
                  className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${activeFolder === folder.name
                      ? 'bg-cyan-500/10 text-cyan-300 border-l-2 border-cyan-500'
                      : 'text-slate-400 hover:bg-cyber-700/30 hover:text-slate-200'
                    }`}
                >
                  <span>{folder.icon}</span>
                  <span className="flex-1 text-left">{folder.name}</span>
                  {folder.count > 0 && (
                    <span className="text-xs bg-cyber-700/50 px-1.5 py-0.5 rounded-full">
                      {folder.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Email List */}
          <div className="w-72 border-r border-cyber-700/30 flex flex-col bg-cyber-800/20">
            <div className="px-4 py-3 border-b border-cyber-700/30 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">{activeFolder}</span>
              <span className="text-xs text-slate-500">{inbox.length} messages</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {inbox.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectMessage(m.id)}
                  className={`email-list-item w-full text-left ${m.id === selectedId ? 'active' : ''
                    } ${!m.isPhishing ? '' : 'unread'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${m.isPhishing
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                      {m.fromName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${m.id === selectedId ? 'text-white font-medium' : 'text-slate-200'}`}>
                          {m.fromName}
                        </span>
                        <span className="text-[10px] text-slate-500 flex-shrink-0">{m.receivedAt}</span>
                      </div>
                      <div className="text-xs text-slate-300 truncate mt-0.5">{m.subject}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">{m.snippet}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 flex flex-col bg-cyber-900/30">
            {selected ? (
              <>
                {/* Email Header */}
                <div className="px-6 py-4 border-b border-cyber-700/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${selected.isPhishing
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                        }`}>
                        {selected.fromName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-base font-medium text-white">{selected.fromName}</div>
                        <button
                          onClick={handleInspectSender}
                          className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 mt-0.5"
                        >
                          <span>&lt;{selected.fromAddress}&gt;</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        {showSenderDetails && (
                          <div className="mt-2 p-3 rounded-lg bg-cyber-800/80 border border-cyber-600/30 text-xs space-y-1 animate-fade-in">
                            <div className="text-slate-400">
                              <span className="text-slate-500">From:</span>{' '}
                              <span className="font-mono text-slate-300">{selected.fromAddress}</span>
                            </div>
                            <div className="text-slate-400">
                              <span className="text-slate-500">Reply-To:</span>{' '}
                              <span className="font-mono text-slate-300">{selected.fromAddress}</span>
                            </div>
                            <div className="text-slate-400">
                              <span className="text-slate-500">SPF:</span>{' '}
                              <span className="text-amber-400">NEUTRAL</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{selected.receivedAt}</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-white mt-4">{selected.subject}</h2>
                </div>

                {/* Email Body */}
                <div className="flex-1 px-6 py-4 overflow-y-auto">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed">
                      {selected.body}
                    </div>

                    {/* Links in email */}
                    {selected.links?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {selected.links.map((link) => (
                          <button
                            key={link.id}
                            type="button"
                            onMouseEnter={() => handleHoverLink(selected, link)}
                            onMouseLeave={handleLeaveLink}
                            onFocus={() => handleHoverLink(selected, link)}
                            onBlur={handleLeaveLink}
                            onClick={() => handleClickLink(selected, link)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Actions */}
                <div className="px-6 py-3 border-t border-cyber-700/30 flex items-center gap-3">
                  <button className="btn-ghost text-xs flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Reply
                  </button>
                  <button className="btn-ghost text-xs flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Forward
                  </button>
                  <button
                    onClick={handleReport}
                    className="btn-ghost text-xs flex items-center gap-1.5 text-amber-400 hover:text-amber-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Report Phishing
                  </button>
                  <button
                    onClick={handleInspectSender}
                    className="btn-ghost text-xs flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Inspect Sender
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                Select an email to read
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fake Login Modal */}
      {showLogin && loginPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="browser-chrome w-full max-w-md mx-4">
            <div className="browser-header">
              <div className="browser-dots">
                <button
                  onClick={() => setShowLogin(false)}
                  className="browser-dot browser-dot-red hover:brightness-125 transition"
                />
                <span className="browser-dot browser-dot-yellow" />
                <span className="browser-dot browser-dot-green" />
              </div>
              <div className="browser-address-bar">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="truncate font-mono text-[11px]">{loginPage.url}</span>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-b from-cyber-800 to-cyber-900">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
                  SB
                </div>
                <h3 className="text-xl font-bold text-white">{loginPage.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Sign in to continue</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="input-label">User ID / Account Number</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your user ID"
                    value={loginForm.userId}
                    onChange={(e) => handleLoginChange('userId', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Password / PIN</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <input type="checkbox" id="remember" className="rounded border-cyber-600" />
                  <label htmlFor="remember">Remember me on this device</label>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Login Securely
                </button>
              </form>

              <div className="mt-4 text-center text-xs text-slate-500">
                <a href="#" className="text-cyan-400 hover:underline">Forgot Password?</a>
                {' • '}
                <a href="#" className="text-cyan-400 hover:underline">Register</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Button */}
      <div className="flex justify-center pt-4">
        <button onClick={onExit} className="btn-secondary text-sm">
          Exit Lab & See Debrief →
        </button>
      </div>
    </div>
  );
};

export default PhishingEmailLabView;
