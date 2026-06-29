import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  Edit2,
  Check,
  X as XIcon,
  Crown,
  Calendar,
  Phone,
  Mail,
  Package
} from 'lucide-react';
import { formatINR } from '../utils/currency';
import ProductCard from './ProductCard'; 

export default function Profile({ 
  products = [], 
  wishlistIds = [], 
  onExploreDeals = () => {}, 
  showToast = () => {},
  user,
  setUser,
  orders = [],
  onLogout = () => {}
}) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || 'Jay Patel',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'jaypatel@gmail.com'
  });
  
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id)).slice(0, 3); 

  const menuItems = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'addresses', icon: MapPin, label: 'Addresses' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-glow"></div>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=111&color=e53e3e&size=100&bold=true`} alt={userData.name} className="profile-avatar" />
            </div>
            <h3 className="profile-name">{userData.name}</h3>
            <p className="profile-email">{userData.email}</p>
            <div className="profile-badge">
              <Crown size={12} className="profile-badge-icon" /> Premium Member
            </div>
          </div>

          <nav className="profile-nav">
            {menuItems.map(item => (
              <button 
                key={item.id} 
                className={`profile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <div className="profile-nav-divider"></div>
            <button className="profile-nav-btn logout-btn" onClick={onLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="profile-content">
          <div className="profile-content-header">
            <div>
              <h1 className="profile-title">My Profile</h1>
              <div className="profile-breadcrumbs">Home <span className="separator">&gt;</span> <span className="current">My Profile</span></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {isEditing ? (
                <>
                  <button 
                    className="hero-btn hero-btn--outline profile-edit-btn"
                    onClick={() => setIsEditing(false)}
                    style={{ borderColor: 'var(--gray-500)', color: 'var(--gray-300)' }}
                  >
                    <XIcon size={16} /> Cancel
                  </button>
                  <button 
                    className="hero-btn hero-btn--red profile-edit-btn"
                    onClick={() => {
                      setIsEditing(false);
                      if (setUser) {
                        setUser(userData);
                      }
                      showToast("Profile updated successfully!");
                    }}
                  >
                    <Check size={16} /> Save Profile
                  </button>
                </>
              ) : (
                <button 
                  className="hero-btn hero-btn--outline profile-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="profile-overview">
              
              {/* User Stats Card */}
              <div className="profile-stats-card">
                <div className="stat-grid">
                  <div className="stat-item">
                    <div className="stat-icon-wrap"><User size={20} /></div>
                    <div className="stat-info">
                      <span className="stat-label">Full Name</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="profile-edit-input" 
                          value={userData.name} 
                          onChange={(e) => setUserData({...userData, name: e.target.value})} 
                        />
                      ) : (
                        <span className="stat-value">{userData.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon-wrap"><Phone size={20} /></div>
                    <div className="stat-info">
                      <span className="stat-label">Phone Number</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="profile-edit-input" 
                          value={userData.phone} 
                          onChange={(e) => setUserData({...userData, phone: e.target.value})} 
                        />
                      ) : (
                        <span className="stat-value">{userData.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon-wrap"><Crown size={20} /></div>
                    <div className="stat-info">
                      <span className="stat-label">Membership</span>
                      <span className="stat-value">Premium Member</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon-wrap"><Mail size={20} /></div>
                    <div className="stat-info">
                      <span className="stat-label">Email Address</span>
                      {isEditing ? (
                        <input 
                          type="email" 
                          className="profile-edit-input" 
                          value={userData.email} 
                          onChange={(e) => setUserData({...userData, email: e.target.value})} 
                        />
                      ) : (
                        <span className="stat-value">{userData.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon-wrap"><Package size={20} /></div>
                    <div className="stat-info">
                      <span className="stat-label">Total Orders</span>
                      <span className="stat-value">12 Orders</span>
                    </div>
                  </div>
                </div>
                <div className="stat-card-bg-logo">X</div>
              </div>

              {/* Grid for Recent Orders and Wishlist */}
              <div className="profile-split-grid">
                
                {/* Recent Orders */}
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Recent Orders</h2>
                    <button className="view-all-link">View All</button>
                  </div>
                  <div className="mini-list">
                    {orders.length > 0 ? orders.map((order, i) => (
                      <div className="mini-card" key={i}>
                        <div className="mini-img-wrap">
                          <img src={order.image} alt={order.title} />
                        </div>
                        <div className="mini-details">
                          <h4>{order.title}</h4>
                          <span className="mini-sub">Order ID: {order.id}</span>
                          <span className="mini-sub">{order.date}</span>
                        </div>
                        <div className="mini-right">
                          <div className="mini-price">{formatINR(order.price)}</div> 
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                      </div>
                    )) : (
                      <div className="empty-mini">No orders placed yet.</div>
                    )}
                  </div>
                </div>

                {/* Wishlist Preview */}
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Wishlist</h2>
                    <button className="view-all-link">View All</button>
                  </div>
                  <div className="mini-list">
                    {wishlistProducts.length > 0 ? wishlistProducts.map((p, i) => (
                      <div className="mini-card" key={i}>
                        <div className="mini-img-wrap">
                          <img src={p.image} alt={p.title} />
                        </div>
                        <div className="mini-details">
                          <h4>{p.title}</h4>
                          <span className="mini-price">{formatINR(p.price)}</span>
                        </div>
                        <div className="mini-right">
                          <Heart size={20} className="heart-filled" fill="var(--red)" color="var(--red)" />
                        </div>
                      </div>
                    )) : (
                      <div className="empty-mini">Your wishlist is empty.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Premium Banner */}
              <div className="premium-banner">
                <div className="premium-banner-left">
                  <div className="premium-icon-wrap">
                    <Crown size={28} />
                  </div>
                  <div className="premium-text">
                    <h3>You're a Premium Member!</h3>
                    <p>Enjoy exclusive deals, early access to offers and much more.</p>
                  </div>
                </div>
                <button className="hero-btn hero-btn--red" onClick={onExploreDeals}>Explore Deals</button>
              </div>

            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-section" style={{ minHeight: '400px' }}>
              <div className="section-header">
                <h2>My Orders</h2>
              </div>
              <div className="mini-list">
                {orders.length > 0 ? orders.map((order, i) => (
                  <div className="mini-card" key={i}>
                    <div className="mini-img-wrap">
                      <img src={order.image} alt={order.title} />
                    </div>
                    <div className="mini-details">
                      <h4>{order.title}</h4>
                      <span className="mini-sub">Order ID: {order.id}</span>
                      <span className="mini-sub">{order.date}</span>
                    </div>
                    <div className="mini-right">
                      <div className="mini-price">{formatINR(order.price)}</div> 
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                  </div>
                )) : (
                  <div className="empty-mini">No orders placed yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab !== 'profile' && activeTab !== 'orders' && (
            <div className="coming-soon-tab">
              <h2>{menuItems.find(i => i.id === activeTab)?.label}</h2>
              <p>This section is under construction.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
