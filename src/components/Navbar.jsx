import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { SIDEBAR_CATS, catToId } from './Hero';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  searchTerm = '',
  setSearchTerm = () => {},
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  isDark = true,
  onToggleTheme = () => {},
  onSelectCategory = () => {},
  products = [],
  showToast = () => {},
  currentView = 'home',
  setCurrentView = () => {},
  isLoggedIn = false,
  onOpenAuth = () => {},
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = React.useMemo(() => {
    if (!searchTerm.trim() || !products.length) return [];
    const q = searchTerm.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5);
  }, [searchTerm, products]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    
    if (id === 'deals') {
      showToast("Amazing deals are coming soon!");
      return;
    }

    const go = () => {
      if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 62, behavior: 'smooth' });
    };

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(go, 100);
    } else {
      go();
    }
  };

  const navLinks = [
    { label: 'HOME',       id: 'home',       active: true },
    { label: 'SHOP',       id: 'products',   active: false },
    { label: 'CATEGORIES', id: 'categories', active: false },
    { label: 'DEALS',      id: 'deals',      active: false },
    { label: 'ABOUT US',   id: 'about',      active: false },
  ];

  return (
    <header className={`navbar-wrap ${isScrolled ? 'navbar-wrap--scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={e => scrollTo(e, 'home')}>
          SHOP<span className="nav-logo__x">X</span>
        </a>

        {/* Desktop Links */}
        <nav className="nav-links">
          {navLinks.map(({ label, id, active }) => (
            id === 'categories' ? (
              <div key={id} className="nav-dropdown-wrap">
                <a
                  href={`#products`}
                  className={`nav-link ${active ? 'nav-link--active' : ''}`}
                  onClick={e => scrollTo(e, 'products')}
                >
                  {label}
                </a>
                <div className="nav-dropdown">
                  {SIDEBAR_CATS.map(cat => (
                    <button 
                      key={cat} 
                      className="nav-dropdown__item"
                      onClick={() => {
                        onSelectCategory(catToId[cat] || 'all');
                        scrollTo({ preventDefault: () => {} }, 'products');
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${active ? 'nav-link--active' : ''}`}
                onClick={e => scrollTo(e, id)}
              >
                {label}
              </a>
            )
          ))}
        </nav>

        {/* Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="nav-search__input"
          />
          <button className="nav-search__icon-btn" aria-label="Search">
            <Search size={16} />
          </button>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && searchTerm.trim() && (
            <div className="search-suggestions">
              {searchSuggestions.length > 0 ? (
                searchSuggestions.map(p => (
                  <div key={p.id} className="suggestion-item" onClick={() => {
                    setSearchTerm(p.title);
                    setShowSuggestions(false);
                    scrollTo({ preventDefault: () => {} }, 'products');
                  }}>
                    <img src={p.image} alt={p.title} className="suggestion-img" />
                    <div className="suggestion-info">
                      <p className="suggestion-title">{p.title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="suggestion-empty">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="nav-right">

          {/* ── Theme Toggle Button ── */}
          <button
            className="nav-theme-toggle"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <span className="nav-theme-toggle__track">
              <span className="nav-theme-toggle__thumb">
                {isDark
                  ? <Moon size={11} strokeWidth={2} />
                  : <Sun  size={11} strokeWidth={2} />
                }
              </span>
            </span>
            <span className="nav-theme-toggle__label">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </button>

          <button 
            className={`nav-icon-btn ${currentView === 'profile' ? 'nav-icon-btn--active' : ''}`}
            title="Account"
            onClick={() => isLoggedIn ? setCurrentView('profile') : onOpenAuth()}
          >
            <User size={20} />
          </button>
          <button className="nav-icon-btn nav-icon-btn--rel" onClick={onOpenWishlist} title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </button>
          <button className="nav-icon-btn nav-icon-btn--rel" onClick={onOpenCart} title="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </button>

          {/* Hamburger for mobile */}
          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="nav-mobile">
          <div className="nav-mobile__search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search size={16} />
          </div>
          {navLinks.map(({ label, id }) => (
            <a key={id} href={`#${id}`} className="nav-mobile__link" onClick={e => scrollTo(e, id)}>
              {label}
            </a>
          ))}
          {/* Mobile theme toggle */}
          <button className="nav-mobile__theme" onClick={onToggleTheme}>
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
            <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
