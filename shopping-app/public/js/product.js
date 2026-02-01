function getProductId() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const raw = parts[0] === "product" ? parts[1] : null;

  const id = parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

async function loadProduct() {
  const id = getProductId();
  if (!id) throw new Error("Invalid URL. Use /product/:id");

  const res = await fetch(`/api/product/${id}`);
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

  return id;
}

async function loadReviews(productId) {
  const res = await fetch(`/api/product/${productId}/reviews`);
  if (!res.ok) throw new Error(`Reviews API error: ${res.status}`);

  const reviews = await res.json();

  const list = document.querySelector(".reviews__list");
  const empty = document.querySelector(".reviews__empty");
  if (!list) return;

  list.innerHTML = "";

  if (!reviews || reviews.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

reviews.forEach((r) => {
  const li = document.createElement("li");
  li.className = "reviews__item";

  const header = document.createElement("div");
  header.className = "reviews__header";

  const user = document.createElement("div");
  user.className = "reviews__user";
  user.textContent = r.user_id ?? "anonymous";

  const ratingWrap = document.createElement("div");
  ratingWrap.className = "reviews__rating";

  const ratingNum = Math.max(0, Math.min(5, Number(r.rating ?? 0)));
  const stars = "★".repeat(Math.round(ratingNum)) + "☆".repeat(5 - Math.round(ratingNum));

  ratingWrap.textContent = `${stars} ${ratingNum.toFixed(0)}/5`;

  header.appendChild(user);
  header.appendChild(ratingWrap);

  const comment = document.createElement("div");
  comment.className = "reviews__comment";
  comment.textContent = r.comment ?? "";

  li.appendChild(header);
  li.appendChild(comment);
  list.appendChild(li);
});
}

async function apiAddToCart(productId, quantity) {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function bindAddToCart(productId) {
  const btn = document.querySelector(".actions .btn");
  const qtyInput = document.querySelector(".actions input[type='number']");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const quantity = Number(qtyInput?.value || 1);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert("Invalid quantity");
      return;
    }

    try {
      const cart = await apiAddToCart(productId, quantity);
      showCartModal();
    } catch (e) {
      alert(e.message); 
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProduct()
    .then((id) => {
      bindAddToCart(id);     
      return loadReviews(id);
    })
    .catch((e) => {
      console.error(e);
      document.querySelector(".product__info .title").textContent = "Failed to load product";
      document.querySelector(".product__info .desc").textContent = e.message;
    });
});
