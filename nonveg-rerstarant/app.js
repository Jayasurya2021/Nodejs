/* ==========================================================================
   REAL MEAT - 100% PURE LIGHT THEME (SUPER CLEAN SEPARATE AUTH & RICH REVIEWS JS)
   ========================================================================== */

// --- 1. COMPREHENSIVE NON-VEG DISH DATABASE ---
const DISHES_DATA = [
  {
    id: 'nv-101',
    name: 'Royal Hyderabadi Mutton Biryani',
    category: 'biryani',
    price: 349,
    originalPrice: 450,
    rating: 4.9,
    ratingCount: 1490,
    prepTime: '25-30 min',
    calories: '650 kcal',
    description: 'Aromatic long-grain basmati rice dum cooked with juicy succulent mutton pieces, saffron, mint leaves & royal spices. Served with Mirchi Ka Salan & Raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: true,
    portions: [
      { name: 'Half Handi (Serves 1)', priceOffset: 0 },
      { name: 'Full Royal Handi (Serves 2-3)', priceOffset: 160 }
    ],
    spiceLevels: ['Medium Spicy', 'Fiery Hyderabadi Hot', 'Mild']
  },
  {
    id: 'nv-102',
    name: 'Fiery Tandoori Chicken (Full)',
    category: 'kebabs',
    price: 449,
    originalPrice: 490,
    rating: 4.8,
    ratingCount: 980,
    prepTime: '20-25 min',
    calories: '520 kcal',
    description: 'Whole tender chicken marinated in rich spicy hung curd & tandoori masala, charred to perfection in clay tandoor.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: true,
    portions: [
      { name: 'Half Tandoori (4 Pcs)', priceOffset: -180 },
      { name: 'Full Tandoori (8 Pcs)', priceOffset: 0 }
    ],
    spiceLevels: ['Classic Tandoori', 'Extra Fiery Smoked']
  },
  {
    id: 'nv-103',
    name: 'Juicy Gourmet Bacon & Chicken Burger',
    category: 'burgers',
    price: 299,
    originalPrice: 350,
    rating: 4.7,
    ratingCount: 750,
    prepTime: '15-20 min',
    calories: '580 kcal',
    description: 'Double grilled chicken patty loaded with crispy smoked bacon strips, melted cheddar cheese & signature BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: false,
    customizable: true,
    portions: [
      { name: 'Single Patty', priceOffset: 0 },
      { name: 'Monster Double Patty', priceOffset: 90 }
    ],
    spiceLevels: ['Classic Mild', 'Spicy Jalapeno']
  },
  {
    id: 'nv-104',
    name: 'Butter Chicken Special Handi',
    category: 'curries',
    price: 340,
    originalPrice: 390,
    rating: 4.9,
    ratingCount: 1850,
    prepTime: '20-25 min',
    calories: '610 kcal',
    description: 'Iconic boneless tandoori chicken simmered in rich creamy tomato butter gravy, infused with kasuri methi & fresh cream.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: false,
    customizable: true,
    portions: [
      { name: 'Regular Handi (500ml)', priceOffset: 0 },
      { name: 'Jumbo Handi (800ml)', priceOffset: 120 }
    ],
    spiceLevels: ['Mild Creamy', 'Medium Spice']
  },
  {
    id: 'nv-105',
    name: 'Spicy Garlic Butter Tiger Prawns',
    category: 'seafood',
    price: 490,
    originalPrice: 560,
    rating: 4.8,
    ratingCount: 620,
    prepTime: '20-25 min',
    calories: '440 kcal',
    description: 'Fresh jumbo tiger prawns pan-seared in rich garlic butter sauce, red pepper flakes & fresh cilantro.',
    image: 'https://images.unsplash.com/photo-1559742811-822863646df1?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-106',
    name: 'Smokey BBQ Mutton Ribs & Wings Combo',
    category: 'bbq',
    price: 540,
    originalPrice: 620,
    rating: 4.9,
    ratingCount: 410,
    prepTime: '25-35 min',
    calories: '720 kcal',
    description: 'Slow smoked mutton ribs glazed with sticky honey bourbon BBQ sauce, paired with 6 crispy chicken wings.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: false,
    customizable: true,
    portions: [
      { name: 'Standard Platter', priceOffset: 0 },
      { name: 'Feast Mega Platter', priceOffset: 220 }
    ],
    spiceLevels: ['Sweet & Smoky BBQ', 'Hot & Spicy BBQ']
  },
  {
    id: 'nv-107',
    name: 'Kolkata Style Chicken Dum Biryani',
    category: 'biryani',
    price: 310,
    originalPrice: 360,
    rating: 4.6,
    ratingCount: 890,
    prepTime: '20-25 min',
    calories: '590 kcal',
    description: 'Fragrant aromatic rice infused with kewra water, juicy chicken leg, golden fried potato & soft boiled egg.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: false,
    customizable: false
  },
  {
    id: 'nv-108',
    name: 'Chicken Seekh Kebab (6 Pcs)',
    category: 'kebabs',
    price: 280,
    originalPrice: 330,
    rating: 4.7,
    ratingCount: 1100,
    prepTime: '15-20 min',
    calories: '410 kcal',
    description: 'Minced chicken blended with aromatic herbs, ginger, garlic & green chillies, skewered and charcoal grilled.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-109',
    name: 'Crispy Fried Chicken Wings (8 Pcs)',
    category: 'starters',
    price: 250,
    originalPrice: 299,
    rating: 4.8,
    ratingCount: 1650,
    prepTime: '15-20 min',
    calories: '480 kcal',
    description: 'Extra crunchy double-dipped fried chicken wings tossed in your choice of Peri-Peri seasoning or Buffalo Dip.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: true,
    portions: [
      { name: '8 Pieces', priceOffset: 0 },
      { name: '16 Pieces Bucket', priceOffset: 210 }
    ],
    spiceLevels: ['Peri-Peri Crunch', 'Ghost Pepper Fiery', 'Tangy BBQ']
  },
  {
    id: 'nv-110',
    name: 'Mutton Rogan Josh Special',
    category: 'curries',
    price: 430,
    originalPrice: 490,
    rating: 4.9,
    ratingCount: 780,
    prepTime: '25-30 min',
    calories: '630 kcal',
    description: 'Kashmiri delicacy featuring tender lamb chunks slow cooked in gravy scented with Kashmiri red chillies & dry ginger.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-111',
    name: 'Amritsari Crispy Fish Fry',
    category: 'seafood',
    price: 360,
    originalPrice: 420,
    rating: 4.7,
    ratingCount: 540,
    prepTime: '15-20 min',
    calories: '430 kcal',
    description: 'Boneless fish fillets marinated in carom seeds (ajwain), gram flour & spicy North Indian spices, deep fried golden.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-112',
    name: 'Ultimate Non-Veg Feast Platter',
    category: 'combos',
    price: 890,
    originalPrice: 1050,
    rating: 5.0,
    ratingCount: 390,
    prepTime: '30-35 min',
    calories: '1150 kcal',
    description: 'The King of Non-Veg! Half Tandoori Chicken, 4 Seekh Kebabs, 4 Crispy Wings, 1 Portion Butter Chicken & 2 Rumali Roti.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isBestseller: true,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-113',
    name: 'Crispy Chicken Shawarma Roll',
    category: 'burgers',
    price: 190,
    originalPrice: 230,
    rating: 4.6,
    ratingCount: 1320,
    prepTime: '12-15 min',
    calories: '390 kcal',
    description: 'Shredded roasted chicken wrap with garlic mayo, spicy tahini, pickled veggies & french fries wrapped in soft pita.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: false,
    customizable: false
  },
  {
    id: 'nv-114',
    name: 'Malai Chicken Tikka (8 Pcs)',
    category: 'kebabs',
    price: 320,
    originalPrice: 370,
    rating: 4.8,
    ratingCount: 870,
    prepTime: '15-20 min',
    calories: '490 kcal',
    description: 'Melt-in-mouth chicken breast cubes marinated in cashew paste, fresh cream, cardamom & cheese, tandoor roasted.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: false,
    customizable: false
  },
  {
    id: 'nv-115',
    name: 'Chettinad Spicy Mutton Curry',
    category: 'curries',
    price: 410,
    originalPrice: 460,
    rating: 4.8,
    ratingCount: 460,
    prepTime: '25-30 min',
    calories: '610 kcal',
    description: 'Authentic South Indian mutton curry cooked with freshly ground coconut, star anise, curry leaves & black pepper.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: true,
    customizable: false
  },
  {
    id: 'nv-116',
    name: 'Grilled Salmon Steak with Herbs',
    category: 'seafood',
    price: 650,
    originalPrice: 750,
    rating: 4.9,
    ratingCount: 230,
    prepTime: '20-25 min',
    calories: '510 kcal',
    description: 'Fresh Norwegian salmon fillet seared with dill butter, garlic, roasted veggies & mashed potatoes.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
    isSpicy: false,
    customizable: false
  }
];

