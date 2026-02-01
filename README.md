# GoPick – Individual Contributions

This repository is a fork of the GoPick team project.
It documents **my individual technical contributions** across backend development, admin management, AI integration, Dockerization, and testing.

---

## Role & Responsibilities

- Backend Developer (Node.js / Express / MongoDB)
- Feature Owner:
  - FAQ System
  - Admin Feedback Management (Advanced CRUD)
  - AI Shopping Assistance (Recommendation)
- Contributor to:
  - MVC architecture
  - Docker-based deployment
  - Testing documentation
- Active contributor in Sprint 1 & Sprint 2

---

## Implemented Features

---

### FAQ System

**Description**

Implemented a complete FAQ system allowing users to browse and search frequently asked questions.
The page is dynamically rendered using EJS and integrated with backend APIs.

**Features**
- EJS-based FAQ page rendering
- Keyword-based search / filtering (client-side)
- Backend API for FAQ data
- Supports MongoDB and local mock data fallback

**Technical Details**
- MVC architecture (routes, controllers, models)
- Frontend filtering using JavaScript
- Graceful fallback when database is unavailable

**Related Files**
- `views/faq.ejs`
- `public/js/faq.js`
- `routes/faq.routes.js`
- `controllers/faq.controller.js`
- `config/mockData.js`

---

### Admin Feedback Management (Advanced CRUD)

**Description**

Implemented admin-side feedback management to moderate user-submitted feedback.
This feature demonstrates **Advanced CRUD** beyond basic create/read operations.

**Features**
- User feedback submission (Create)
- Admin-only operations:
  - View all feedback (Read)
  - Delete feedback (Delete)
- MongoDB integration
- Clear separation between user and admin responsibilities

**Advanced CRUD Justification**
- Role-based functionality
- Admin-exclusive data operations
- Real database interaction via controllers

**API Endpoints**
- `GET /admin/feedback`
- `DELETE /admin/feedback/:id`

**Related Files**
- `routes/admin.routes.js`
- `controllers/adminFeedback.controller.js`
- `models/Feedback.model.js`

---

### AI Shopping Assistance (Product Recommendation)

**Description**

Developed an AI-powered shopping assistant that recommends products based on user input.
The system supports **two execution modes** to ensure reliability and easy demonstration.

**Modes**

1. Fallback Mode (No OpenAI API Key)
   - Activated when `OPENAI_API_KEY` is not set
   - Uses local product data for filtering and ranking

2. AI Mode (With OpenAI API Key)
   - Activated when `OPENAI_API_KEY` is available
   - Calls OpenAI API for intelligent recommendations

**Technical Highlights**
- Environment-based logic switching
- Unified API response structure
- Error handling to prevent frontend crashes

**API Endpoint**
- `POST /api/ai/recommend`

**Related Files**
- `routes/ai.routes.js`
- `controllers/ai.controller.js`
- `services/ai.service.js`
- `public/js/ai.js`
- `views/ai.ejs`

---

## Dockerization & Deployment

**Contributions**
- Backend Dockerfile (Node.js)
- Environment variable configuration via `.env`
- MongoDB container support
- Docker Compose integration

**Tools**
- Docker
- Docker Compose
- Node.js official images

---

## Testing & Documentation

**E2E Testing Scenarios**
- FAQ page rendering and keyword search
- Admin feedback retrieval and deletion
- AI Shopping Assistance:
  - Without OpenAI API Key (fallback mode)
  - With OpenAI API Key (AI-enabled mode)

**Documentation**
- E2E testing documentation
- Feature-level README descriptions
- Explanation of fallback logic and system design

---

## Git Workflow

- Feature-based branches:
  - `feature/faq-page`
  - `feature/admin-crud`
  - `feat/ai-recommend`
- Pull requests to team repository
- Merge conflict resolution
- Clear, descriptive commit messages

---

## Running the Project

```bash
cd shopping-app
npm install



