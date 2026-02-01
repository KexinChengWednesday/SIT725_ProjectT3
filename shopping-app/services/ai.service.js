const mockData = require('../config/mockData');

// ---- 1) Local catalog extraction (ONLY for no-key mode) ----
// Your mockData.js exports: PRODUCTS (detailed), mockProducts (simple) :contentReference[oaicite:1]{index=1}
function extractLocalCatalog() {
  const detailed = Array.isArray(mockData.PRODUCTS) ? mockData.PRODUCTS : [];
  const simple = Array.isArray(mockData.mockProducts) ? mockData.mockProducts : [];

  // Normalize both into one shape: { id, name, price, categoryText, descriptionText }
  const detailedNorm = detailed.map(p => ({
    id: p.product_id,
    name: p.name,
    price: p.price,
    categoryText: String(p.categoryId || ''),
    descriptionText: String(p.shortDescription || p.fullDescription || ''),
  }));

  const simpleNorm = simple.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    categoryText: String(p.category || ''),
    descriptionText: '', // simple items don't have description in your file
  }));

  return [...detailedNorm, ...simpleNorm];
}

function normalizeText(x) {
  return String(x || '').toLowerCase().trim();
}

function parseBudget(budget) {
  const n = Number(budget);
  return Number.isFinite(n) ? n : null;
}

// ---- 2) Local rule-based recommendation (no-key mode) ----
function localRuleRecommend({ budget, style, keywords }, catalog) {
  const b = parseBudget(budget);
  const styleTxt = normalizeText(style);
  const kwList = normalizeText(keywords)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const scored = catalog.map(item => {
    const name = normalizeText(item.name);
    const desc = normalizeText(item.descriptionText);
    const category = normalizeText(item.categoryText);

    let score = 0;

    // Budget is a hard filter
    const price = Number(item.price);
    const priceOk = !Number.isFinite(b) || (Number.isFinite(price) && price <= b);
    if (!priceOk) return { item, score: -99999 };

    // Style match: +3
    if (styleTxt && (name.includes(styleTxt) || desc.includes(styleTxt) || category.includes(styleTxt))) {
      score += 3;
    }

    // Keyword match: each +2
    for (const kw of kwList) {
      if (kw && (name.includes(kw) || desc.includes(kw) || category.includes(kw))) {
        score += 2;
      }
    }

    // Slight preference for cheaper items within budget
    if (Number.isFinite(price)) score += Math.max(0, 2 - price / 100);

    return { item, score };
  });

  return scored
    .filter(x => x.score > -99999)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.item);
}

// ---- 3) OpenAI mode (key exists): AI can invent products freely ----
async function openAIGenerateAnyProducts({ budget, style, keywords }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.9,
      messages: [
        {
          role: 'system',
          content:
            'You are a shopping assistant. You MAY invent products freely. Output JSON only (no markdown, no extra text).',
        },
        {
          role: 'user',
          content: JSON.stringify({
            user: {
              budget: budget ? Number(budget) : null,
              style: style || '',
              keywords: keywords || '',
              currency: 'AUD',
            },
            task:
              'Generate exactly 5 product recommendations that match the user preferences. If budget is provided, keep prices within budget. Return valid JSON only.',
            output_format: {
              summary: 'string (1-2 sentences)',
              recommendations: [
                {
                  id: 'string',
                  name: 'string',
                  price: 'number',
                  reason: 'string',
                  isGenerated: true,
                },
              ],
            },
            constraints: [
              'Return ONLY the JSON object matching output_format.',
              'Prices must be realistic in AUD.',
              'Name should sound like a real retail product title.',
              'Reason should reference style/keywords/budget.',
            ],
          }),
        },
      ],
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`OpenAI API error: ${resp.status} ${txt}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content || '';

  try {
    const parsed = JSON.parse(content);

    if (Array.isArray(parsed.recommendations)) {
      parsed.recommendations = parsed.recommendations.map((r, idx) => ({
        id: r.id || `ai-${Date.now()}-${idx}`,
        name: r.name || `AI Product ${idx + 1}`,
        price: Number(r.price),
        reason: r.reason || '',
        isGenerated: true,
      }));
    } else {
      parsed.recommendations = [];
    }

    if (!parsed.summary) {
      parsed.summary = 'Here are AI-generated product ideas based on your preferences.';
    }

    return parsed;
  } catch {
    // If model output isn't JSON, still return something safe
    return {
      summary: typeof content === 'string' ? content : 'AI response received.',
      recommendations: [],
    };
  }
}

// ---- 4) Public API ----
exports.getRecommendations = async ({ budget, style, keywords }) => {
  // If key exists -> AI can invent products freely
  const ai = await openAIGenerateAnyProducts({ budget, style, keywords }).catch(() => null);
  if (ai) return ai;

  // No key -> local recommendation from mockData catalog
  const catalog = extractLocalCatalog();
  const picks = localRuleRecommend({ budget, style, keywords }, catalog);

  return {
    summary:
      'Here are some picks from our mock catalog based on your budget and keywords (local recommendation mode). Add OPENAI_API_KEY to enable AI-generated recommendations.',
    recommendations: picks.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      reason: 'Matched your budget/keywords/style (rule-based).',
      isGenerated: false,
    })),
  };
};
