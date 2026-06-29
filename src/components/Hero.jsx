import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, X } from 'lucide-react';
import heroImg from '../assets/shopx_hero.png';
import nexcoreImg from '../assets/nexcore_x1.png';
import watchImg from '../assets/smartwatch_new.jpg';

/* ── Sidebar categories ── */
export const SIDEBAR_CATS = [
  'All Categories','Electronics','Fashion',
  "Men's Fashion","Women's Fashion",'Footwear',
  'Watches','Bags & Wallets','Jewellery',
  'Home & Living','Beauty & Health','Sports & Outdoors',
];
export const catToId = {
  'All Categories':'all','Electronics':'electronics','Mobile':'mobile',
  'Fashion':"women's fashion","Men's Fashion":"men's fashion",
  "Women's Fashion":"women's fashion",'Footwear':'footwear',
  'Watches':'watches','Bags & Wallets':'bags',
  'Jewellery':'jewellery','Home & Living':'home & living',
  'Beauty & Health':'beauty','Sports & Outdoors':'sports',
};

/* ── All slides share the SAME layout frame ── */
const SLIDES = [
  {
    tagline: 'TRENDING COLLECTION',
    title1: 'Be Unique,',
    title2: 'Be You',
    sub: 'Premium quality products for your lifestyle.',
    btn1: 'Pre-Order Now',
    btn2: 'Explore More',
    visual: 'image', // uses the hero image
  },
  {
    tagline: 'NEW LAUNCH 2026',
    title1: 'NEXCORE',
    title2: 'X1',
    sub: 'Built for the next generation of gamers. Extreme performance. Ultimate Victory.',
    btn1: 'Pre-Order Now',
    btn2: 'Explore Features',
    visual: 'nexcore', // uses the NEXCORE X1 phone image
  },
  {
    tagline: 'LATEST SMARTWEAR',
    title1: 'KINETIC',
    title2: 'PRO WATCH',
    sub: 'Track your performance, health, and alerts in real-time. Elevate your everyday style.',
    btn1: 'Pre-Order Now',
    btn2: 'Explore Specs',
    visual: 'watch',
  },
];


const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 1.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  dur: Math.random() * 4 + 3,
  color: ['#e53e3e', '#ff6b6b', '#8b5cf6', '#3b82f6', '#facc15'][Math.floor(Math.random() * 5)],
}));



