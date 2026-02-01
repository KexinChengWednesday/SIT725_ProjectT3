const request = require("supertest");
const { expect } = require("chai");

// Test against a running server 
const API = "http://localhost:5000";

const { PRODUCTS } = require("../config/mockData");

// Build a lookup map: product_id -> product info
const PRODUCT_MAP = Object.fromEntries(
  PRODUCTS.map((p) => [
    Number(p.product_id),
    {
      productId: Number(p.product_id),
      price: Number(p.price),
      stock: Number(p.stock),
    },
  ])
);

// ---------- helpers ----------
function round2(n) {
  return Math.round(Number(n) * 100) / 100;
}

function findItem(cart, productId) {
  return (cart.items || []).find(
    (it) => Number(it.productId) === Number(productId)
  );
}

function expectedTotal(items) {
  let sum = 0;
  for (const it of items) {
    const product = PRODUCT_MAP[Number(it.productId)];
    expect(product, `Missing product ${it.productId} in PRODUCT_MAP`).to.exist;
    sum += product.price * Number(it.quantity);
  }
  return round2(sum);
}

// ---------- API wrappers ----------
async function apiGetCart() {
  return request(API).get("/api/cart");
}

async function apiAdd(productId, quantity = 1) {
  return request(API)
    .post("/api/cart/add")
    .send({ productId, quantity })
    .set("Content-Type", "application/json");
}

async function apiUpdate(productId, quantity) {
  return request(API)
    .put("/api/cart/update")
    .send({ productId, quantity })
    .set("Content-Type", "application/json");
}

async function apiRemove(productId) {
  return request(API).delete(`/api/cart/remove/${productId}`);
}

// ---------- tests ----------
describe("Cart API – Core Functional Tests", function () {
  this.timeout(10000);

  /**
   * Best-effort cleanup:
   * The cart is in-memory, so we remove known product ids before each test
   * to avoid state leakage between tests.
   */
  beforeEach(async () => {
    for (const id of Object.keys(PRODUCT_MAP)) {
      try {
        await apiRemove(id);
      } catch (_) {
        // ignore if item not present
      }
    }
  });

  it("GET /api/cart should return an empty cart with totalPrice = 0", async () => {
    const res = await apiGetCart();

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body.items).to.be.an("array").that.has.lengthOf(0);
    expect(round2(res.body.totalPrice)).to.equal(0);
  });

  it("POST /api/cart/add should add an item with correct quantity and totalPrice", async () => {
    const { productId, price } = PRODUCT_MAP[1];

    const res = await apiAdd(productId, 2);
    expect(res.status).to.equal(200);

    const cart = res.body;
    const item = findItem(cart, productId);

    expect(item).to.exist;
    expect(Number(item.quantity)).to.equal(2);
    expect(round2(cart.totalPrice)).to.equal(round2(price * 2));
  });

  it("PUT /api/cart/update should update quantity and recalculate totalPrice correctly", async () => {
    // Add two products
    await apiAdd(1, 1);
    await apiAdd(2, 1);

    // Update quantity of product 1
    const res = await apiUpdate(1, 3);
    expect(res.status).to.equal(200);

    const cart = res.body;
    const item1 = findItem(cart, 1);
    const item2 = findItem(cart, 2);

    expect(item1).to.exist;
    expect(item2).to.exist;
    expect(Number(item1.quantity)).to.equal(3);
    expect(Number(item2.quantity)).to.equal(1);

    const total = expectedTotal([
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 1 },
    ]);

    expect(round2(cart.totalPrice)).to.equal(total);
  });

  it("DELETE /api/cart/remove/:productId should remove item and update totalPrice", async () => {
    // Add two products
    await apiAdd(1, 2);
    await apiAdd(3, 1);

    // Remove product 1
    const res = await apiRemove(1);
    expect(res.status).to.equal(200);

    const cart = res.body;

    // Product 1 removed
    expect(findItem(cart, 1)).to.not.exist;

    // Product 3 remains
    const item3 = findItem(cart, 3);
    expect(item3).to.exist;
    expect(Number(item3.quantity)).to.equal(1);

    const total = expectedTotal([{ productId: 3, quantity: 1 }]);
    expect(round2(cart.totalPrice)).to.equal(total);
  });
});