// --- 2. LOCALSTORAGE STATE MANAGER ---
class StorageManager {
  static get(key, defaultValue) {
    try {
      const data = localStorage.getItem(`carnivore_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(`carnivore_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage:', e);
    }
  }

  static getCart() { return this.get('cart', []); }
  static saveCart(cart) { this.set('cart', cart); }

  static getFavorites() { return this.get('favorites', []); }
  static saveFavorites(favs) { this.set('favorites', favs); }

  static getUser() { return this.get('user', null); }
  static saveUser(user) { this.set('user', user); }
  static clearUser() { localStorage.removeItem('carnivore_user'); }

  static getAddress() {
    return this.get('address', {
      tag: 'Home',
      street: '42 Gourmet Avenue, Sector 5',
      city: 'Downtown',
      landmark: 'Near Royal Plaza'
    });
  }
  static saveAddress(addr) { this.set('address', addr); }

  static getOrders() { return this.get('orders', []); }
  static saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.set('orders', orders);
  }

  static getReviews(dishId) {
    const sampleReviews = [
      { name: 'Rahul Sharma', rating: 5, comment: 'Absolutely delicious! Extremely fresh meat and perfect dum spices.', date: 'Yesterday' },
      { name: 'Priya Patel', rating: 5, comment: 'The best non-veg in town. Super fast delivery and smoking hot flavor!', date: '3 days ago' },
      { name: 'Anik Roy', rating: 4, comment: 'Very juicy meat! Portions are generous.', date: '1 week ago' }
    ];
    return this.get(`reviews_${dishId}`, sampleReviews);
  }

