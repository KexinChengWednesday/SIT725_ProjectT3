const container = document.getElementById('faqContainer');
const searchInput = document.getElementById('faqSearch');
let allFaqs = [];

function createFaqItem({ question, answer }) {
  const item = document.createElement('div');
  item.className = 'faq-item';

  const header = document.createElement('button');
  header.className = 'faq-header';
  header.type = 'button';

  const q = document.createElement('span');
  q.textContent = question;

  const icon = document.createElement('span');
  icon.className = 'faq-icon';
  icon.textContent = '+';

  header.appendChild(q);
  header.appendChild(icon);

  const body = document.createElement('div');
  body.className = 'faq-body';
  body.textContent = answer;

  header.addEventListener('click', () => {
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-icon').textContent = '+';
      }
    });

    const isOpen = item.classList.toggle('open');
    icon.textContent = isOpen ? '–' : '+';
  });

  item.appendChild(header);
  item.appendChild(body);
  return item;
}

function renderFaqs(list) {
  container.innerHTML = '';

  if (!list || list.length === 0) {
    container.innerHTML =
      '<p style="padding:10px;color:#6b7280;">No FAQs found.</p>';
    return;
  }

  list.forEach((f) => container.appendChild(createFaqItem(f)));
}

async function fetchFaqs() {
  const res = await fetch('/api/faq/faqs');
  if (!res.ok) throw new Error('Failed to load FAQs');
  const json = await res.json();
  return json.data || [];
}

async function init() {
  try {
    allFaqs = await fetchFaqs();
    renderFaqs(allFaqs);
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p style="padding:10px;color:#ef4444;">Failed to load FAQs. Please try again later.</p>';
  }
}


if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();

    const filtered = allFaqs.filter((f) =>
      (f.question || '').toLowerCase().includes(keyword) ||
      (f.answer || '').toLowerCase().includes(keyword)
    );

    // keyword is null, diaplay all faqs
    renderFaqs(keyword ? filtered : allFaqs);
  });
}

init();

function bindFeedbackForm() {
  const form = document.getElementById("faqFeedbackForm");
  if (!form) return;

  const status = document.getElementById("fbStatus");
  const nameEl = document.getElementById("fbName");
  const emailEl = document.getElementById("fbEmail");
  const msgEl = document.getElementById("fbMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Submitting...";

    try {
      const payload = {
        name: nameEl.value,
        email: emailEl.value,
        message: msgEl.value,
      };

      const res = await fetch("/api/faq/faq-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Submit failed");

      status.textContent = "Thanks! Your feedback has been sent ✅";
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = "Failed to submit. Please try again.";
    }
  });
}

bindFeedbackForm();
