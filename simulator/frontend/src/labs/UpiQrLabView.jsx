import React, { useState, useEffect, useRef, useCallback } from 'react';

const UpiQrLabView = ({ lab, onEvent, onExit }) => {
  const chat = lab.environment?.chat;
  const qr = lab.environment?.qr;
  const upiApproval = lab.environment?.upiApproval;

  const [messages, setMessages] = useState([]);
  const [screen, setScreen] = useState('chat'); // 'chat' | 'qr-scan' | 'upi' | 'payment-done'
  const [scammerTyping, setScammerTyping] = useState(false);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const timeoutRefs = useRef([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Load initial messages one by one
  useEffect(() => {
    if (!chat?.messages || messagesLoaded) return;

    setMessagesLoaded(true);
    const chatMessages = [...chat.messages];

    let currentIdx = 0;

    const showNextMessage = () => {
      if (currentIdx >= chatMessages.length) return;

      setScammerTyping(true);

      const t1 = setTimeout(() => {
        const msg = chatMessages[currentIdx];
        setMessages(prev => [...prev, msg]);
        setScammerTyping(false);
        currentIdx++;

        if (currentIdx < chatMessages.length) {
          const t2 = setTimeout(showNextMessage, 800);
          timeoutRefs.current.push(t2);
        }
      }, 1200);

      timeoutRefs.current.push(t1);
    };

    showNextMessage();
  }, [chat, messagesLoaded]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, scammerTyping]);

  // Return early if environment is not ready
  if (!chat || !qr || !upiApproval) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">Loading UPI lab environment...</div>
      </div>
    );
  }

  const handleReply = (reply) => {
    onEvent('send-chat', { replyId: reply.id, text: reply.text });

    // Add user's message
    setMessages(prev => [
      ...prev,
      {
        id: `you-${Date.now()}`,
        from: 'You',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    // Simulate scammer response based on reply
    const t1 = setTimeout(() => {
      setScammerTyping(true);
      const t2 = setTimeout(() => {
        let responseText = '';
        if (reply.id === 'qr-okay') {
          responseText = 'Good! Please scan the QR code now. The refund will be credited instantly.';
        } else if (reply.id === 'ask-how') {
          responseText = 'Sir, this is company policy. RBI has new rules. Just scan the QR, you will receive money automatically. It is 100% safe.';
        } else if (reply.id === 'refuse') {
          responseText = 'Sir, if you don\'t do it now, refund will be cancelled. I am trying to help you only. Why are you not trusting?';
        }

        if (responseText) {
          setMessages(prev => [
            ...prev,
            {
              id: `scammer-${Date.now()}`,
              from: 'Online Seller',
              text: responseText,
              timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }
        setScammerTyping(false);
      }, 1500);
      timeoutRefs.current.push(t2);
    }, 500);
    timeoutRefs.current.push(t1);
  };

  const handleScanQr = () => {
    onEvent('scan-qr', { qrId: qr.id, amount: qr.amount });
    setScreen('qr-scan');

    // Simulate scanning animation then show UPI
    const t = setTimeout(() => {
      setScreen('upi');
    }, 2000);
    timeoutRefs.current.push(t);
  };

  const handleApproveUpi = () => {
    onEvent('approve-upi', { upiId: upiApproval.id, amount: upiApproval.amount });
    setScreen('payment-done');
  };

  const handleDeclineUpi = () => {
    onEvent('decline-upi', { upiId: upiApproval.id, amount: upiApproval.amount });
    setScreen('chat');

    // Scammer gets aggressive
    const t1 = setTimeout(() => {
      setScammerTyping(true);
      const t2 = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `scammer-angry-${Date.now()}`,
            from: 'Online Seller',
            text: 'Sir why you cancelled?! I am from customer support only! If you don\'t complete now, I will have to escalate this to senior management and you will NEVER get refund!',
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setScammerTyping(false);
      }, 1500);
      timeoutRefs.current.push(t2);
    }, 500);
    timeoutRefs.current.push(t1);
  };

  const handleExitChat = () => {
    onEvent('exit-chat', {});
    onExit();
  };

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[1fr_400px] gap-4">
        {/* WhatsApp-style Chat */}
        <div className="browser-chrome min-h-[550px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-700 to-emerald-600">
            <button className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-medium">
              OS
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">Online Seller</div>
              <div className="text-xs text-white/70">
                {scammerTyping ? 'typing...' : 'online'}
              </div>
            </div>
            <button className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Chat Background */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L5 30l25 25 25-25L30 5z' fill='%23064e3b' fill-opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundColor: '#0a1a14',
            }}
          >
            {/* Date Header */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-lg bg-cyber-800/80 text-xs text-slate-400">
                Today
              </span>
            </div>

            {/* Messages */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === 'You' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`chat-bubble ${m.from === 'You' ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'
                    }`}
                >
                  <div>{m.text}</div>
                  <div className={`mt-1 text-[10px] text-right flex items-center justify-end gap-1 ${m.from === 'You' ? 'text-white/60' : 'text-slate-400'
                    }`}>
                    {m.timestamp}
                    {m.from === 'You' && (
                      <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {scammerTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="chat-bubble chat-bubble-incoming">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-3 bg-cyber-800/80 border-t border-cyber-700/30">
            <div className="text-[10px] text-slate-500 mb-2">Choose a response:</div>
            <div className="flex flex-wrap gap-2">
              {chat.quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleReply(reply)}
                  className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm hover:bg-emerald-500/20 transition-colors"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar (disabled but realistic looking) */}
          <div className="px-3 py-2 bg-cyber-800/80 flex items-center gap-2">
            <button className="p-2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="flex-1 px-4 py-2 rounded-full bg-cyber-700/50 text-sm text-slate-500">
              Type a message...
            </div>
            <button className="p-2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* QR / UPI Panel */}
        <div className="space-y-4">
          {screen === 'chat' && (
            <div className="card p-6 space-y-4 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  QR Code from Seller
                </div>
                <div className="text-sm text-slate-300">
                  The seller claims you need to scan this to receive your refund
                </div>
              </div>

              {/* QR Code Display */}
              <div className="flex justify-center">
                <div className="qr-container w-48 h-48 rounded-2xl relative bg-white">
                  {/* Fake QR Pattern */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="25" height="25" fill="#000" />
                    <rect x="65" y="10" width="25" height="25" fill="#000" />
                    <rect x="10" y="65" width="25" height="25" fill="#000" />
                    <rect x="15" y="15" width="15" height="15" fill="#fff" />
                    <rect x="70" y="15" width="15" height="15" fill="#fff" />
                    <rect x="15" y="70" width="15" height="15" fill="#fff" />
                    <rect x="18" y="18" width="9" height="9" fill="#000" />
                    <rect x="73" y="18" width="9" height="9" fill="#000" />
                    <rect x="18" y="73" width="9" height="9" fill="#000" />
                    {/* Static pattern instead of random */}
                    <rect x="40" y="40" width="4" height="4" fill="#000" />
                    <rect x="45" y="40" width="4" height="4" fill="#000" />
                    <rect x="55" y="40" width="4" height="4" fill="#000" />
                    <rect x="40" y="45" width="4" height="4" fill="#000" />
                    <rect x="50" y="45" width="4" height="4" fill="#000" />
                    <rect x="40" y="50" width="4" height="4" fill="#000" />
                    <rect x="45" y="50" width="4" height="4" fill="#000" />
                    <rect x="55" y="50" width="4" height="4" fill="#000" />
                    <rect x="50" y="55" width="4" height="4" fill="#000" />
                    <rect x="55" y="55" width="4" height="4" fill="#000" />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-emerald-400">₹{qr.amount}</div>
                <div className="text-sm text-slate-400">{qr.note}</div>
              </div>

              <button
                onClick={handleScanQr}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Scan QR with UPI App
              </button>
            </div>
          )}

          {screen === 'qr-scan' && (
            <div className="card p-6 space-y-4 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin" />
                <div className="text-sm text-slate-300">Scanning QR Code...</div>
                <div className="text-xs text-slate-500">Opening UPI app</div>
              </div>
            </div>
          )}

          {screen === 'upi' && (
            <div className="upi-screen animate-fade-in">
              <div className="upi-header">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-semibold text-white">{upiApproval.appName}</span>
                </div>
                <span className="text-xs text-slate-400">Payment Request</span>
              </div>

              <div className="p-6 space-y-6">
                {/* Recipient */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                    XY
                  </div>
                  <div className="text-lg font-medium text-white">{upiApproval.to}</div>
                </div>

                {/* Amount - THE KEY DECEPTION */}
                <div className="p-4 rounded-xl bg-cyber-700/50 border border-rose-500/20 text-center space-y-1">
                  <div className="text-xs text-rose-400 uppercase tracking-wide font-medium">
                    You are PAYING
                  </div>
                  <div className="text-4xl font-bold text-white">
                    ₹{upiApproval.amount.toLocaleString()}
                  </div>
                </div>

                <div className="text-center text-sm text-slate-400">
                  {upiApproval.message}
                </div>

                {/* PIN Entry (fake) */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 text-center">Enter UPI PIN to confirm</div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="w-8 h-10 rounded-lg bg-cyber-700/50 border border-cyber-600/30" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDeclineUpi}
                    className="btn-secondary py-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApproveUpi}
                    className="btn-danger py-3"
                  >
                    Pay ₹{upiApproval.amount}
                  </button>
                </div>
              </div>
            </div>
          )}

          {screen === 'payment-done' && (
            <div className="card p-6 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-lg font-semibold text-white">Payment Successful</div>
              <div className="text-sm text-slate-400">
                ₹{upiApproval.amount} has been sent to {upiApproval.to}
              </div>
              <div className="text-xs text-rose-400">
                (In real life, your money would now be gone forever)
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleExitChat}
              className="w-full btn-secondary text-sm"
            >
              Exit Lab & See Debrief →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiQrLabView;