  static saveReview(dishId, review) {
    const reviews = this.getReviews(dishId);
    reviews.unshift(review);
    this.set(`reviews_${dishId}`, reviews);
  }
}

// --- 3. APPLICATION GLOBAL STATE ---
let state = {
  cart: StorageManager.getCart(),
  favorites: StorageManager.getFavorites(),
  user: StorageManager.getUser(),
  address: StorageManager.getAddress(),
  activeCategory: 'all',
  activeFilter: 'all',
  sortBy: 'relevance',
  searchQuery: '',
  appliedCoupon: null,
  deliveryTip: 20,
  currentSlide: 0,
  customizingDish: null,
  selectedPortion: null,
  selectedSpice: null,
  selectedRatingScore: 5
};

// --- 4. CAROUSEL BANNER LOGIC ---
function initCarousel() {
  const slides = document.querySelectorAll('.full-hero-slide');
  const slidesContainer = document.getElementById('carouselSlides');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (!slidesContainer || slides.length === 0) return;

  indicatorsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `full-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    indicatorsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    state.currentSlide = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll('.full-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  prevBtn?.addEventListener('click', () => goToSlide(state.currentSlide - 1));
  nextBtn?.addEventListener('click', () => goToSlide(state.currentSlide + 1));

  setInterval(() => {
    goToSlide(state.currentSlide + 1);
  }, 5000);
}

// --- 5. RENDER MENU GRID ---
function filterAndSortDishes() {
  let filtered = [...DISHES_DATA];

  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(d => d.category === state.activeCategory);
  }

  if (state.activeFilter === 'bestseller') {
    filtered = filtered.filter(d => d.isBestseller);
  } else if (state.activeFilter === 'top-rated') {
    filtered = filtered.filter(d => d.rating >= 4.8);
  } else if (state.activeFilter === 'spicy') {
    filtered = filtered.filter(d => d.isSpicy);
  } else if (state.activeFilter === 'fast') {
    filtered = filtered.filter(d => d.prepTime.includes('15') || d.prepTime.includes('20'));
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
  }

  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

function renderMenuGrid() {
  const grid = document.getElementById('dishGrid');
  const countEl = document.getElementById('dishCountLabel');
  if (!grid) return;

  const dishes = filterAndSortDishes();
  if (countEl) countEl.innerText = `${dishes.length} Items Available`;

  if (dishes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🥩</div>
        <h3 style="font-size: 1.3rem; color: var(--text-primary);">No REAL MEAT dishes found!</h3>
        <p>Try searching for Biryani, Kebabs, or Tandoori Chicken.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = dishes.map(dish => {
    const cartItem = state.cart.find(item => item.id === dish.id);
    const inCartQty = cartItem ? cartItem.qty : 0;
    const isFav = state.favorites.includes(dish.id);

    return `
      <div class="dish-card" data-id="${dish.id}">
        <div class="dish-img-container" onclick="window.location.href='product.html?id=${dish.id}'">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" />
          <div class="dish-overlay-badge">
            ${dish.isBestseller ? '<span class="tag-badge">★ BESTSELLER</span>' : ''}
            ${dish.isSpicy ? '<span class="tag-badge spicy">🌶️ SPICY</span>' : ''}
          </div>
          <button class="wishlist-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${dish.id}')" title="Add to Wishlist">
            ${isFav ? '❤️' : '♡'}
          </button>
        </div>

        <div class="dish-info">
          <div class="dish-title-wrap" onclick="window.location.href='product.html?id=${dish.id}'">
            <span class="non-veg-badge"></span>
            <h3 class="dish-title">${dish.name}</h3>
          </div>

          <p class="dish-desc" onclick="window.location.href='product.html?id=${dish.id}'">${dish.description}</p>

          <div class="dish-footer-row">
            <div class="dish-left-specs" onclick="window.location.href='product.html?id=${dish.id}'">
              <span class="rating-orange">★ ${dish.rating} <span style="font-size: 0.78rem; color: #94a3b8; font-weight: 600;">(${dish.ratingCount}+)</span></span>
              <span class="prep-time-grey">⏱️ ${dish.prepTime}</span>
            </div>

            <div class="dish-right-action">
              <span class="price-text-bold">₹${dish.price}</span>
              ${inCartQty > 0 ? `
                <div class="qty-control">
                  <button class="qty-btn" onclick="updateCartQty('${dish.id}', -1)">-</button>
                  <span class="qty-num">${inCartQty}</span>
                  <button class="qty-btn" onclick="updateCartQty('${dish.id}', 1)">+</button>
                </div>
              ` : `
                <button class="add-orange-pill-btn" onclick="handleAddClick('${dish.id}')">Add +</button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 6. STANDALONE DEDICATED PRODUCT VIEW PAGE INIT ---
function initStandaloneProductPage() {
  const root = document.getElementById('standaloneProductRoot');
  if (!root) return;

  const urlParams = new URLSearchParams(window.location.search);
  const dishId = urlParams.get('id') || 'nv-101';
  const dish = DISHES_DATA.find(d => d.id === dishId) || DISHES_DATA[0];

  const reviews = StorageManager.getReviews(dish.id);

  let relevantDishes = DISHES_DATA.filter(d => d.category === dish.category && d.id !== dish.id);
  if (relevantDishes.length < 4) {
    const additionalDishes = DISHES_DATA.filter(d => d.id !== dish.id && !relevantDishes.some(rd => rd.id === d.id));
    relevantDishes = [...relevantDishes, ...additionalDishes];
  }
  relevantDishes = relevantDishes.slice(0, 4);

  document.title = `${dish.name} - REAL MEAT Pure Non-Veg Restaurant`;

  root.innerHTML = `
    <!-- Standalone Product Hero Section -->
    <div class="standalone-hero-card">
      <div class="standalone-img-box">
        <img src="${dish.image}" alt="${dish.name}" />
      </div>

      <div class="standalone-details-box">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="non-veg-badge"></span>
            <span style="font-size: 0.82rem; font-weight: 800; color: var(--accent-green); text-transform: uppercase;">100% PURE REAL MEAT</span>
            ${dish.isBestseller ? '<span class="tag-badge">★ BESTSELLER</span>' : ''}
          </div>

          <h1 style="font-size: 2.2rem; font-weight: 900; color: #1e293b; margin-bottom: 12px;">${dish.name}</h1>
          <p style="font-size: 1.02rem; color: #64748b; margin-bottom: 20px; line-height: 1.6;">${dish.description}</p>

          <div style="display: flex; gap: 20px; font-size: 0.95rem; font-weight: 800; margin-bottom: 28px;">
            <span style="color: var(--primary);">★ ${dish.rating} (${dish.ratingCount}+ Verified Reviews)</span>
            <span style="color: #64748b;">⏱️ ${dish.prepTime}</span>
            <span style="color: #64748b;">🔥 ${dish.calories || '550 kcal'}</span>
          </div>
        </div>

        <div class="standalone-price-bar">
          <div>
            <div style="font-size: 0.82rem; color: #64748b; font-weight: 700;">Price Per Portion</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #1e293b;">₹${dish.price}</div>
          </div>

          <button class="palmshore-cta-btn" style="font-size: 1.05rem; padding: 14px 38px;" onclick="handleAddClick('${dish.id}')">
            🔥 Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- RICH 2-COLUMN VERIFIED CUSTOMER REVIEWS DASHBOARD -->
    <div class="reviews-section-card">
      <div class="reviews-dashboard-grid">
        
        <!-- Left Column: Rating Breakdown Dashboard -->
        <div class="rating-overview-card">
          <div class="big-score-badge">${dish.rating}</div>
          <div class="gold-stars-row">★★★★★</div>
          <div class="total-reviews-sub">Based on ${dish.ratingCount}+ Verified Diners</div>

          <div class="rating-bars-container">
            <div class="rating-bar-row">
              <span class="bar-label">5 Star</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 88%;"></div></div>
              <span class="bar-percent">88%</span>
            </div>
            <div class="rating-bar-row">
              <span class="bar-label">4 Star</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 9%;"></div></div>
              <span class="bar-percent">9%</span>
            </div>
            <div class="rating-bar-row">
              <span class="bar-label">3 Star</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 2%;"></div></div>
              <span class="bar-percent">2%</span>
            </div>
            <div class="rating-bar-row">
              <span class="bar-label">2 Star</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 1%;"></div></div>
              <span class="bar-percent">1%</span>
            </div>
            <div class="rating-bar-row">
              <span class="bar-label">1 Star</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 0%;"></div></div>
              <span class="bar-percent">0%</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Write Review & Customer Review Cards -->
        <div class="reviews-feed-container">
          
          <!-- Write Review Interactive Form Card -->
          <div class="write-review-card">
            <h4>Write a Diner Review ✍️</h4>
            <div class="interactive-star-selector" id="starSelector">
              <span onclick="setReviewRating(1)">★</span>
              <span onclick="setReviewRating(2)">★</span>
              <span onclick="setReviewRating(3)">★</span>
              <span onclick="setReviewRating(4)">★</span>
              <span onclick="setReviewRating(5)" class="active">★</span>
            </div>
            <form onsubmit="handleReviewSubmit(event, '${dish.id}')">
              <div class="form-group" style="margin-bottom: 12px;">
                <input type="text" id="reviewerName" placeholder="Your Name (e.g. John Doe)" required />
              </div>
              <div class="form-group" style="margin-bottom: 16px;">
                <textarea id="reviewerComment" placeholder="Share your juicy experience with this dish..." required rows="3"></textarea>
              </div>
              <button type="submit" class="palmshore-cta-btn" style="padding: 12px 28px; font-size: 0.92rem;">
                Submit Customer Review ➔
              </button>
            </form>
          </div>

          <!-- Customer Review Cards List -->
          <div class="review-cards-list">
            <h4 style="font-size: 1.15rem; font-weight: 900; color: #1e293b; margin-bottom: 16px;">Recent Customer Feedback (${reviews.length})</h4>
            ${reviews.map(r => `
              <div class="modern-review-card">
                <div class="review-card-top">
                  <div class="reviewer-avatar">👤</div>
                  <div>
                    <div class="reviewer-name-row">
                      <span class="r-name">${r.name}</span>
                      <span class="verified-badge">✔ Verified Diner</span>
                    </div>
                    <div class="r-date">${r.date}</div>
                  </div>
                  <div class="review-score-pill">★ ${r.rating}.0</div>
                </div>
                <p class="review-body-text">"${r.comment}"</p>
              </div>
            `).join('')}
          </div>

        </div>

      </div>
    </div>

    <!-- More Relevant Dishes Section (4-Card Grid) -->
    <div class="relevant-products-section">
      <h4 style="font-size: 1.35rem; font-weight: 900; color: #1e293b; margin-bottom: 18px;">More Relevant Dishes You May Also Like 🍗</h4>
      <div class="relevant-grid-cards">
        ${relevantDishes.map(rel => `
          <div class="relevant-card-item">
            <div class="relevant-card-img-wrap" onclick="window.location.href='product.html?id=${rel.id}'">
              <img src="${rel.image}" alt="${rel.name}" />
              ${rel.isBestseller ? '<span class="relevant-badge">★ BESTSELLER</span>' : ''}
            </div>
            <div class="relevant-card-body">
              <div class="relevant-card-title" onclick="window.location.href='product.html?id=${rel.id}'">${rel.name}</div>
              <div class="relevant-card-meta">
                <span style="color: var(--primary); font-weight: 800;">★ ${rel.rating}</span>
                <span style="font-weight: 900; color: #1e293b;">₹${rel.price}</span>
              </div>
              <button class="add-orange-pill-btn" style="font-size:0.82rem; padding:8px 14px; width:100%;" onclick="window.location.href='product.html?id=${rel.id}'">
                View Dish & Reviews ➔
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  renderCartDrawer();
  updateUserHeaderState();
}

// --- 7. ORDER CUSTOMIZATION MODAL UI ---
function openCustomizationModal(dish) {
  state.customizingDish = dish;
  state.selectedPortion = dish.portions ? dish.portions[0] : null;
  state.selectedSpice = dish.spiceLevels ? dish.spiceLevels[0] : null;

  const modal = document.getElementById('customModal');
  const body = document.getElementById('customModalBody');
  if (!modal || !body) return;

  renderCustomizationModalContent();
  modal.classList.add('active');
}

function renderCustomizationModalContent() {
  const dish = state.customizingDish;
  const body = document.getElementById('customModalBody');
  if (!dish || !body) return;

  let totalPrice = dish.price;
  if (state.selectedPortion && state.selectedPortion.priceOffset) {
    totalPrice += state.selectedPortion.priceOffset;
  }

  body.innerHTML = `
    <div class="custom-dish-card-header">
      <img src="${dish.image}" alt="${dish.name}" />
      <div class="custom-dish-header-overlay">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span class="non-veg-badge"></span>
            <span style="font-size: 0.75rem; font-weight: 800; color: #ffb703; text-transform: uppercase;">100% PURE REAL MEAT</span>
          </div>
          <div class="custom-dish-title-lg">${dish.name}</div>
        </div>
        <div class="custom-dish-base-price">₹${dish.price}</div>
      </div>
    </div>

    ${dish.portions ? `
      <div class="custom-option-group">
        <div class="custom-option-title"><span>🍖</span> Choose Portion Size</div>
        <div class="custom-radio-cards-grid">
          ${dish.portions.map((p, idx) => {
            const isSelected = state.selectedPortion && state.selectedPortion.name === p.name;
            return `
              <div class="custom-radio-card ${isSelected ? 'active' : ''}" onclick="selectPortionOption(${idx})">
                <span>${p.name}</span>
                <span>${p.priceOffset ? `+₹${p.priceOffset}` : 'Base'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    ${dish.spiceLevels ? `
      <div class="custom-option-group">
        <div class="custom-option-title"><span>🌶️</span> Select Spice Level</div>
        <div class="custom-spice-pills-row">
          ${dish.spiceLevels.map((s) => {
            const isSelected = state.selectedSpice === s;
            return `
              <div class="custom-spice-pill ${isSelected ? 'active' : ''}" onclick="selectSpiceOption('${s}')">
                ${s}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <div class="custom-sticky-footer-bar">
      <div>
        <div class="custom-total-label">Item Total</div>
        <div class="custom-total-price">₹${totalPrice}</div>
      </div>
      <button class="add-orange-pill-btn" style="font-size: 1.02rem; padding: 12px 32px;" onclick="confirmCustomization()">
        🔥 Add to Cart
      </button>
    </div>
  `;
}

function selectPortionOption(index) {
  if (state.customizingDish && state.customizingDish.portions) {
    state.selectedPortion = state.customizingDish.portions[index];
    renderCustomizationModalContent();
  }
}

function selectSpiceOption(spiceName) {
  state.selectedSpice = spiceName;
  renderCustomizationModalContent();
}

function closeCustomizationModal() {
  document.getElementById('customModal')?.classList.remove('active');
}

function confirmCustomization() {
  if (!state.customizingDish) return;
  const options = {
    portion: state.selectedPortion,
    spice: state.selectedSpice
  };
  addToCart(state.customizingDish, 1, options);
  closeCustomizationModal();
}

// --- 8. REVIEWS SUBMISSION ---
function setReviewRating(score) {
  state.selectedRatingScore = score;
  const stars = document.querySelectorAll('#starSelector span');
  stars.forEach((s, idx) => {
    s.classList.toggle('active', idx < score);
  });
}

function handleReviewSubmit(e, dishId) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value;
  const comment = document.getElementById('reviewerComment').value;

  if (name && comment) {
    const newRev = {
      name,
      rating: state.selectedRatingScore,
      comment,
      date: 'Just now'
    };
    StorageManager.saveReview(dishId, newRev);
    initStandaloneProductPage();
    showToast('Thank you! Your customer review was published!');
  }
}

// --- 9. SEPARATE AUTH BUTTONS & USER PROFILE DROPDOWN MENU HANDLERS ---
function updateUserHeaderState() {
  const container = document.getElementById('headerAuthContainer');
  if (!container) return;

  const user = StorageManager.getUser();

  if (user) {
    container.innerHTML = `
      <div class="user-dropdown-container">
        <button class="header-user-btn" onclick="toggleUserDropdown(event)">
          <span>👤</span>
          <span>${user.name}</span>
          <span class="arrow-icon">▾</span>
        </button>

        <div class="user-dropdown-card" id="userDropdownCard">
          <div class="user-info-box">
            <div class="user-info-name">👤 ${user.name}</div>
            <div class="user-info-email">${user.email || 'Verified Customer'}</div>
          </div>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" onclick="openOrdersHistoryModal(); closeUserDropdown();">
            <span>📜</span> My Past Orders
          </button>
          <button class="dropdown-item" onclick="openAddressModal(); closeUserDropdown();">
            <span>📍</span> Saved Address
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout-btn" onclick="handleLogout()">
            <span>🚪</span> Logout Account
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="auth-buttons-group">
        <a href="login.html" class="header-auth-btn login-btn">
          <span>🔑</span> Login
        </a>
        <a href="register.html" class="header-auth-btn register-btn">
          <span>✨</span> Register
        </a>
      </div>
    `;
  }
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('userDropdownCard');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

function closeUserDropdown() {
  const dropdown = document.getElementById('userDropdownCard');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
}

function handleLogout() {
  closeUserDropdown();
  const user = StorageManager.getUser();
  StorageManager.clearUser();
  state.user = null;
  updateUserHeaderState();
  showToast(`Logged out ${user ? user.name : ''}. Come back soon! 👋`);
}

function checkAuthPageAutoRedirect() {
  const path = window.location.pathname;
  const isAuthPage = path.includes('login.html') || path.includes('register.html');
  const user = StorageManager.getUser();

  if (isAuthPage && user) {
    alert(`You are already logged in as ${user.name}! Redirecting to menu...`);
    window.location.href = 'index.html';
  }
}

// --- 10. CART HANDLERS ---
function handleAddClick(dishId) {
  const dish = DISHES_DATA.find(d => d.id === dishId);
  if (!dish) return;

  if (dish.customizable) {
    openCustomizationModal(dish);
  } else {
    addToCart(dish, 1);
  }
}

function addToCart(dish, qty = 1, options = null) {
  const cartKey = options ? `${dish.id}_${options.portion.name}` : dish.id;
  const existingIdx = state.cart.findIndex(i => i.cartKey === cartKey || i.id === dish.id);

  let itemPrice = dish.price;
  if (options && options.portion) {
    itemPrice += options.portion.priceOffset;
  }

  if (existingIdx > -1) {
    state.cart[existingIdx].qty += qty;
  } else {
    state.cart.push({
      cartKey,
      id: dish.id,
      name: dish.name,
      price: itemPrice,
      image: dish.image,
      qty,
      options
    });
  }

  StorageManager.saveCart(state.cart);
  renderAll();
  showToast(`Added ${dish.name} to Cart!`);
}

function updateCartQty(dishId, change) {
  const idx = state.cart.findIndex(i => i.id === dishId);
  if (idx > -1) {
    state.cart[idx].qty += change;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    StorageManager.saveCart(state.cart);
    renderAll();
  }
}

function updateCartKeyQty(cartKey, change) {
  const idx = state.cart.findIndex(i => i.cartKey === cartKey);
  if (idx > -1) {
    state.cart[idx].qty += change;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    StorageManager.saveCart(state.cart);
    renderAll();
  }
}

// --- 11. CART DRAWER & BILLING ---
function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  const countBadge = document.getElementById('headerCartCount');
  const subtotalEl = document.getElementById('billSubtotal');
  const deliveryEl = document.getElementById('billDelivery');
  const discountEl = document.getElementById('billDiscount');
  const grandTotalEl = document.getElementById('billGrandTotal');
  const checkoutBtnTotal = document.getElementById('checkoutBtnTotal');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartContentArea = document.getElementById('cartContentArea');

  const freeDeliveryMsg = document.getElementById('freeDeliveryMsg');
  const freeDeliveryProgress = document.getElementById('freeDeliveryProgress');

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.innerText = totalItems;

  if (!listEl) return;

  if (state.cart.length === 0) {
    if (cartEmptyState) cartEmptyState.style.display = 'flex';
    if (cartContentArea) cartContentArea.style.display = 'none';
    if (freeDeliveryProgress) freeDeliveryProgress.style.width = '0%';
    if (freeDeliveryMsg) freeDeliveryMsg.innerText = 'Add ₹500 for FREE Express Delivery!';
    return;
  }

  if (cartEmptyState) cartEmptyState.style.display = 'none';
  if (cartContentArea) cartContentArea.style.display = 'flex';

  listEl.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-details">
        <img src="${item.image}" class="cart-item-img" alt="${item.name}" />
        <div>
          <div class="cart-item-title">${item.name}</div>
          ${item.options ? `
            <div class="cart-item-addons">
              ${item.options.portion ? item.options.portion.name : ''} 
              ${item.options.spice ? `(${item.options.spice})` : ''}
            </div>
          ` : ''}
          <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
        </div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="updateCartKeyQty('${item.cartKey || item.id}', -1)">-</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartKeyQty('${item.cartKey || item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let deliveryFee = subtotal >= 500 ? 0 : 40;
  let discount = 0;

  if (freeDeliveryProgress && freeDeliveryMsg) {
    const pct = Math.min(100, Math.round((subtotal / 500) * 100));
    freeDeliveryProgress.style.width = `${pct}%`;
    if (subtotal >= 500) {
      freeDeliveryMsg.innerText = '🎉 Congratulations! You unlocked FREE Delivery!';
    } else {
      const remaining = 500 - subtotal;
      freeDeliveryMsg.innerText = `Add ₹${remaining} more for FREE Express Delivery!`;
    }
  }

  if (state.appliedCoupon === 'NONVEG50') {
    discount = Math.min(Math.round(subtotal * 0.5), 150);
  } else if (state.appliedCoupon === 'FREEDEL') {
    discount = deliveryFee;
  } else if (state.appliedCoupon === 'FEAST100' && subtotal >= 499) {
    discount = 100;
  }

  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal + deliveryFee + taxes + state.deliveryTip - discount);

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (deliveryEl) deliveryEl.innerText = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  if (discountEl) discountEl.innerText = `-₹${discount}`;
  if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal}`;
  if (checkoutBtnTotal) checkoutBtnTotal.innerText = `₹${grandTotal}`;
}

function applyCouponCode() {
  const input = document.getElementById('couponCodeInput');
  const tag = document.getElementById('appliedCouponTag');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'NONVEG50' || code === 'FREEDEL' || code === 'FEAST100') {
    state.appliedCoupon = code;
    showToast(`Coupon '${code}' Applied Successfully!`);
    if (tag) tag.innerHTML = `
      <div style="margin-top: 8px; font-size: 0.82rem; color: #10b981; font-weight: 800; display: flex; justify-content: space-between;">
        <span>Applied: <strong>${code}</strong></span>
        <button onclick="removeCoupon()" style="color: var(--primary); font-weight: 900;">✕</button>
      </div>
    `;
    renderCartDrawer();
  } else {
    showToast('Invalid Coupon! Try NONVEG50 or FREEDEL');
  }
}

function removeCoupon() {
  state.appliedCoupon = null;
  const tag = document.getElementById('appliedCouponTag');
  if (tag) tag.innerHTML = '';
  renderCartDrawer();
  showToast('Coupon Removed');
}

function setDeliveryTip(amount) {
  state.deliveryTip = amount;
  document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.tip) === amount);
  });
  renderCartDrawer();
}

// --- 12. CHECKOUT & TRACKER ---
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  toggleCartDrawer(false);
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const addr = state.address;
  document.getElementById('checkoutStreet').value = addr.street || '';
  document.getElementById('checkoutCity').value = addr.city || '';
  document.getElementById('checkoutLandmark').value = addr.landmark || '';

  modal.classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('active');
}

