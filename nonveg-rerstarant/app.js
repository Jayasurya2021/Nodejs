/* ==========================================================================
   CARNIVORE FEAST - 100% PURE NON-VEG RESTAURANT & DELIVERY JAVASCRIPT
   ========================================================================== */

// --- 1. COMPREHENSIVE NON-VEG DISH DATABASE ---
const DISHES_DATA = [
  {
    id: 'nv-101',
    name: 'Royal Hyderabadi Mutton Biryani',
    category: 'biryani',
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    ratingCount: 1420,
    prepTime: '25-30 min',
    description: 'Aromatic long-grain basmati rice dum cooked with juicy succulent mutton pieces, saffron, herbs & authentic royal spices. Served with Mirchi Ka Salan & Raita.',
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
    price: 420,
    originalPrice: 490,
    rating: 4.8,
    ratingCount: 980,
    prepTime: '20-25 min',
    description: 'Whole tender chicken marinated in rich spicy hung curd & tandoori masala, charred to perfection in clay oven. Served with mint chutney & onion rings.',
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
    price: 260,
    originalPrice: 310,
    rating: 4.7,
    ratingCount: 750,
    prepTime: '15-20 min',
    description: 'Double grilled chicken patty loaded with crispy smoked bacon strips, melted cheddar cheese, caramelized onions & secret BBQ sauce in brioche bun.',
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
    description: 'Iconic boneless tandoori chicken simmered in rich creamy tomato butter gravy, infused with kasuri methi & fresh farm cream.',
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
    description: 'Fresh jumbo tiger prawns pan-seared in rich garlic butter sauce, red pepper flakes, lemon zest & fresh cilantro.',
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
    description: 'Slow smoked mutton ribs glazed with sticky honey bourbon BBQ sauce, paired with 6 crispy spiced fried chicken wings.',
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
    description: 'Minced chicken blended with aromatic herbs, ginger, garlic & green chillies, skewered and grilled over glowing charcoal.',
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
    description: 'Extra crunchy double-dipped fried chicken wings tossed in your choice of Peri-Peri seasoning or Hot Buffalo Dip.',
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
    description: 'Kashmiri delicacy featuring tender lamb chunks slow cooked in gravy scented with Kashmiri red chillies, fennel & dry ginger.',
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
    description: 'Shredded roasted chicken wrap with garlic mayo, spicy tahini, pickled veggies & french fries wrapped in soft pita bread.',
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
    description: 'Melt-in-mouth chicken breast cubes marinated in cashew paste, fresh cream, cardamom & cheese, gently tandoor roasted.',
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

  static getActiveOrder() { return this.get('active_order', null); }
  static setActiveOrder(order) { this.set('active_order', order); }
}

// --- 3. APPLICATION GLOBAL STATE ---
let state = {
  cart: StorageManager.getCart(),
  favorites: StorageManager.getFavorites(),
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
  selectedSpice: null
};

// --- 4. CAROUSEL BANNER LOGIC ---
function initCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const slidesContainer = document.getElementById('carouselSlides');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (!slidesContainer || slides.length === 0) return;

  // Render dots
  indicatorsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `indicator-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    indicatorsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    state.currentSlide = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  prevBtn?.addEventListener('click', () => goToSlide(state.currentSlide - 1));
  nextBtn?.addEventListener('click', () => goToSlide(state.currentSlide + 1));

  // Auto slide every 4.5 seconds
  setInterval(() => {
    goToSlide(state.currentSlide + 1);
  }, 4500);
}

// --- 5. RENDER & FILTER DISH MENU GRID ---
function filterAndSortDishes() {
  let filtered = [...DISHES_DATA];

  // Category Filter
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(d => d.category === state.activeCategory);
  }

  // Filter Pills
  if (state.activeFilter === 'bestseller') {
    filtered = filtered.filter(d => d.isBestseller);
  } else if (state.activeFilter === 'top-rated') {
    filtered = filtered.filter(d => d.rating >= 4.8);
  } else if (state.activeFilter === 'spicy') {
    filtered = filtered.filter(d => d.isSpicy);
  } else if (state.activeFilter === 'fast') {
    filtered = filtered.filter(d => d.prepTime.includes('15') || d.prepTime.includes('20'));
  }

  // Search Filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
  }

  // Sorting
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
  if (countEl) countEl.innerText = `${dishes.length} Delicious Items Available`;

  if (dishes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🥩</div>
        <h3>No non-veg dishes found!</h3>
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
        <div class="dish-img-container">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" />
          <div class="dish-overlay-badge">
            ${dish.isBestseller ? '<span class="tag-badge">🔥 BESTSELLER</span>' : ''}
            ${dish.isSpicy ? '<span class="tag-badge spicy">🌶️ SPICY</span>' : ''}
          </div>
          <button class="wishlist-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${dish.id}')" title="Add to Wishlist">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="dish-info">
          <div class="dish-meta">
            <div class="dish-title-wrap">
              <span class="non-veg-badge"></span>
              <h3 class="dish-title">${dish.name}</h3>
            </div>
          </div>

          <p class="dish-desc">${dish.description}</p>

          <div class="dish-specs">
            <span class="rating-pill">★ ${dish.rating} (${dish.ratingCount}+)</span>
            <span class="spec-item">⏱️ ${dish.prepTime}</span>
          </div>

          <div class="dish-footer">
            <div class="price-box">
              <span class="current-price">₹${dish.price}</span>
              ${dish.originalPrice ? `<span class="old-price">₹${dish.originalPrice}</span>` : ''}
            </div>

            <div class="add-btn-wrapper">
              ${inCartQty > 0 ? `
                <div class="qty-control">
                  <button class="qty-btn" onclick="updateCartQty('${dish.id}', -1)">-</button>
                  <span class="qty-num">${inCartQty}</span>
                  <button class="qty-btn" onclick="updateCartQty('${dish.id}', 1)">+</button>
                </div>
              ` : `
                <button class="add-dish-btn" onclick="handleAddClick('${dish.id}')">+ ADD</button>
              `}
              ${dish.customizable ? '<div class="customizable-text">Customizable</div>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 6. CART DRAWER & CUSTOMIZATION ENGINE ---
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

function openCustomizationModal(dish) {
  state.customizingDish = dish;
  state.selectedPortion = dish.portions ? dish.portions[0] : null;
  state.selectedSpice = dish.spiceLevels ? dish.spiceLevels[0] : null;

  const modal = document.getElementById('customModal');
  const body = document.getElementById('customModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="custom-dish-banner">
      <img src="${dish.image}" class="custom-dish-img" alt="${dish.name}" />
      <div>
        <h4 style="font-size: 1.1rem; color: #fff;">${dish.name}</h4>
        <p style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 700;">Base Price: ₹${dish.price}</p>
      </div>
    </div>

    ${dish.portions ? `
      <div class="custom-group">
        <h5 class="custom-group-title">Choose Portion Size</h5>
        ${dish.portions.map((p, i) => `
          <label class="option-label">
            <span>${p.name} ${p.priceOffset ? `(+₹${p.priceOffset})` : ''}</span>
            <input type="radio" name="portionOpt" value="${i}" ${i === 0 ? 'checked' : ''} onchange="state.selectedPortion = state.customizingDish.portions[${i}]" />
          </label>
        `).join('')}
      </div>
    ` : ''}

    ${dish.spiceLevels ? `
      <div class="custom-group">
        <h5 class="custom-group-title">Select Spice Level</h5>
        ${dish.spiceLevels.map((s, i) => `
          <label class="option-label">
            <span>${s}</span>
            <input type="radio" name="spiceOpt" value="${i}" ${i === 0 ? 'checked' : ''} onchange="state.selectedSpice = state.customizingDish.spiceLevels[${i}]" />
          </label>
        `).join('')}
      </div>
    ` : ''}

    <button class="hero-cta-btn" style="width: 100%; justify-content: center; margin-top: 10px;" onclick="confirmCustomization()">
      Add Item to Cart
    </button>
  `;

  modal.classList.add('active');
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

// --- 7. CART DRAWER & BILL CALCULATIONS ---
function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  const countBadge = document.getElementById('headerCartCount');
  const drawerCount = document.getElementById('drawerCartCount');
  const subtotalEl = document.getElementById('billSubtotal');
  const deliveryEl = document.getElementById('billDelivery');
  const discountEl = document.getElementById('billDiscount');
  const grandTotalEl = document.getElementById('billGrandTotal');
  const checkoutBtnTotal = document.getElementById('checkoutBtnTotal');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartContentArea = document.getElementById('cartContentArea');

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.innerText = totalItems;
  if (drawerCount) drawerCount.innerText = `${totalItems} Items`;

  if (!listEl) return;

  if (state.cart.length === 0) {
    if (cartEmptyState) cartEmptyState.style.display = 'flex';
    if (cartContentArea) cartContentArea.style.display = 'none';
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

  // Calculations
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let deliveryFee = subtotal > 500 ? 0 : 40;
  let discount = 0;

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
    if (tag) tag.innerHTML = `<span>Applied: <strong>${code}</strong></span> <button onclick="removeCoupon()">✕</button>`;
    renderCartDrawer();
  } else {
    showToast('Invalid Coupon Code! Try NONVEG50 or FREEDEL');
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

// --- 8. CHECKOUT & SIMULATED LIVE TRACKING ---
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  toggleCartDrawer(false);
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  // Fill default address
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

  // Update stored address
  state.address = { tag: 'Home', street, city, landmark };
  StorageManager.saveAddress(state.address);

  // Compute total
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
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
    statusStep: 1 // 1: Confirmed, 2: Kitchen, 3: Out for delivery, 4: Delivered
  };

  StorageManager.saveOrder(newOrder);
  StorageManager.setActiveOrder(newOrder);

  // Clear cart
  state.cart = [];
  state.appliedCoupon = null;
  StorageManager.saveCart([]);

  closeCheckoutModal();
  renderAll();

  // Open live tracker
  openOrderTracker(newOrder);
  showToast('🎉 Order Placed Successfully!');
}

