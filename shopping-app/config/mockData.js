const PRODUCTS = [
  {
    product_id: 1,
    name: "Fashion Dress",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?...",
    categoryId: "clothing_001",
    fullDescription:
      "This elegant summer dress combines style and comfort perfectly. Made from premium breathable fabric, it features a flattering silhouette that suits various body types. Perfect for casual outings, garden parties, or beach walks.",
    specifications: [
      "Material: 95% Cotton, 5% Elastane",
      "Machine washable",
      "Available in sizes S-XL",
      "Wrinkle-resistant fabric",
    ],
    stock: 50,
    rating: 4.5,
    sales: 1234,
    isActive: true,
  },
  {
    product_id: 2,
    name: "Wireless Earbuds",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1717295248230-93ea71f48f92?...",
    categoryId: "electronics_001",
    fullDescription:
      "Experience premium audio quality with our wireless earbuds. Featuring advanced noise cancellation technology and crystal-clear sound reproduction. The ergonomic design ensures a comfortable fit for extended wear.",
    specifications: [
      "Bluetooth 5.3",
      "Battery life: 6 hours (earbuds) + 18 hours (case)",
      "IPX5 water resistant",
      "Touch controls",
      "Active noise cancellation",
    ],
    stock: 35,
    rating: 4.8,
    sales: 856,
    isActive: true,
  },
  {
    product_id: 3,
    name: "Decorative Vase",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?...",
    categoryId: "home_001",
    fullDescription:
      "Add a touch of elegance to your home with this modern minimalist vase. Crafted from high-quality ceramic with a smooth glazed finish. The unique shape and neutral color palette make it versatile enough to complement any interior design style.",
    specifications: [
      "Material: Premium ceramic",
      "Height: 25cm",
      "Waterproof interior",
      "Handcrafted design",
      "Easy to clean",
    ],
    stock: 28,
    rating: 4.3,
    sales: 432,
    isActive: true,
  },
  {
    product_id: 4,
    name: "Sports Shoes",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?...",
    categoryId: "sports_001",
    fullDescription:
      "Engineered for peak performance, these professional sports shoes feature advanced cushioning technology and superior grip. The breathable mesh upper keeps your feet cool during intense workouts.",
    specifications: [
      "Breathable mesh upper",
      "EVA foam cushioning",
      "Anti-slip rubber outsole",
      "Lightweight design",
      "Available in multiple colors",
    ],
    stock: 60,
    rating: 4.7,
    sales: 2156,
    isActive: true,
  },
  {
    product_id: 5,
    name: "Premium Books",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580699228119-7be487b3137f?...",
    categoryId: "books_001",
    fullDescription:
      "A timeless collection in premium hardcover format. These bestselling books feature beautiful cover designs and high-quality paper that enhances the reading experience. Perfect for collectors and book lovers.",
    specifications: [
      "Hardcover binding",
      "Premium quality paper",
      "Collector's edition",
      "Includes author commentary",
      "Dust jacket included",
    ],
    stock: 45,
    rating: 4.6,
    sales: 678,
    isActive: true,
  },
  {
    product_id: 6,
    name: "Skincare Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?...",
    categoryId: "beauty_001",
    fullDescription:
      "Transform your skincare routine with this comprehensive set. Formulated with natural ingredients including hyaluronic acid, vitamin C, and botanical extracts. Each product is dermatologist-tested and suitable for all skin types.",
    specifications: [
      "100% natural ingredients",
      "Dermatologist tested",
      "Paraben-free",
      "Cruelty-free",
      "Suitable for all skin types",
    ],
    stock: 40,
    rating: 4.9,
    sales: 945,
    isActive: true,
  },
];

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

const PRODUCT_CATEGORIES = [
  {
    category_id: "all",
    name: "All",
    icon: "🛍️",
    description: "View all products",
  },
  {
    category_id: "clothing",
    name: "Clothing",
    icon: "👕",
    description: "Apparel and fashion items",
  },
  {
    category_id: "electronics",
    name: "Electronics",
    icon: "📱",
    description: "Electronic devices and gadgets",
  },
  {
    category_id: "home",
    name: "Home",
    icon: "🏠",
    description: "Home and living products",
  },
  {
    category_id: "sports",
    name: "Sports",
    icon: "⚽",
    description: "Sports and fitness equipment",
  },
  {
    category_id: "books",
    name: "Books",
    icon: "📚",
    description: "Books and reading materials",
  },
  {
    category_id: "beauty",
    name: "Beauty",
    icon: "💄",
    description: "Beauty and skincare products",
  },
];

