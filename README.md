# GoPick – Application Usage Guide(Finalised by Kexin Cheng)

## 1. Environment Setup (Optional AI Mode)

GoPick supports two running modes for the AI Shopping Assistant:

### Option A: AI-enabled mode (with OpenAI API Key)
If you have an OpenAI API key, you can enable the AI-powered shopping assistant.

- The OpenAI API key should be entered via the terminal or environment variables.
- To obtain an API key for this project, please email:
  kexin cheng

Once the API key is provided, the AI Shopping Assistant page will use AI-generated recommendations.

### Option B: Local fallback mode (no OpenAI API Key)
If no OpenAI API key is provided:
- The system will automatically fall back to a local data-driven recommendation mode.
- All core functionalities remain usable.
- This mode is suitable for local testing and tutor demonstrations.

---

## 2. Start the Application

From the `shopping-app` directory, run:

npm run seeddb

npm start

Then open your browser and access:

http://localhost:5000

---

## 3. User Features

### 1. Login & Signup
- Users can register a new account or log in with an existing account.
- Test user account:
  Email: user@example.com
  Password: 1

### 2. Product Detail
- Users can browse products and view detailed product information.

### 3. Add to Cart
- Products can be added to the shopping cart.
- Cart contents can be reviewed and updated.

### 4. Checkout
- Users can proceed to checkout.
- The system generates a simulated order (no real payment required).

### 5. Manage Account Information
- Logged-in users can view and manage their account information.

### 6. FAQ Page – Search Questions
- Users can browse FAQs.
- Keyword-based search is supported to quickly locate relevant questions.

### 7. FAQ Page – Submit Feedback
- If users cannot find an answer, they can submit feedback via the FAQ page.
- Feedback is stored in the database for admin review.

### 8. AI Shopping Assistant
- Users can access the AI Shopping Assistant page.
- Supports both AI-enabled mode (with OpenAI API key) and local fallback mode.

---

## 4. Admin Features

### 9. Admin Login
- Admin users can log in using the following test account:
  Email: admin@example.com
  Password: 1

### 10. Admin Management Panel
After logging in as an admin, the admin panel allows:
- Managing user accounts
- Viewing and managing user feedback
- Updating feedback status (e.g., pending, resolved)
- Deleting feedback entries if required

---

## 5. Notes for Demonstration and Testing

- No external services are strictly required to run the project.
- AI functionality is optional and safely falls back to local mode if no API key is provided.
- All major user and admin workflows can be demonstrated locally using `npm start`.


# Application architecture (Designed by Thac Nguyen)
```
└── 📁shopping-app						#Application folder
    └── 📁config						#Contain database configurations and seed data
    └── 📁controllers					#Controllers to handle action with database or UI
    └── 📁middleware					#Contain function to perform authentication and authorization
        ├── adminAuth.js
        ├── auth.js
    └── 📁models						#This folder store all schemas of entities in the system
    └── 📁public						#Public folder can be access through a static route
        └── 📁css						#All CSS style sheets
        └── 📁icons						#All icons
        └── 📁images					#All images
        └── 📁js						#All Javascript files
    └── 📁routes						#Folder contain all routes
        └── 📁api						#Folder contain all APIs route
            └── 📁auth					#Folder contain authentication route
                ├── auth.api.js
            ├── account.api.js			#Other APIs 
            ├── admin.api.js
            ├── cart.api.js
            ├── checkout.api.js
            ├── faq.api.js
            ├── index.js				#This file direct APIs to coressponding routes
            ├── product.api.js
            ├── resource.api.js
        ├── index.js					#This file divided route into 2 main stream: Pages and APIs
        ├── pages.routes.js				#This file contain all page routes
    └── 📁services						#Contain function that directly perform query to database
    └── 📁test							#Testing script
    └── 📁utils							#Any other utilities
    └── 📁views							#Main UI folder
        └── 📁admin						#Contain UI for admin 
            ├── dashboard.ejs
            ├── feedbacks.ejs
            ├── users.ejs
        └── 📁components				#Reusable components
            ├── carousel.ejs
            ├── footer.ejs
            ├── navBar.ejs
        ├── account-address.ejs			#Other UI pages for users
        ├── account-payment.ejs
        ├── account.ejs
        ├── admin.ejs
        ├── ai.ejs
        ├── cart.ejs
        ├── checkout.ejs
        ├── confirmation.ejs
        ├── faq.ejs
        ├── homepage.ejs
        ├── login.ejs
        ├── product-not-found.ejs
        ├── product.ejs
        ├── sign-up.ejs
    ├── .env							#Contain application environment variables
    ├── app.js							#Main server script
    ├── package-lock.json				#Two packages file for dependencies
    └── package.json
```
