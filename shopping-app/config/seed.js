const PRODUCTS = [
  {
    product_id: 1,
    name: "Fashion Dress",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?...",
    categoryId: "clothing_001",
    description: "Elegant summer dress, comfortable and breathable fabric perfect for casual outings",
    specifications: [
      "Material: 95% Cotton, 5% Elastane",
      "Machine washable",
      "Available in sizes S-XL",
      "Wrinkle-resistant fabric",
    ],
    stock: 50,
    rating: 4.5,
    reviews: 1234,
    isActive: true,
  },
  {
    product_id: 2,
    name: "Wireless Earbuds",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1717295248230-93ea71f48f92?...",
    categoryId: "electronics_001",
    description: "High quality sound with advanced noise cancellation and long battery life",
    specifications: [
      "Bluetooth 5.3",
      "Battery life: 6 hours (earbuds) + 18 hours (case)",
      "IPX5 water resistant",
      "Touch controls",
      "Active noise cancellation",
    ],
    stock: 35,
    rating: 4.8,
    reviews: 856,
    isActive: true,
  },
  {
    product_id: 3,
    name: "Decorative Vase",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?...",
    categoryId: "home_001",
    description: "Modern minimalist decorative vase with smooth glazed ceramic finish",
    specifications: [
      "Material: Premium ceramic",
      "Height: 25cm",
      "Waterproof interior",
      "Handcrafted design",
      "Easy to clean",
    ],
    stock: 28,
    rating: 4.3,
    reviews: 432,
    isActive: true,
  },
  {
    product_id: 4,
    name: "Sports Shoes",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?...",
    categoryId: "sports_001",
    description: "Professional sports shoes with advanced cushioning and superior grip",
    specifications: [
      "Breathable mesh upper",
      "EVA foam cushioning",
      "Anti-slip rubber outsole",
      "Lightweight design",
      "Available in multiple colors",
    ],
    stock: 60,
    rating: 4.7,
    reviews: 2156,
    isActive: true,
  },
  {
    product_id: 5,
    name: "Premium Books",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580699228119-7be487b3137f?...",
    categoryId: "books_001",
    description: "Bestseller hardcover edition with premium quality paper, worth collecting",
    specifications: [
      "Hardcover binding",
      "Premium quality paper",
      "Collector's edition",
      "Includes author commentary",
      "Dust jacket included",
    ],
    stock: 45,
    rating: 4.6,
    reviews: 678,
    isActive: true,
  },
  {
    product_id: 6,
    name: "Skincare Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?...",
    categoryId: "beauty_001",
    description: "Natural ingredients skincare set, gentle and moisturizing for all skin types",
    specifications: [
      "100% natural ingredients",
      "Dermatologist tested",
      "Paraben-free",
      "Cruelty-free",
      "Suitable for all skin types",
    ],
    stock: 40,
    rating: 4.9,
    reviews: 945,
    isActive: true,
  },
];

module.exports = PRODUCTS;

const BANNERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?...",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581495701295-13b43b0f4ae8?...",
    title: "Special Offers",
    subtitle: "Limited Time Only",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?...",
    title: "New Arrivals",
    subtitle: "Shop Now",
  },
];

const CATEGORIES = [
  { id: "all", name: "All", icon: "🛍️" },
  { id: "Clothing", name: "Clothing", icon: "👕" },
  { id: "Electronics", name: "Electronics", icon: "📱" },
  { id: "Home", name: "Home", icon: "🏠" },
  { id: "Sports", name: "Sports", icon: "⚽" },
  { id: "Books", name: "Books", icon: "📚" },
  { id: "Beauty", name: "Beauty", icon: "💄" },
];

const FAQS = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      'Browse products, click "Add to Cart", then go to your cart and click "Checkout" to complete your purchase.',
    category: "Shopping Guide",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept Alipay, WeChat Pay, UnionPay, and major credit cards. Choose the most convenient option at checkout.",
    category: "Payment",
  },
  {
    id: 3,
    question: "How long does delivery take?",
    answer:
      "Orders are typically shipped within 1-3 business days. Delivery time varies by location, usually 2-7 business days.",
    category: "Shipping",
  },
  {
    id: 4,
    question: "Can I return or exchange items?",
    answer:
      "Items can be returned or exchanged within 7 days of receipt if unworn and in original condition. See our return policy for details.",
    category: "Returns",
  },
  {
    id: 5,
    question: "How do I track my order?",
    answer:
      'Go to "My Orders" in your profile and click on your order to view detailed tracking information.',
    category: "Order Tracking",
  },
  {
    id: 6,
    question: "What if I forgot my password?",
    answer:
      'Click "Forgot Password" on the login page and enter your registered email or phone number to reset your password.',
    category: "Account",
  },
  {
    id: 7,
    question: "What if I receive a defective item?",
    answer:
      "Contact customer service within 24 hours of receiving a defective item. We will arrange a return, exchange, or repair.",
    category: "Customer Service",
  },
  {
    id: 8,
    question: "How do I contact customer service?",
    answer:
      "Contact us via live chat, call 400-XXX-XXXX, or email service@example.com. Hours: 9:00 AM - 9:00 PM.",
    category: "Support",
  },
];

const REVIEWS = {
  1: [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "2024-11-15",
      comment:
        "Absolutely love this dress! The fabric is so soft and the fit is perfect. Received so many compliments!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 2,
      userName: "Emily Chen",
      rating: 4,
      date: "2024-11-10",
      comment:
        "Great quality dress. Very comfortable and true to size. Only wish it came in more colors.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ],
  2: [
    {
      id: 1,
      userName: "Michael Brown",
      rating: 5,
      date: "2024-11-18",
      comment:
        "Best earbuds I've ever owned! The sound quality is amazing and battery lasts all day.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: 2,
      userName: "David Lee",
      rating: 5,
      date: "2024-11-12",
      comment:
        "Noise cancellation works great. Perfect for my daily commute and gym sessions.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: 3,
      userName: "Alex Kim",
      rating: 4,
      date: "2024-11-08",
      comment:
        "Very good earbuds overall. Sometimes the touch controls are a bit sensitive but that's my only complaint.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  ],
  3: [
    {
      id: 1,
      userName: "Jessica Martinez",
      rating: 5,
      date: "2024-11-14",
      comment:
        "Beautiful vase! Looks even better in person. Perfect addition to my living room.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
  ],
  4: [
    {
      id: 1,
      userName: "Chris Wilson",
      rating: 5,
      date: "2024-11-16",
      comment:
        "Super comfortable! I run 5k every morning and these shoes provide excellent support.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    },
    {
      id: 2,
      userName: "Ryan Taylor",
      rating: 5,
      date: "2024-11-11",
      comment:
        "Great shoes for the price. Very lightweight and the grip is fantastic.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    },
  ],
  5: [
    {
      id: 1,
      userName: "Jennifer White",
      rating: 5,
      date: "2024-11-13",
      comment:
        "Beautiful collector's edition. The hardcover and paper quality are outstanding.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    },
  ],
  6: [
    {
      id: 1,
      userName: "Amanda Garcia",
      rating: 5,
      date: "2024-11-17",
      comment:
        "My skin has never looked better! This set is worth every penny. All natural and gentle.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    },
    {
      id: 2,
      userName: "Lisa Anderson",
      rating: 4,
      date: "2024-11-09",
      comment:
        "Great products! Noticed improvement in my skin within 2 weeks. The serum is my favorite.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
  ],
};
