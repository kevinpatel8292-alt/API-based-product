import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { useProducts } from './hooks/useProducts';
import { X, Trash2, ShoppingCart, Heart, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { formatINR } from './utils/currency';

export default function App() {
  const { products, loading, error, retry } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState('home');

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // State for E-commerce actions
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartCheckoutOpen, setIsCartCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Dark/Light theme toggle — persisted in localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('shopx-theme');
    return saved ? saved === 'dark' : true; // default dark
  });
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('shopx-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Apply theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Trigger temporary toast notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add Item to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        showToast(`Increased quantity of ${product.title.slice(0, 20)}...`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`Added ${product.title.slice(0, 20)}... to cart`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast("Item removed from cart");
  };

  // Modify Cart Item Quantity
  const handleUpdateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Toggle Wishlist Status
  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isExist = prevWishlist.some((item) => item.id === product.id);
      if (isExist) {
        showToast("Removed from wishlist");
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      showToast("Added to wishlist");
      return [...prevWishlist, product];
    });
  };

  // Calculate stats
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const wishlistIds = wishlist.map((item) => item.id);

  return (
    <div className="app-container">
      {/* Dynamic Toast Notifications */}
      {toast && (
        <div className="toast-notification">
          <Sparkles size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Sticky Navbar */}
      <Navbar 
        cartCount={totalCartCount} 
        wishlistCount={wishlist.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onSelectCategory={setSelectedCategory}
        products={products}
        showToast={showToast}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={(userData) => {
          setIsLoggedIn(true);
          setUser(userData);
          setCurrentView('profile');
        }}
        showToast={showToast}
      />

      <main className="main-content">
        {currentView === 'profile' ? (
          <Profile 
            products={products} 
            wishlistIds={wishlistIds} 
            user={user}
            setUser={setUser}
            orders={orders}
            onLogout={() => {
              setIsLoggedIn(false);
              setUser(null);
              setCurrentView('home');
              showToast("Successfully logged out");
            }}
            onExploreDeals={() => {
              setCurrentView('home');
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            showToast={showToast}
          />
        ) : (
          <>
            {/* Banner Hero Grid with Sidebar Categories */}
            <Hero
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Dynamic Catalog Panel based on fetch states */}
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage message={error} onRetry={retry} />
            ) : (
              <ProductList 
                products={products}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                showToast={showToast}
                onPurchase={(productId) => {
                  const product = products.find(p => p.id === productId);
                  if (product) {
                    const newOrder = {
                      id: `#SHOPX${Math.floor(1000 + Math.random() * 9000)}`,
                      title: product.title,
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      price: product.price,
                      status: 'Processing',
                      image: product.image
                    };
                    setOrders(prev => [newOrder, ...prev]);
                  }
                  setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
                  showToast("Order placed successfully!");
                }}
              />
            )}

            {/* Replicated Features Bar */}
            <div className="features-bar">
              <div className="container features-bar__content">
                <div className="feature-item">
                  <div className="feature-item__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div className="feature-item__text">
                    <h4>Secure Payment</h4>
                    <p>100% secure checkout</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-item__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="feature-item__text">
                    <h4>Worldwide Shipping</h4>
                    <p>Fast global delivery</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-item__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div className="feature-item__text">
                    <h4>Easy Returns</h4>
                    <p>30 days return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modern footer details */}
      <Footer />

      {/* ==================== CART SLIDE-OUT DRAWER ==================== */}
      <div className={`drawer-overlay ${isCartOpen ? 'drawer-overlay--visible' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="drawer drawer--cart" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__header">
            <div className="drawer__header-title">
              <ShoppingCart size={20} />
              <h3>Your Cart ({totalCartCount})</h3>
            </div>
            <button className="drawer__close-btn" onClick={() => setIsCartOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="drawer__body">
            {cart.length > 0 ? (
              <div className="drawer__items-list">
                {cart.map((item) => (
                  <div key={item.id} className="drawer-item">
                    <img src={item.image} alt={item.title} className="drawer-item__image" />
                    <div className="drawer-item__info">
                      <h4 className="drawer-item__title" title={item.title}>{item.title}</h4>
                      <span className="drawer-item__category">{item.category}</span>
                      <div className="drawer-item__pricing">
                        <span className="drawer-item__price">{formatINR(item.price)}</span>
                        <div className="drawer-item__quantity-controls">
                          <button onClick={() => handleUpdateQuantity(item.id, -1)} className="drawer-item__qty-btn">
                            <Minus size={12} />
                          </button>
                          <span className="drawer-item__qty-value">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, 1)} className="drawer-item__qty-btn">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="drawer-item__remove-btn" 
                      onClick={() => handleRemoveFromCart(item.id)}
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="drawer__empty-state">
                <ShoppingCart size={48} className="drawer__empty-icon" />
                <p>Your shopping cart is currently empty.</p>
                <button className="drawer__empty-shop-btn" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="drawer__footer">
              <div className="drawer__price-row">
                <span>Subtotal:</span>
                <span className="drawer__subtotal-value">{formatINR(cartSubtotal)}</span>
              </div>
              <p className="drawer__tax-note">Shipping and taxes calculated at checkout.</p>
              <button className="drawer__checkout-btn" onClick={() => {
                setIsCartCheckoutOpen(true);
                setIsCartOpen(false);
              }}>
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ==================== WISHLIST SLIDE-OUT DRAWER ==================== */}
      <div className={`drawer-overlay ${isWishlistOpen ? 'drawer-overlay--visible' : ''}`} onClick={() => setIsWishlistOpen(false)}>
        <div className="drawer drawer--wishlist" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__header">
            <div className="drawer__header-title">
              <Heart size={20} fill="var(--wishlist-color)" stroke="var(--wishlist-color)" />
              <h3>My Wishlist ({wishlist.length})</h3>
            </div>
            <button className="drawer__close-btn" onClick={() => setIsWishlistOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="drawer__body">
            {wishlist.length > 0 ? (
              <div className="drawer__items-list">
                {wishlist.map((item) => (
                  <div key={item.id} className="drawer-item">
                    <img src={item.image} alt={item.title} className="drawer-item__image" />
                    <div className="drawer-item__info">
                      <h4 className="drawer-item__title" title={item.title}>{item.title}</h4>
                      <span className="drawer-item__category">{item.category}</span>
                      <span className="drawer-item__price">{formatINR(item.price)}</span>
                    </div>
                    <div className="drawer-item__wishlist-actions">
                      <button 
                        className="drawer-item__wishlist-add" 
                        onClick={() => {
                          handleAddToCart(item);
                          handleToggleWishlist(item); // remove from wishlist on add to cart
                        }}
                        title="Add to cart"
                      >
                        <ShoppingCart size={14} />
                      </button>
                      <button 
                        className="drawer-item__wishlist-trash" 
                        onClick={() => handleToggleWishlist(item)}
                        title="Remove wishlist item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="drawer__empty-state">
                <Heart size={48} className="drawer__empty-icon" />
                <p>Your wishlist is currently empty.</p>
                <button className="drawer__empty-shop-btn" onClick={() => setIsWishlistOpen(false)}>
                  Explore Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Checkout Modal */}
      {isCartCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCartCheckoutOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCartCheckoutOpen(false)}><X size={20} /></button>
            <h2 className="modal-title">Checkout</h2>
            <p className="modal-desc">Complete your purchase. Total amount: <strong>{formatINR(cartSubtotal)}</strong></p>
            <form className="preorder-form" onSubmit={e => { 
              e.preventDefault(); 
              const newOrders = cart.map(item => ({
                id: `#SHOPX${Math.floor(1000 + Math.random() * 9000)}`,
                title: item.title,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                price: item.price * item.quantity,
                status: 'Processing',
                image: item.image
              }));
              setOrders(prev => [...newOrders, ...prev]);
              setCart([]);
              setIsCartCheckoutOpen(false); 
              showToast('Order placed successfully! Thank you.'); 
            }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Location Address</label>
                <textarea required rows="3"></textarea>
              </div>
              <button type="submit" className="hero-btn hero-btn--red" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
