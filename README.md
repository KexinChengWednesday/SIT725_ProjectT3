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
