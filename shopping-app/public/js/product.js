// public/js/product.js
function getProductId() {
  const url = new URL(window.location.href);

  const raw = url.searchParams.get("product_id") ?? url.searchParams.get("id");
  if (raw) {
    const id = parseInt(raw, 10);
    if (Number.isFinite(id) && id > 0) return id;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "product" && parts[1]) {
    const id = parseInt(parts[1], 10);
    if (Number.isFinite(id) && id > 0) return id;
  }

  return 1;
}

async function loadProduct() {
  const id = getProductId();

  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error(`Product API error: ${res.status}`);

  const product = await res.json();

  const img = document.querySelector(".product__image img");
  img.src = product.image;
  img.alt = product.name;

  document.querySelector(".product__info .title").textContent = product.name;

  const priceVal = product.price?.$numberDecimal ?? product.price;
  const priceNum = Number(priceVal);
  document.querySelector(".product__info .price").textContent =
    Number.isFinite(priceNum) ? `$${priceNum.toFixed(2)}` : "";

  document.querySelector(".product__info .desc").textContent = product.fullDescription;

  const ul = document.querySelector(".detail ul");
  ul.innerHTML = "";
  (product.specifications || []).forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProduct().catch((e) => {
    console.error(e);
    document.querySelector(".product__info .title").textContent = "Failed to load product";
    document.querySelector(".product__info .desc").textContent = e.message;
  });
});
