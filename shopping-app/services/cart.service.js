const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

// ---------- helpers ----------
function moneyRound(n) {
  return Math.round(Number(n || 0) * 100) / 100;
}

function ensureObjectIdString(id) {
  if (!id || typeof id !== "string") return null;
  return id;
}

function makeCartId(userObjectId) {
  // deterministic, no extra deps
  return `cart_${String(userObjectId)}`;
}

async function findProduct(productId) {
  const id = Number(productId);
  if (!Number.isFinite(id)) return null;
  return Product.findOne({ product_id: id }).lean();
}

function getStock(product) {
  if (!product) return 0;
  if (typeof product.stock === "number") return product.stock;
  return Infinity;
}

/**
 * Find user's active cart. If user has no cart_id OR cart not found, create one and write back user.cart_id.
 * Return Cart mongoose document (not lean) so we can modify + save.
 */
async function getOrCreateCartBySessionUserId(sessionUserId) {
  const uid = ensureObjectIdString(sessionUserId);
  if (!uid) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const user = await User.findById(uid);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  // Try by user.cart_id (team design)
  if (user.cart_id) {
    const existing = await Cart.findOne({
      cart_id: user.cart_id,
      status: "active",
    });
    if (existing) return existing;
  }

  // Create new cart
  const cartId = user.cart_id || makeCartId(user._id);

  const created = await Cart.create({
    cart_id: cartId,
    user_id: user._id, // keep consistent with cart.model user_id type
    items: [],
    status: "active",
  });

  // write back cart_id to user
  user.cart_id = cartId;
  await user.save();

  return created;
}

/**
 * Convert cart document (product_id + quantity) to frontend view:
 * { items: [{productId,name,price,image,categoryId,quantity}], totalPrice }
 */
async function toCartView(cartDoc) {
  const rawItems = Array.isArray(cartDoc.items) ? cartDoc.items : [];
  const ids = rawItems
    .map((it) => Number(it.product_id))
    .filter((n) => Number.isFinite(n));

  if (ids.length === 0) {
    return { items: [], totalPrice: 0 };
  }

  const products = await Product.find({ product_id: { $in: ids } }).lean();
  const map = new Map(products.map((p) => [Number(p.product_id), p]));

  const items = [];
  for (const it of rawItems) {
    const pid = Number(it.product_id);
    const qty = Number(it.quantity);

    const p = map.get(pid);
    if (!p) continue;

    const priceNumber = Number(p.price?.toString?.() ?? p.price);

    items.push({
      productId: pid,
      name: p.name,
      price: priceNumber,
      image: p.image,
      categoryId: p.categoryId,
      quantity: qty,
    });
  }

  const totalPrice = moneyRound(
    items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  );

  return { items, totalPrice };
}

// ---------- public APIs ----------

async function getCart(sessionUserId) {
  const cartDoc = await getOrCreateCartBySessionUserId(sessionUserId);
  return toCartView(cartDoc);
}

async function clearCart(sessionUserId) {
  const cartDoc = await getOrCreateCartBySessionUserId(sessionUserId);
  cartDoc.items = [];
  await cartDoc.save();
  return toCartView(cartDoc);
}

async function addItem(sessionUserId, productId, qty = 1) {
  const cartDoc = await getOrCreateCartBySessionUserId(sessionUserId);

  const product = await findProduct(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const addQty = Number(qty);
  if (!Number.isFinite(addQty) || addQty <= 0) {
    const err = new Error("Invalid quantity");
    err.status = 400;
    throw err;
  }

  const pid = Number(product.product_id);

  const existing = cartDoc.items.find((it) => Number(it.product_id) === pid);
  const currentQty = existing ? Number(existing.quantity) : 0;
  const desiredQty = currentQty + addQty;

  const stock = getStock(product);
  if (desiredQty > stock) {
    const err = new Error(`Not enough stock. Available: ${stock}`);
    err.status = 400;
    throw err;
  }

  if (existing) existing.quantity = desiredQty;
  else cartDoc.items.push({ product_id: pid, quantity: addQty });

  await cartDoc.save();
  return toCartView(cartDoc);
}

async function updateQuantity(sessionUserId, productId, qty) {
  const cartDoc = await getOrCreateCartBySessionUserId(sessionUserId);

  const product = await findProduct(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const newQty = Number(qty);
  if (!Number.isFinite(newQty)) {
    const err = new Error("Invalid quantity");
    err.status = 400;
    throw err;
  }

  const pid = Number(product.product_id);

  // qty <= 0 -> remove
  if (newQty <= 0) return removeItem(sessionUserId, pid);

  const stock = getStock(product);
  if (newQty > stock) {
    const err = new Error(`Not enough stock. Available: ${stock}`);
    err.status = 400;
    throw err;
  }

  const existing = cartDoc.items.find((it) => Number(it.product_id) === pid);
  if (!existing) {
    const err = new Error("Item not in cart");
    err.status = 404;
    throw err;
  }

  existing.quantity = newQty;

  await cartDoc.save();
  return toCartView(cartDoc);
}

async function removeItem(sessionUserId, productId) {
  const cartDoc = await getOrCreateCartBySessionUserId(sessionUserId);

  const pid = Number(productId);
  const before = cartDoc.items.length;

  cartDoc.items = cartDoc.items.filter((it) => Number(it.product_id) !== pid);

  if (cartDoc.items.length === before) {
    const err = new Error("Item not in cart");
    err.status = 404;
    throw err;
  }

  await cartDoc.save();
  return toCartView(cartDoc);
}

module.exports = {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
};