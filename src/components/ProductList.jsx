import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { PackageX, ArrowRight, X } from 'lucide-react';
import { formatINR } from '../utils/currency';

const FILTER_TABS = [
  { id: 'all',              label: 'All' },
  { id: 'electronics',      label: 'Electronics' },
  { id: 'mobile',           label: 'Mobile' },
  { id: "men's fashion",    label: "Men's" },
  { id: "women's fashion",  label: "Women's" },
  { id: 'jewellery',        label: 'Jewellery' },
];

export default function ProductList({
  products = [],
  searchTerm = '',
  setSearchTerm = () => {},
  selectedCategory = 'all',
  setSelectedCategory = () => {},
  wishlistIds = [],
  onToggleWishlist = () => {},
  onAddToCart = () => {},
  showToast = () => {},
  onPurchase = () => {},
}) {
  const [sortBy, setSortBy] = useState('rating');
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 36, s: 59 });
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState('Any Capacity');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { d, h, m, s } = prev;
        if (s > 0) {
          s--;
        } else {
          s = 59;
          if (m > 0) {
            m--;
          } else {
            m = 59;
            if (h > 0) {
              h--;
            } else {
              h = 23;
              if (d > 0) d--;
            }
          }
        }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q));
    }
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return list;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <section className="catalog-section" id="products">
      <div className="catalog-container">

        {/* Header row */}
        <div className="catalog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
            <h2 className="catalog-heading">Top Rated Products</h2>
            <div className="offer-timer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 0 }}>
              <span className="offer-timer__text">Exclusive Sale Ends In:</span>
              <div className="offer-timer__blocks" style={{ display: 'flex', gap: '0.4rem' }}>
                <div className="time-box">
                  <span className="time-box__val">{timeLeft.d}</span>
                  <span className="time-box__label">Days</span>
                </div>
                <div className="time-box">
                  <span className="time-box__val">{timeLeft.h}</span>
                  <span className="time-box__label">Hrs</span>
                </div>
                <div className="time-box">
                  <span className="time-box__val">{timeLeft.m}</span>
                  <span className="time-box__label">Mins</span>
                </div>
                <div className="time-box">
                  <span className="time-box__val">{timeLeft.s}</span>
                  <span className="time-box__label">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="catalog-controls">
          <div className="catalog-tabs">
            {FILTER_TABS.map(({ id, label }) => (
              <button
                key={id}
                className={`ctab ${selectedCategory === id ? 'ctab--active' : ''}`}
                onClick={() => setSelectedCategory(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <select 
            className="catalog-sort" 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="rating">Top Rated</option>
            <option value="price-desc">Price ↑</option>
            <option value="price-asc">Price ↓</option>
          </select>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="catalog-grid">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlistIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onBuyNow={(product) => setCheckoutProduct(product)}
                onViewDetails={(product) => { setDetailsProduct(product); setMainImageIdx(0); }}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <PackageX size={44} />
            <h3>No products found</h3>
            <p>Try adjusting your filters or search.</p>
            <button onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}>
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutProduct && (
        <div className="modal-overlay" onClick={() => setCheckoutProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCheckoutProduct(null)}><X size={20} /></button>
            <h2 className="modal-title">Checkout</h2>
            <p className="modal-desc">Complete your purchase for <strong>{checkoutProduct.title}</strong></p>
            <form className="preorder-form" onSubmit={e => { e.preventDefault(); onPurchase(checkoutProduct.id); setCheckoutProduct(null); }}>
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

      {/* Details Modal */}
      {detailsProduct && (
        <div className="modal-overlay" onClick={() => setDetailsProduct(null)}>
          <div className="modal-content pd-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetailsProduct(null)}><X size={20} /></button>
            <div className="pd-modal-inner">
              {/* Image Gallery */}
              <div className="pd-gallery">
                <div className="pd-gallery-main">
                  <img src={detailsProduct.images?.[mainImageIdx] || detailsProduct.image} alt={detailsProduct.title} />
                </div>
                <div className="pd-gallery-thumbs">
                  {(detailsProduct.images || [detailsProduct.image]).map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Thumbnail ${idx}`} 
                      className={`pd-thumb ${idx === mainImageIdx ? 'active' : ''}`}
                      onClick={() => setMainImageIdx(idx)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Details */}
              <div className="pd-info">
                <span className="pd-cat">{detailsProduct.category.toUpperCase()}</span>
                <h2 className="pd-title">{detailsProduct.title}</h2>
                <div className="pd-price">{formatINR(detailsProduct.price)}</div>

                {/* Capacity Selector (only for mobiles) */}
                {detailsProduct.category === 'mobile' && (
                  <div className="pd-capacity-wrapper">
                    <div className="pd-capacity-header">
                      Capacity: <strong>{selectedCapacity}</strong>
                    </div>
                    <div className="pd-capacity-options">
                      {['1 TB', '2 TB', '256 GB', '512 GB'].map(cap => (
                        <button 
                          key={cap}
                          className={`pd-capacity-btn ${selectedCapacity === cap ? 'active' : ''}`}
                          onClick={() => setSelectedCapacity(cap)}
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="pd-desc">{detailsProduct.description}</p>
                <div className="pd-actions">
                  <button className="hero-btn hero-btn--outline" onClick={() => { onAddToCart(detailsProduct); }}>
                    Add to Cart
                  </button>
                  <button className="hero-btn hero-btn--red" onClick={() => { setDetailsProduct(null); setCheckoutProduct(detailsProduct); }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
