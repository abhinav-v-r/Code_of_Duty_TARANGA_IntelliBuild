import React, { useState } from 'react';

const FakeWebsiteLabView = ({ lab, onEvent, onExit }) => {
  const site = lab.environment?.site;
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showUrlInspector, setShowUrlInspector] = useState(false);
  const [cardForm, setCardForm] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!site) return null;

  const goHome = () => setPage('home');

  const goProduct = (productId) => {
    setPage('product');
    onEvent('view-product', { productId });
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    onEvent('add-to-cart', { productId: product.id });
  };

  const goCheckout = () => {
    setPage('checkout');
    onEvent('start-checkout', { cartItems: cart.length });
  };

  const handleInspectUrl = () => {
    setShowUrlInspector(true);
    onEvent('inspect-url', { url: site.domain, padlockShown: site.padlock });
  };

  const handleBuyNow = (product) => {
    onEvent('click-buy-now', { productId: product.id });
    addToCart(product);
    goCheckout();
  };

  const handleCardChange = (field, value) => {
    setCardForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    onEvent('submit-card', {
      pageId: site.pages.checkout.id,
      hasCardNumber: !!cardForm.cardNumber,
      hasCvv: !!cardForm.cvv,
    });
  };

  const products = site.pages.home.products || [];
  const currentProduct = products[0];

  // Countdown timer display (fake)
  const [countdown] = useState('04:32');

  return (
    <div className="space-y-4">
      {/* URL Inspector Modal */}
      {showUrlInspector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card max-w-md w-full mx-4 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">URL & Certificate Details</h3>
              <button
                onClick={() => setShowUrlInspector(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-cyber-700/50 space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-400 text-xs">Connection is secure</span>
                </div>
                <div className="text-slate-400 text-xs">
                  This site has a valid SSL certificate
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-500">Full URL</div>
                <div className="font-mono text-xs text-slate-300 p-2 rounded bg-cyber-900/50 break-all">
                  {site.domain}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-500">Domain Owner</div>
                <div className="text-sm text-slate-300">
                  Unknown Organization
                </div>
                <div className="text-xs text-amber-400/80">
                  ⚠️ This domain was registered 3 days ago
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-500">Certificate Issuer</div>
                <div className="text-sm text-slate-300">
                  Let's Encrypt (Free Certificate)
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUrlInspector(false)}
              className="w-full btn-secondary text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Browser Chrome */}
      <div className="browser-chrome min-h-[550px]">
        {/* Browser Header */}
        <div className="browser-header">
          <div className="browser-dots">
            <span className="browser-dot browser-dot-red" />
            <span className="browser-dot browser-dot-yellow" />
            <span className="browser-dot browser-dot-green" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1 mr-2">
            <button className="p-1.5 rounded hover:bg-cyber-600/50 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1.5 rounded hover:bg-cyber-600/50 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="p-1.5 rounded hover:bg-cyber-600/50 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Address Bar */}
          <button
            onClick={handleInspectUrl}
            className="browser-address-bar flex-1 hover:bg-cyber-800/80 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="truncate font-mono text-[11px]">{site.domain}</span>
            <svg className="w-3.5 h-3.5 text-slate-500 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <div className="ml-2 relative">
            <button className="p-2 rounded hover:bg-cyber-600/50 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* Website Content */}
        <div className="bg-gradient-to-b from-cyber-800/50 to-cyber-900/80 min-h-[510px]">
          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-rose-600 to-amber-600 py-2 px-4 text-center">
            <span className="text-sm font-medium text-white animate-pulse">
              🔥 FLASH SALE! {site.pages.home.timerText?.replace('Offer ends in', 'Ends in')} - Only {countdown} remaining! 🔥
            </span>
          </div>

          {/* Header */}
          <header className="px-6 py-4 border-b border-cyber-700/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                SD
              </div>
              <div>
                <div className="font-bold text-lg text-white">SuperDeal Mart</div>
                <div className="text-[10px] text-slate-400">India's #1 Discount Store</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Seller
              </span>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {page === 'home' && (
              <div className="space-y-6 animate-fade-in">
                {/* Hero Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-purple-900/80 to-rose-900/80 border border-white/5 p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                      ⚡ LIMITED TIME OFFER
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {site.pages.home.heroText}
                    </h1>
                    <p className="text-sm text-slate-300">
                      Hurry! Limited stock available. No questions asked returns*.
                    </p>
                    <button
                      onClick={() => goProduct(currentProduct.id)}
                      className="btn-primary"
                    >
                      Shop Now →
                    </button>
                  </div>
                  <div className="w-48 h-48 rounded-xl bg-cyber-800/50 flex items-center justify-center border border-white/5">
                    <span className="text-6xl">📱</span>
                  </div>
                </div>

                {/* Product Card */}
                <div className="grid md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="card-hover p-4 space-y-3 cursor-pointer"
                      onClick={() => goProduct(product.id)}
                    >
                      <div className="aspect-square rounded-xl bg-cyber-700/50 flex items-center justify-center relative">
                        <span className="text-5xl">📱</span>
                        <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-rose-500 text-xs font-bold text-white">
                          {product.badge}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{product.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl font-bold text-emerald-400">₹{product.price}</span>
                          <span className="text-sm line-through text-slate-500">₹{product.mrp}</span>
                        </div>
                        <div className="text-xs text-amber-400 mt-1">
                          🔥 Only 3 left in stock!
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
                        className="w-full btn-primary text-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs text-slate-400">
                  <div className="p-3 rounded-xl bg-cyber-800/30">
                    <div className="text-lg mb-1">🔒</div>
                    <div>100% Secure</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-800/30">
                    <div className="text-lg mb-1">🚚</div>
                    <div>Free Delivery</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-800/30">
                    <div className="text-lg mb-1">✅</div>
                    <div>Genuine Product</div>
                  </div>
                </div>
              </div>
            )}

            {page === 'product' && currentProduct && (
              <div className="space-y-6 animate-fade-in">
                <button
                  onClick={goHome}
                  className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to deals
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="aspect-square rounded-2xl bg-cyber-700/50 flex items-center justify-center relative">
                    <span className="text-8xl">📱</span>
                    <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-rose-500 text-sm font-bold text-white">
                      {currentProduct.badge}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{currentProduct.name}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-amber-400">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-sm text-slate-400">(2,847 reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-emerald-400">₹{currentProduct.price}</span>
                      <span className="text-lg line-through text-slate-500">₹{currentProduct.mrp}</span>
                      <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                        Save ₹{currentProduct.mrp - currentProduct.price}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <div className="text-sm font-medium text-amber-300">Deal ends in {countdown}</div>
                        <div className="text-xs text-amber-400/70">Limited time offer</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">Highlights:</div>
                      <ul className="text-sm text-slate-400 space-y-1">
                        {site.pages.product?.highlights?.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            {h}
                          </li>
                        )) || (
                            <>
                              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Latest 5G Technology</li>
                              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> 1 Year Warranty*</li>
                              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Free shipping across India</li>
                            </>
                          )}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(currentProduct)}
                        className="flex-1 btn-secondary"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(currentProduct)}
                        className="flex-1 btn-primary"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="card p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-white">Customer Reviews</h2>
                  <div className="space-y-4">
                    {site.pages.product?.reviews?.map((review) => (
                      <div key={review.id} className="border-b border-cyber-700/30 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-cyber-700/50 flex items-center justify-center text-xs">
                              {review.author.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-white">{review.author}</span>
                          </div>
                          <div className="text-amber-400 text-sm">{'★'.repeat(review.stars)}</div>
                        </div>
                        <p className="text-sm text-slate-400">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page === 'checkout' && (
              <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
                <button
                  onClick={() => setPage('product')}
                  className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to product
                </button>

                <div className="card p-6 space-y-4">
                  <h2 className="text-xl font-bold text-white">Secure Checkout</h2>

                  {/* Order Summary */}
                  <div className="p-4 rounded-xl bg-cyber-700/30 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Product</span>
                      <span className="text-white">{currentProduct?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Price</span>
                      <span className="text-emerald-400 font-medium">₹{currentProduct?.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Delivery</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="border-t border-cyber-600/30 pt-2 flex justify-between">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-bold text-lg text-emerald-400">₹{currentProduct?.price}</span>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handleSubmitCard} className="space-y-4">
                    <div>
                      <label className="input-label">Full Name</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Enter your full name"
                        value={cardForm.name}
                        onChange={(e) => handleCardChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="input-label">Delivery Address</label>
                      <textarea
                        className="input-field min-h-[80px]"
                        placeholder="Enter your delivery address"
                        value={cardForm.address}
                        onChange={(e) => handleCardChange('address', e.target.value)}
                      />
                    </div>

                    <div className="border-t border-cyber-700/30 pt-4">
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Card Details</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="input-label">Card Number</label>
                          <input
                            type="text"
                            className="input-field font-mono"
                            placeholder="1234 5678 9012 3456"
                            value={cardForm.cardNumber}
                            onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="input-label">Expiry Date</label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="MM/YY"
                              value={cardForm.expiry}
                              onChange={(e) => handleCardChange('expiry', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="input-label">CVV</label>
                            <input
                              type="password"
                              className="input-field"
                              placeholder="•••"
                              value={cardForm.cvv}
                              onChange={(e) => handleCardChange('cvv', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 text-base">
                      🔒 Pay ₹{currentProduct?.price} Securely
                    </button>
                  </form>

                  <div className="text-center text-xs text-slate-500">
                    Your payment is secured with 256-bit encryption
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Exit Button */}
      <div className="flex justify-center pt-4">
        <button onClick={onExit} className="btn-secondary text-sm">
          Exit Lab & See Debrief →
        </button>
      </div>
    </div>
  );
};

export default FakeWebsiteLabView;