// Order Status Stepper Animation
function openOrderTracker(order) {
  const modal = document.getElementById('trackerModal');
  const body = document.getElementById('trackerModalBody');
  if (!modal || !body) return;

  renderTrackerContent(order, body);
  modal.classList.add('active');

  // Simulate status progression over time
  if (order.statusStep < 4) {
    const timer = setInterval(() => {
      if (order.statusStep < 4) {
        order.statusStep += 1;
        StorageManager.setActiveOrder(order);
        renderTrackerContent(order, body);
        if (order.statusStep === 4) {
          clearInterval(timer);
          showToast('🔔 Order Delivered! Bon Appétit! 🍗');
        }
      }
    }, 9000); // Advances step every 9 sec
  }
}

function renderTrackerContent(order, container) {
  const steps = [
    { title: 'Order Confirmed', desc: 'Restaurant accepted your delicious non-veg order' },
    { title: 'Kitchen Sizzling', desc: 'Chef is grilling kebabs & dum cooking biryani' },
    { title: 'Out for Delivery', desc: 'Delivery Hero #Ramesh is en route to your location' },
    { title: 'Order Delivered', desc: 'Enjoy your hot & juicy non-veg feast!' }
  ];

  container.innerHTML = `
    <div class="tracking-header">
      <h3>Live Order Tracking</h3>
      <div class="order-id">Order ID: #${order.orderId} • Total ₹${order.grandTotal}</div>
      <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">Delivering to: ${order.address}</p>
    </div>

    <div class="stepper">
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

// --- 9. USER FAVORITES & ORDERS HISTORY ---
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

function openOrdersHistoryModal() {
  const modal = document.getElementById('ordersHistoryModal');
  const body = document.getElementById('ordersHistoryBody');
  if (!modal || !body) return;

  const orders = StorageManager.getOrders();
  if (orders.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 0;">
        <div style="font-size: 2.5rem;">📜</div>
        <p>No past orders found.</p>
      </div>
    `;
  } else {
    body.innerHTML = orders.map(o => `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 6px;">
          <span>Order #${o.orderId}</span>
          <span style="color: var(--accent-gold);">₹${o.grandTotal}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
          ${o.timestamp} • ${o.items.length} Items (${o.payMethod})
        </div>
        <div style="font-size: 0.82rem; color: var(--text-primary); margin-bottom: 10px;">
          ${o.items.map(i => `${i.name} (${i.qty})`).join(', ')}
        </div>
        <button class="add-dish-btn" style="width: 100%; font-size: 0.8rem; padding: 6px;" onclick="reorderItems('${o.orderId}')">
          🔁 Re-Order This Feast
        </button>
      </div>
    `).join('');
  }

  modal.classList.add('active');
}

