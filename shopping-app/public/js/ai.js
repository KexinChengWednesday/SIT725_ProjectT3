document.addEventListener('DOMContentLoaded', () => {
  const budgetEl = document.getElementById('ai-budget');
  const styleEl = document.getElementById('ai-style');
  const keywordsEl = document.getElementById('ai-keywords');
  const sendBtn = document.getElementById('ai-send');
  const output = document.getElementById('ai-output');

  [keywordsEl, styleEl, budgetEl].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });
});

  document.querySelectorAll('.ai-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const kw = btn.getAttribute('data-kw');
      const current = (keywordsEl.value || '').trim();
      keywordsEl.value = current ? `${current}, ${kw}` : kw;
      keywordsEl.focus();
    });
  });

  sendBtn.addEventListener('click', async () => {
    const payload = {
      budget: budgetEl.value,
      style: styleEl.value,
      keywords: keywordsEl.value,
    };

    appendBubble(
      'You',
      `Budget: ${payload.budget || '-'}, Style: ${payload.style || '-'}, Keywords: ${payload.keywords || '-'}`,
      'user'
    );

    sendBtn.disabled = true;
    sendBtn.textContent = 'Thinking...';

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Request failed');

      renderAI(json.data);
    } catch (e) {
      appendBubble('AI', `Error: ${e.message}`, 'ai');
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Ask AI';
    }
  });

  function renderAI(data) {
    if (!data) return appendBubble('AI', 'No response.', 'ai');

    const summary = data.summary || 'Here are some recommendations:';
    appendBubble('AI', summary, 'ai');

    const recs = Array.isArray(data.recommendations) ? data.recommendations : [];
    if (recs.length === 0) {
      appendBubble('AI', 'No products matched. Try different keywords or a higher budget.', 'ai');
      return;
    }

    const list = document.createElement('div');
    list.className = 'ai-rec-list';

    recs.forEach(r => {
      const card = document.createElement('div');
      card.className = 'ai-rec-card';
      card.innerHTML = `
        <div class="ai-rec-name">${escapeHtml(r.name)}</div>
        <div class="ai-rec-meta">$${escapeHtml(r.price)}</div>
        <div class="ai-rec-reason">${escapeHtml(r.reason || '')}</div>
      `;
      list.appendChild(card);
    });

    output.appendChild(list);
  }

  function appendBubble(who, text, type) {
    const div = document.createElement('div');
    div.className = `ai-msg ai-msg--${type}`;
    div.innerHTML = `<strong>${escapeHtml(who)}:</strong> ${escapeHtml(text)}`;
    output.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
});