function handlePlaceOrder(e) {
  e.preventDefault();

  const street = document.getElementById('checkoutStreet').value;
  const city = document.getElementById('checkoutCity').value;
  const landmark = document.getElementById('checkoutLandmark').value;
  const phone = document.getElementById('checkoutPhone').value;
  const payMethod = document.querySelector('input[name="payMethod"]:checked')?.value || 'Cash on Delivery';

  if (!street || !city || !phone) {
    showToast('Please fill in your address & phone number');
    return;
  }

  state.address = { tag: 'Home', street, city, landmark };
  StorageManager.saveAddress(state.address);

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  let discount = 0;
  if (state.appliedCoupon === 'NONVEG50') discount = Math.min(Math.round(subtotal * 0.5), 150);
  else if (state.appliedCoupon === 'FREEDEL') discount = deliveryFee;
  else if (state.appliedCoupon === 'FEAST100' && subtotal >= 499) discount = 100;
  const grandTotal = Math.max(0, subtotal + deliveryFee + Math.round(subtotal * 0.05) + state.deliveryTip - discount);

  const orderId = 'NV-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: [...state.cart],
    grandTotal,
    payMethod,
    address: `${street}, ${city} (${landmark})`,
    statusStep: 1
  };

  StorageManager.saveOrder(newOrder);

  state.cart = [];
  state.appliedCoupon = null;
  StorageManager.saveCart([]);

  closeCheckoutModal();
  renderAll();

  openOrderTracker(newOrder);
  showToast('🎉 Order Placed Successfully!');
}

