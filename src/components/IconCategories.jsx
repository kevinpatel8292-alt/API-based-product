import React from 'react';
import { Grid3x3, Smartphone, Laptop, Shirt, Footprints, Watch, Home, ShoppingBag, Gem, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',                label: 'All Categories',  Icon: Grid3x3 },
  { id: 'smartphones',        label: 'Phones',          Icon: Smartphone },
  { id: 'laptops',            label: 'Laptops',         Icon: Laptop },
  { id: 'mens-shirts',        label: 'Men\'s Fashion',  Icon: Shirt },
  { id: 'womens-dresses',     label: 'Women\'s Fashion',Icon: ShoppingBag },
  { id: 'mens-shoes',         label: 'Footwear',        Icon: Footprints },
  { id: 'mens-watches',       label: 'Watches',         Icon: Watch },
  { id: 'home-decoration',    label: 'Home Decor',      Icon: Home },
  { id: 'womens-jewellery',   label: 'Jewellery',       Icon: Gem },
  { id: 'fragrances',         label: 'Beauty',          Icon: Sparkles },
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
