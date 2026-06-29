import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function ProductCard({ product, isWishlisted = false, onToggleWishlist = () => {}, onAddToCart = () => {}, onBuyNow = () => {}, onViewDetails = () => {} }) {
  const { title, price, category, image, rating } = product;

  const catLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.round(rating?.rate || 0);
    return (
      <Star key={i} size={11}
        fill={filled ? '#facc15' : 'transparent'}
        stroke={filled ? '#facc15' : '#475569'}
        strokeWidth={1.5}
      />
    );
  });

  return (
    <div className="pc" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }}>
      {/* Image */}
      <div className="pc__img-zone">
        <img src={image} alt={title} className="pc__img" loading="lazy" />
        <button
          className={`pc__heart ${isWishlisted ? 'pc__heart--active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleWishlist(product); }}
          aria-label="Wishlist"
        >
          <Heart size={15}
            fill={isWishlisted ? '#e53e3e' : 'transparent'}
            stroke={isWishlisted ? '#e53e3e' : '#94a3b8'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Info */}
      <div className="pc__body">
        <p className="pc__cat">{catLabel}</p>
        <h3 className="pc__title">{title}</h3>
        <div className="pc__stars">
          {stars}
          <span className="pc__count">({rating?.count ?? 0})</span>
        </div>
        <p className="pc__price">{formatINR(price)}</p>
        <div className="pc__actions">
          <button className="pc__cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
            <ShoppingCart size={13} />
            Add to Cart
          </button>
          <button className="pc__buy-btn" onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