/* ══════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════ */
export default function Hero({ selectedCategory, onSelectCategory }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const bannerRef = useRef(null);
  const slide = SLIDES[activeSlide];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide(s => (s + 1) % SLIDES.length);
      setAnimKey(k => k + 1);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goToSlide = (i) => { setActiveSlide(i); setAnimKey(k => k + 1); };

  const handleMouseMove = (e) => {
    if (!bannerRef.current) return;
    const r = bannerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 62, behavior: 'smooth' });
  };

  const handleCatClick = (cat) => {
    if (onSelectCategory) onSelectCategory(catToId[cat] || 'all');
    scrollToProducts();
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-layout">


        {/* Banner — SAME frame layout for every slide */}
        <div className="hero-banner" ref={bannerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({ x: -999, y: -999 })}>

          {/* Lighting layers */}
          <div className="hl-main-glow" />
          <div className="hl-scan" />
          <div className="hl-flare hl-flare--tl" />
          <div className="hl-flare hl-flare--br" />
          <div className="hl-beam hl-beam--1" />
          <div className="hl-beam hl-beam--2" />
          <div className="hl-beam hl-beam--3" />
          <div className="hl-particles" aria-hidden="true">
            {PARTICLES.map(p => (
              <span key={p.id} className="hl-particle" style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: `${p.size}px`, height: `${p.size}px`,
                background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
              }} />
            ))}
          </div>
          <div className="hl-grid" />


          {/* ════ SAME 2-column frame for all slides ════ */}
          <div className="hero-slide-content" key={animKey}>

            {/* LEFT — Text (same structure every slide) */}
            <div className="hero-banner__text">
              <p className="hero-banner__tagline">{slide.tagline}</p>
              <h1 className="hero-banner__title">
                {slide.title1}<br />
                <span className="hero-banner__title--red">{slide.title2}</span>
              </h1>
              <p className="hero-banner__sub">{slide.sub}</p>
              <div className="hero-banner__btns">
                <button className="hero-btn hero-btn--red" onClick={() => setIsPreorderOpen(true)}>{slide.btn1}</button>
                <button className="hero-btn hero-btn--outline" onClick={() => setIsSpecsOpen(true)}>{slide.btn2}</button>
              </div>
            </div>

            {/* RIGHT — Visual (same frame, content swaps) */}
            <div className="hero-banner__img-wrap">
              <div className="hero-img-platform" />
              <img
                src={slide.visual === 'nexcore' ? nexcoreImg : slide.visual === 'watch' ? watchImg : heroImg}
                alt={slide.visual === 'nexcore' ? 'NEXCORE X1 Gaming Smartphone' : slide.visual === 'watch' ? 'Kinetic Pro Smart Watch' : 'Gaming Gear Collection'}
                className="hero-banner__img"
              />
            </div>
          </div>

          {/* Dots */}
          <div className="hero-banner__dots hero-dots-absolute">
            {SLIDES.map((_, i) => (
              <button key={i} className={`hero-dot ${i === activeSlide ? 'hero-dot--active' : ''}`} onClick={() => goToSlide(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Order Modal */}
      {isPreorderOpen && (
        <div className="modal-overlay" onClick={() => setIsPreorderOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsPreorderOpen(false)}><X size={20} /></button>
            <h2 className="modal-title">Pre-Order Form</h2>
            <p className="modal-desc">Fill out your details to reserve your unit before they run out!</p>
            <form className="preorder-form" onSubmit={e => { e.preventDefault(); setIsPreorderOpen(false); alert('When the product is available, you will be notified.'); }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <button type="submit" className="hero-btn hero-btn--red" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>Notify Me</button>
            </form>
          </div>
        </div>
      )}

      {/* Specs Modal */}
      {isSpecsOpen && (
        <div className="modal-overlay" onClick={() => setIsSpecsOpen(false)}>
          <div className="modal-content specs-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsSpecsOpen(false)}><X size={20} /></button>
            
            <div className="specs-modal-header">
              <h2 className="modal-title">{slide.title1} <span style={{color: 'var(--red)'}}>{slide.title2}</span></h2>
              <p className="modal-desc">{slide.tagline}</p>
            </div>
            
            <div className="specs-modal-body">
              <img 
                src={slide.visual === 'nexcore' ? nexcoreImg : slide.visual === 'watch' ? watchImg : heroImg} 
                alt="Product visual" 
                className="specs-img" 
              />
              <div className="specs-details">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--gray-200)' }}>Technical Specifications</h3>
                <ul className="specs-list">
                  {slide.visual === 'nexcore' ? (
                    <>
                      <li><strong>Processor:</strong> Snapdragon 8 Gen 3</li>
                      <li><strong>Display:</strong> 6.8" AMOLED 144Hz</li>
                      <li><strong>Battery:</strong> 6000mAh with 120W Fast Charge</li>
                      <li><strong>Camera:</strong> 200MP Main + 50MP Ultrawide</li>
                    </>
                  ) : slide.visual === 'watch' ? (
                    <>
                      <li><strong>Display:</strong> 1.4" Sapphire Crystal OLED</li>
                      <li><strong>Sensors:</strong> Heart Rate, SpO2, ECG, GPS</li>
                      <li><strong>Water Resistance:</strong> 5ATM / 50 Meters</li>
                      <li><strong>Battery Life:</strong> Up to 14 Days</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Quality:</strong> Premium Build Materials</li>
                      <li><strong>Style:</strong> Modern Aesthetic Design</li>
                      <li><strong>Durability:</strong> Long-lasting Performance</li>
                      <li><strong>Warranty:</strong> 2-Year International</li>
                    </>
                  )}
                </ul>
                <button className="hero-btn hero-btn--red" style={{ width: '100%', marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }} onClick={() => { setIsSpecsOpen(false); setIsPreorderOpen(true); }}>
                  Pre-Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