const FAQ_CATEGORIES = [
  {
    category_id: "general",
    name: "General",
    description: "General questions and information about our store",
  },
  {
    category_id: "shipping",
    name: "Shipping & Delivery",
    description: "Questions about shipping, delivery, and tracking orders",
  },
  {
    category_id: "returns",
    name: "Returns & Refunds",
    description: "Information about returns, exchanges, and refund policies",
  },
  {
    category_id: "payment",
    name: "Payment & Billing",
    description: "Questions about payment methods and billing inquiries",
  },
  {
    category_id: "account",
    name: "Account & Profile",
    description: "Help with account management and profile settings",
  },
  {
    category_id: "products",
    name: "Products",
    description: "Questions about specific products and availability",
  },
  {
    category_id: "technical",
    name: "Technical Support",
    description: "Technical issues and troubleshooting assistance",
  },
  {
    category_id: "security",
    name: "Security & Privacy",
    description: "Information about data security and privacy protection",
  },
];

const FAQS = [
  {
    faq_id: 1,
    question: "How do I place an order?",
    answer:
      'Browse our product catalog and select items you wish to purchase. Click the "Add to Cart" button for each item. Once you have finished shopping, navigate to your shopping cart and review your items. Click "Proceed to Checkout" to enter your shipping and billing information. Select your preferred payment method and complete the transaction. You will receive an order confirmation email with your order number and tracking details.',
    category: "general",
  },
  {
    faq_id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept multiple payment methods for your convenience including Alipay, WeChat Pay, UnionPay, Visa, Mastercard, and American Express. You can also pay via bank transfer for orders over a certain amount. All payments are processed securely through our encrypted payment gateway. Choose the most convenient payment option at checkout. For security reasons, we do not store your full credit card information on our servers.",
    category: "payment",
  },
  {
    faq_id: 3,
    question: "How long does delivery take?",
    answer:
      "Standard delivery typically takes 2-7 business days depending on your location. Orders are processed and shipped within 1-3 business days of purchase. Express delivery options are available for an additional fee, with delivery times of 1-2 business days. International orders may take 10-21 business days. Delivery times are estimates and may vary during peak seasons or due to unforeseen circumstances. You will receive a tracking number via email once your order ships.",
    category: "shipping",
  },
  {
    faq_id: 4,
    question: "Can I return or exchange items?",
    answer:
      "Yes, we offer a 7-day return and exchange policy. Items must be unworn, unwashed, and in their original condition with all tags attached. The product packaging must be intact and undamaged. To initiate a return or exchange, log into your account, go to 'My Orders', and select the item you wish to return. Follow the return instructions and print the prepaid shipping label. Once we receive and inspect your return, we will process your refund or send your replacement item within 3-5 business days.",
    category: "returns",
  },
  {
    faq_id: 5,
    question: "How do I track my order?",
    answer:
      'You can track your order in real-time through multiple methods. Log into your account and navigate to "My Orders" section. Click on the specific order to view detailed tracking information including current location and estimated delivery date. Alternatively, you can use the tracking number sent to your email to track your package on the carrier\'s website. Most orders include a tracking link that updates automatically. For international orders, tracking may take 24-48 hours to become active in the system.',
    category: "general",
  },
  {
    faq_id: 6,
    question: "What if I forgot my password?",
    answer:
      'Click the "Forgot Password" link on the login page. Enter the email address or phone number associated with your account. You will receive a password reset link via email within a few minutes. Click the link and follow the instructions to create a new password. Make sure to use a strong password with a combination of uppercase, lowercase, numbers, and special characters. If you do not receive the reset email, check your spam folder or contact our customer support team for assistance.',
    category: "account",
  },
  {
    faq_id: 7,
    question: "What if I receive a defective item?",
    answer:
      "We stand behind the quality of our products. If you receive a defective or damaged item, contact our customer service team within 24 hours of delivery with photos of the defect. Our team will review your case and offer a replacement, repair, or full refund. We will provide a prepaid return shipping label for you to send back the defective item. Once we receive and verify the defect, we will process your replacement or refund immediately. We apologize for any inconvenience and appreciate your patience.",
    category: "returns",
  },
  {
    faq_id: 8,
    question: "How do I contact customer service?",
    answer:
      "You can reach our customer service team through multiple channels. Use our live chat feature available on the website for immediate assistance during business hours (9:00 AM - 9:00 PM). Call our customer service hotline at 400-XXX-XXXX for phone support. Email us at service@example.com for detailed inquiries. Follow us on social media for updates and support. Response times vary by channel, with live chat typically providing the fastest response. We aim to respond to all inquiries within 24 hours.",
    category: "technical",
  },
];

