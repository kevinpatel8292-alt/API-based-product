import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog', 'Affiliates'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Track Order', 'Returns', 'Shipping Info', 'Contact Us'],
    },
    {
      title: 'Shop',
      links: ['New Arrivals', 'Electronics', 'Fashion', 'Deals', 'Best Sellers'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
    },
  ];

  return (
    <footer className="shopx-footer" id="about">

      {/* Top Features Strip */}
      <div className="sf-features">
        <div className="sf-feat-wrap">
          {[
            { icon: '🔒', t: 'Secure Payments',  s: '100% secure payment' },
            { icon: '🚚', t: 'Free Delivery',     s: 'On orders over $50'   },
            { icon: '🎧', t: '24/7 Support',      s: 'Always here for you'  },
            { icon: '🔄', t: 'Easy Returns',      s: '30-day return policy' },
          ].map(({ icon, t, s }) => (
            <div key={t} className="sf-feat">
              <span className="sf-feat__icon">{icon}</span>
              <div>
                <p className="sf-feat__title">{t}</p>
                <p className="sf-feat__sub">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="sf-main">
        <div className="sf-main-wrap">

          {/* Brand */}
          <div className="sf-brand">
            <div className="sf-logo">SHOP<span className="sf-logo__x">X</span></div>
            <p className="sf-brand__desc">
              Your one-stop destination for premium products. Quality, style, and value — all in one place.
            </p>
            <div className="sf-socials">
              {[
                { label: 'FB',  href: 'https://facebook.com' },
                { label: 'IG',  href: 'https://instagram.com' },
                { label: 'TW',  href: 'https://twitter.com' },
                { label: 'YT',  href: 'https://youtube.com' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="sf-social">{label}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {cols.map(({ title, links }) => (
            <div key={title} className="sf-col">
              <h4 className="sf-col__title">{title}</h4>
              <ul className="sf-col__links">
                {links.map(l => (
                  <li key={l}><a href="#" onClick={e => e.preventDefault()}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="sf-col sf-newsletter">
            <h4 className="sf-col__title">Newsletter</h4>
            <p className="sf-newsletter__desc">Subscribe for exclusive deals and new arrivals.</p>
            <form className="sf-newsletter__form" onSubmit={e => { e.preventDefault(); alert('Subscribed!'); e.target.reset(); }}>
              <input type="email" placeholder="Your email address" required className="sf-newsletter__input" />
              <button type="submit" className="sf-newsletter__btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sf-bottom">
        <div className="sf-bottom-wrap">
          <p>&copy; {year} SHOPX. All rights reserved.</p>
          <div className="sf-payments">
            {['VISA', 'Mastercard', 'PayPal', 'Amex'].map(p => (
              <span key={p} className="sf-pay-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