function openOrderTracker(order) {
  const modal = document.getElementById('trackerModal');
  const body = document.getElementById('trackerModalBody');
  if (!modal || !body) return;

  renderTrackerContent(order, body);
  modal.classList.add('active');

  if (order.statusStep < 4) {
    const timer = setInterval(() => {
      if (order.statusStep < 4) {
        order.statusStep += 1;
        renderTrackerContent(order, body);
        if (order.statusStep === 4) {
          clearInterval(timer);
          showToast('🔔 Order Delivered! Bon Appétit! 🍗');
        }
      }
    }, 9000);
  }
}

function renderTrackerContent(order, container) {
  const steps = [
    { title: 'Order Confirmed', desc: 'Restaurant accepted your delicious non-veg order' },
    { title: 'Kitchen Sizzling', desc: 'Chef is grilling kebabs & dum cooking biryani' },
    { title: 'Out for Delivery', desc: 'Delivery Partner #Ramesh is en route to your location' },
    { title: 'Order Delivered', desc: 'Enjoy your hot & juicy non-veg feast!' }
  ];

  container.innerHTML = `
    <div class="tracking-header">
      <h3 style="font-size: 1.3rem;">Live Order Progress 🚴</h3>
      <div class="order-id" style="color: var(--primary); font-weight: 800; margin-top: 4px;">Order ID: #${order.orderId} • Total ₹${order.grandTotal}</div>
      <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 4px;">Delivering to: ${order.address}</p>
    </div>

    <div class="stepper" style="margin-top: 20px;">
      ${steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = order.statusStep >= stepNum;
        return `
          <div class="step-item ${isActive ? 'active' : ''}">
            <div class="step-dot">${isActive ? '✓' : stepNum}</div>
            <div class="step-title">${step.title}</div>
            <div class="step-desc">${step.desc}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <button class="nav-btn" style="width: 100%; justify-content: center;" onclick="closeTrackerModal()">
        Close & Continue Browsing
      </button>
    </div>
  `;
}

function closeTrackerModal() {
  document.getElementById('trackerModal')?.classList.remove('active');
}

function openOrdersHistoryModal() {
  const modal = document.getElementById('ordersHistoryModal');
  const body = document.getElementById('ordersHistoryBody');
  if (!modal || !body) return;

  const orders = StorageManager.getOrders();
  if (orders.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:30px; color:#64748b;">
        <div style="font-size:2.5rem; margin-bottom:8px;">📜</div>
        <p style="font-weight:700;">No past orders found yet!</p>
      </div>
    `;
  } else {
    body.innerHTML = orders.map(o => `
      <div style="background:#faf7f4; border:1px solid #f0e6dd; border-radius:12px; padding:16px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.92rem; color:#1e293b;">
          <span>Order #${o.orderId}</span>
          <span style="color:var(--primary);">₹${o.grandTotal}</span>
        </div>
        <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">${o.timestamp} • ${o.payMethod}</div>
        <div style="font-size:0.84rem; font-weight:600; color:#334155; margin-top:8px;">
          ${o.items.map(i => `${i.name} (x${i.qty})`).join(', ')}
        </div>
      </div>
    `).join('');
  }
  modal.classList.add('active');
}

