import React from 'react';
import { Grid3x3, Smartphone, Shirt, Footprints, Watch, Home, ShoppingBag, Gem, Dumbbell, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',            label: 'All Categories',  Icon: Grid3x3 },
  { id: 'electronics',   label: 'Electronics',      Icon: Smartphone },
  { id: "men's fashion", label: 'Fashion',           Icon: Shirt },
  { id: 'footwear',      label: 'Footwear',          Icon: Footprints },
  { id: 'watches',       label: 'Watches',           Icon: Watch },
  { id: 'home & living', label: 'Home & Living',     Icon: Home },
  { id: 'bags',          label: 'Bags',              Icon: ShoppingBag },
  { id: 'jewellery',     label: 'Jewellery',         Icon: Gem },
  { id: 'sports',        label: 'Sports',            Icon: Dumbbell },
  { id: 'beauty',        label: 'Beauty',            Icon: Sparkles },
];

export default function IconCategories({ selectedCategory = 'all', onSelectCategory = () => {} }) {
  const handleClick = (id) => {
    onSelectCategory(id);
    const el = document.getElementById('products');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 115;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="icon-cats" id="categories">
      <div className="container icon-cats__grid">
        {CATEGORIES.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`icon-cat-btn ${selectedCategory === id ? 'icon-cat-btn--active' : ''}`}
            onClick={() => handleClick(id)}
          >
            <div className="icon-cat-btn__circle">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <span className="icon-cat-btn__label">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