function reorderItems(orderId) {
  const orders = StorageManager.getOrders();
  const target = orders.find(o => o.orderId === orderId);
  if (!target) return;

  target.items.forEach(i => {
    const dish = DISHES_DATA.find(d => d.id === i.id);
    if (dish) addToCart(dish, i.qty, i.options);
  });

  document.getElementById('ordersHistoryModal')?.classList.remove('active');
  toggleCartDrawer(true);
  showToast('Items re-added to your cart!');
}

// Address modal handler
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

// --- 10. TOAST SYSTEM & UTILS ---
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

// --- 11. INITIALIZATION & EVENT BINDINGS ---
function renderAll() {
  renderMenuGrid();
  renderCartDrawer();
  const addr = state.address;
  const locText = document.getElementById('headerLocText');
  if (locText && addr.street) {
    locText.innerText = `${addr.street}, ${addr.city}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  renderAll();

  // Search Listener
  const searchInput = document.getElementById('headerSearchInput');
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderMenuGrid();
  });

  // Category Filter clicks
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.activeCategory = card.dataset.cat;
      renderMenuGrid();
    });
  });

  // Quick Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.dataset.filter;
      renderMenuGrid();
    });
  });

  // Sort Selector
  const sortSelect = document.getElementById('sortSelect');
  sortSelect?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderMenuGrid();
  });

  // Cart drawer triggers
  document.getElementById('headerCartBtn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('closeCartDrawerBtn')?.addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cartOverlay')?.addEventListener('click', () => toggleCartDrawer(false));
});