// --- 13. FAVORITES & ADDRESS ---
function toggleFavorite(dishId) {
  const idx = state.favorites.indexOf(dishId);
  if (idx > -1) {
    state.favorites.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    state.favorites.push(dishId);
    showToast('Added to Wishlist ❤️');
  }
  StorageManager.saveFavorites(state.favorites);
  renderAll();
}

function openAddressModal() {
  const modal = document.getElementById('addressModal');
  if (!modal) return;
  const addr = state.address;
  document.getElementById('inputStreet').value = addr.street || '';
  document.getElementById('inputCity').value = addr.city || '';
  document.getElementById('inputLandmark').value = addr.landmark || '';
  modal.classList.add('active');
}

function saveAddressFromModal(e) {
  e.preventDefault();
  const street = document.getElementById('inputStreet').value;
  const city = document.getElementById('inputCity').value;
  const landmark = document.getElementById('inputLandmark').value;

  if (street && city) {
    state.address = { tag: 'Home', street, city, landmark };
    StorageManager.saveAddress(state.address);
    document.getElementById('headerLocText').innerText = `${street}, ${city}`;
    document.getElementById('addressModal')?.classList.remove('active');
    showToast('Delivery Address Updated!');
  }
}

// --- 14. TOAST & GENERAL INITIALIZATION ---
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🍗</span> <div>${msg}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleCartDrawer(open) {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (open) {
    overlay?.classList.add('active');
    drawer?.classList.add('active');
  } else {
    overlay?.classList.remove('active');
    drawer?.classList.remove('active');
  }
}

function renderAll() {
  renderMenuGrid();
  renderCartDrawer();
  updateUserHeaderState();
  const addr = state.address;
  const locText = document.getElementById('headerLocText');
  if (locText && addr.street) {
    locText.innerText = `${addr.street}, ${addr.city}`;
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-dropdown-container')) {
    closeUserDropdown();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  checkAuthPageAutoRedirect();
  initCarousel();
  renderAll();

  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.activeCategory = card.dataset.cat;
      renderMenuGrid();
    });
  });

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.dataset.filter;
      renderMenuGrid();
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  sortSelect?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderMenuGrid();
  });

  document.getElementById('headerCartBtn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('closeCartDrawerBtn')?.addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cartOverlay')?.addEventListener('click', () => toggleCartDrawer(false));
});
