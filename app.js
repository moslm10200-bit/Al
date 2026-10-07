import { banner, categories, products } from "./products.js";
import { loadCart, loadLocalCart, saveCart } from "./firebase-adapter.js";

const $ = (selector) => document.querySelector(selector);
const grid = $("#product-grid");
const countNode = $("#cart-count");
const cartItems = $("#cart-items");
const drawer = $("#cart-drawer");
const backdrop = $("#drawer-backdrop");
const arabicNumber = new Intl.NumberFormat("ar-SY");
const money = (value) => `${arabicNumber.format(value)} ل.س`;
const state = { cart: loadLocalCart(), category: "الكل", query: "" };
let lastFocused = null;
let toastTimer;

$("#hero-art").style.backgroundImage = `linear-gradient(90deg, rgba(15,18,49,.86), rgba(31,22,56,.5) 48%, rgba(26,20,55,.06)), url("${banner.image}")`;
$("#hero-art").style.backgroundPosition = banner.position;
$("#hero-art").style.setProperty(
  "--banner-mobile-position",
  banner.mobilePosition || banner.position,
);

function persistCart() {
  try {
    saveCart(state.cart).catch((error) => {
      console.error("تعذر حفظ نسخة السلة في Firebase؛ ما زالت محفوظة على هذا الجهاز.", error);
      showToast("السلة محفوظة على هذا الجهاز، لكن تعذر تحديث النسخة السحابية.");
    });
  } catch {
    showToast("تعذّر حفظ السلة على هذا الجهاز.");
  }
}

function visibleProducts() {
  const query = state.query.trim().toLocaleLowerCase("ar");
  return products.filter((product) => {
    const categoryMatch = state.category === "الكل" || product.category === state.category;
    const queryMatch = !query || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase("ar").includes(query);
    return categoryMatch && queryMatch;
  });
}

function renderFilters() {
  $("#category-filters").innerHTML = categories.map((category) => `
    <button class="filter-chip${state.category === category ? " is-active" : ""}" type="button"
      data-category="${category}" aria-pressed="${state.category === category}">${category}</button>`).join("");
}

function productCard(product, index) {
  return `<article class="product-card" style="--card-index:${index}">
    <div class="product-image-wrap">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <img class="product-image" src="${product.image}" alt="${product.name} — كوب مشروب بارد" loading="lazy" decoding="async">
      <span class="product-volume">${product.unit}</span>
    </div>
    <div class="product-info">
      <div class="product-title-row"><h3>${product.name}</h3><span class="product-index">${String(index + 1).padStart(2, "0")}</span></div>
      <p class="product-description">${product.description}</p>
      <div class="product-buy-row">
        <div class="product-price"><strong>${money(product.price)}</strong><span>للكوب</span></div>
        <button class="add-button" type="button" data-add="${product.id}" aria-label="أضف ${product.name} إلى السلة">
          <span>شراء</span><span class="add-icon" aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const filtered = visibleProducts();
  $("#product-total").textContent = `${arabicNumber.format(filtered.length)} ${filtered.length === 1 ? "مشروب" : "مشروبات"}`;
  grid.setAttribute("aria-busy", "false");
  grid.innerHTML = filtered.map(productCard).join("");
  $("#empty-state").hidden = filtered.length > 0;
  grid.hidden = filtered.length === 0;
}

function cartQuantity() {
  return Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0);
}

function cartTotal() {
  return products.reduce((sum, product) => sum + product.price * (state.cart[product.id] || 0), 0);
}

function updateCart() {
  const quantity = cartQuantity();
  countNode.textContent = arabicNumber.format(quantity);
  countNode.classList.toggle("has-items", quantity > 0);
  $("#drawer-count").textContent = `(${arabicNumber.format(quantity)})`;
  const selected = products.filter((product) => state.cart[product.id] > 0);
  $("#cart-empty").hidden = selected.length > 0;
  $("#drawer-footer").hidden = selected.length === 0;

  cartItems.innerHTML = selected.map((product) => {
    const count = state.cart[product.id];
    return `<article class="cart-line">
      <img src="${product.image}" alt="" class="cart-line-image">
      <div class="cart-line-copy"><h3>${product.name}</h3><p>${money(product.price)} <span>للكوب</span></p>
        <div class="quantity-control" aria-label="الكمية">
          <button type="button" data-quantity="increase" data-id="${product.id}" aria-label="زيادة كمية ${product.name}">+</button>
          <output>${arabicNumber.format(count)}</output>
          <button type="button" data-quantity="decrease" data-id="${product.id}" aria-label="إنقاص كمية ${product.name}">−</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-remove="${product.id}" aria-label="حذف ${product.name} من السلة">حذف</button>
    </article>`;
  }).join("");

  $("#cart-total").textContent = money(cartTotal());
  const message = [
    "مرحبا، بدي اطلب من السكب:",
    ...selected.map((product) => `• ${product.name} — الكمية: ${arabicNumber.format(state.cart[product.id])}`),
    `المجموع التقريبي: ${money(cartTotal())}`,
    "يا ريت تأكدولي التوصيل والمنطقة. شكراً!"
  ].join("\n");
  $("#whatsapp-order").href = `https://wa.me/963992147669?text=${encodeURIComponent(message)}`;
  persistCart();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  state.cart[id] = (state.cart[id] || 0) + 1;
  updateCart();
  showToast(`انضاف ${product.name} لسلّتك`);
}

function openCart() {
  lastFocused = document.activeElement;
  drawer.inert = false;
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.classList.add("drawer-open");
  requestAnimationFrame(() => drawer.classList.add("is-open"));
  $("#close-drawer").focus();
}

function closeCart() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  drawer.inert = true;
  backdrop.hidden = true;
  document.body.classList.remove("drawer-open");
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

$("#category-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderFilters();
  renderProducts();
});

$("#product-search").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProducts();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    $("#product-search").focus();
  }
  if (event.key === "Escape" && !drawer.inert) closeCart();
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    delete state.cart[removeButton.dataset.remove];
    updateCart();
    return;
  }
  if (!quantityButton) return;
  const { id, quantity: action } = quantityButton.dataset;
  const next = (state.cart[id] || 0) + (action === "increase" ? 1 : -1);
  if (next <= 0) delete state.cart[id];
  else state.cart[id] = next;
  updateCart();
});

$("#cart-trigger").addEventListener("click", openCart);
$("#close-drawer").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
$("#browse-products").addEventListener("click", () => {
  closeCart();
  $("#products").scrollIntoView({ behavior: "smooth" });
});
$("#reset-filters").addEventListener("click", () => {
  state.query = "";
  state.category = "الكل";
  $("#product-search").value = "";
  renderFilters();
  renderProducts();
});

renderFilters();
renderProducts();
updateCart();
loadCart()
  .then((cart) => {
    state.cart = cart;
    updateCart();
  })
  .catch((error) => {
    console.error("تعذر تحميل السلة من Firebase.", error);
    showToast("تعذر تحميل السلة السحابية؛ ستبقى سلتك المحلية متاحة.");
  });
