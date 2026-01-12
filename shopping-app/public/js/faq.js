const container = document.getElementById('faqContainer');

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
    // 一次只开一个（可选）
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

async function fetchFaqs() {
  const res = await fetch('/api/faqs');
  if (!res.ok) throw new Error('Failed to load FAQs');
  const json = await res.json();
  return json.data || [];
}

async function init() {
  container.innerHTML = '';

  try {
    const faqs = await fetchFaqs();

    if (!faqs.length) {
      container.innerHTML = '<p style="padding:10px;color:#6b7280;">No FAQs found.</p>';
      return;
    }

    faqs.forEach((f) => container.appendChild(createFaqItem(f)));
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p style="padding:10px;color:#ef4444;">Failed to load FAQs. Please try again later.</p>';
  }
}

init();