const REVIEWS = [
  // Product 1: Fashion Dress
  {
    review_id: 1,
    product_id: 1,
    user_id: "user_001",
    rating: 5,
    comment:
      "Absolutely love this dress! The fabric is so soft and the fit is perfect. Received so many compliments!",
  },
  {
    review_id: 2,
    product_id: 1,
    user_id: "user_002",
    rating: 4,
    comment:
      "Great quality dress. Very comfortable and true to size. Only wish it came in more colors.",
  },
  // Product 2: Wireless Earbuds
  {
    review_id: 3,
    product_id: 2,
    user_id: "user_003",
    rating: 5,
    comment:
      "Best earbuds I've ever owned! The sound quality is amazing and battery lasts all day.",
  },
  {
    review_id: 4,
    product_id: 2,
    user_id: "user_004",
    rating: 5,
    comment:
      "Noise cancellation works great. Perfect for my daily commute and gym sessions.",
  },
  {
    review_id: 5,
    product_id: 2,
    user_id: "user_005",
    rating: 4,
    comment:
      "Very good earbuds overall. Sometimes the touch controls are a bit sensitive but that's my only complaint.",
  },
  // Product 3: Decorative Vase
  {
    review_id: 6,
    product_id: 3,
    user_id: "user_006",
    rating: 5,
    comment:
      "Beautiful vase! Looks even better in person. Perfect addition to my living room.",
  },
  // Product 4: Sports Shoes
  {
    review_id: 7,
    product_id: 4,
    user_id: "user_007",
    rating: 5,
    comment:
      "Super comfortable! I run 5k every morning and these shoes provide excellent support.",
  },
  {
    review_id: 8,
    product_id: 4,
    user_id: "user_008",
    rating: 5,
    comment:
      "Great shoes for the price. Very lightweight and the grip is fantastic.",
  },
  // Product 5: Premium Books
  {
    review_id: 9,
    product_id: 5,
    user_id: "user_009",
    rating: 5,
    comment:
      "Beautiful collector's edition. The hardcover and paper quality are outstanding.",
  },
  // Product 6: Skincare Set
  {
    review_id: 10,
    product_id: 6,
    user_id: "user_010",
    rating: 5,
    comment:
      "My skin has never looked better! This set is worth every penny. All natural and gentle.",
  },
  {
    review_id: 11,
    product_id: 6,
    user_id: "user_011",
    rating: 4,
    comment:
      "Great products! Noticed improvement in my skin within 2 weeks. The serum is my favorite.",
  },
];

const USERS = [
  {
    user_id: "user_001",
    name: "Kexin",
    email: "kexin@example.com",
    password: "1",
    dob: new Date("2008-03-15"),
    phone: "5551234567",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_002",
    name: "Viet",
    email: "emily.chen@example.com",
    password: "1",
    dob: new Date("2007-07-22"),
    phone: "5552345678",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_003",
    name: "Yujiang",
    email: "michael.brown@example.com",
    password: "1",
    dob: new Date("2006-11-08"),
    phone: "5553456789",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_004",
    name: "Yori",
    email: "yori@example.com",
    password: "1",
    dob: new Date("2008-05-30"),
    phone: "5554567890",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_005",
    name: "Thac",
    email: "thac@example.com",
    password: "1",
    dob: new Date("2007-09-12"),
    phone: "5555678901",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_006",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2009-01-25"),
    phone: "5556789012",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_007",
    name: "Chris Wilson",
    email: "chris.wilson@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2006-06-18"),
    phone: "5557890123",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_008",
    name: "Ryan Taylor",
    email: "ryan.taylor@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2008-12-03"),
    phone: "5558901234",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_009",
    name: "Jennifer White",
    email: "jennifer.white@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2007-04-14"),
    phone: "5559012345",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_010",
    name: "Amanda Garcia",
    email: "amanda.garcia@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2009-08-20"),
    phone: "5550123456",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_011",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz",
    dob: new Date("2008-10-07"),
    phone: "5551112223",
    role: "user",
    status: "active",
  },
];

const ROLES = [
  {
    role_id: "user",
    name: "user",
  },
  {
    role_id: "admin",
    name: "admin",
  },
];

module.exports = {
  PRODUCTS,
  BANNERS,
  PRODUCT_CATEGORIES,
  FAQ_CATEGORIES,
  FAQS,
  REVIEWS,
  USERS,
  ROLES,
};