🧾 Inventory & Revenue Dashboard
A full-stack web application that provides real-time inventory management and revenue analysis through interactive charts and a dynamic dashboard. Built with Vue 3, Chart.js, Tailwind CSS, and Express.js.

🚀 Features
📊 Revenue Analysis with interactive bar charts (Chart.js)

📦 Inventory Management with add/update product capabilities

🗂️ Filterable Charts by product category

📆 Supports revenue comparison over time (ready for future enhancements)

🔄 Sidebar navigation with auto-collapse on small screens

🛠️ Tech Stack
Frontend:
Vue 3

Vue Router

Tailwind CSS

Chart.js

Backend:
Express.js

RESTful APIs (Node.js)

📁 Project Structure
java
Copy
Edit
project-root/
├── backend/
│   └── routes/
│       └── inventory.js
├── frontend/
│   ├── components/
│   │   ├── SidebarNavigation.vue
│   │   └── RevenueAnalysis.vue
│   └── views/
│       ├── Inventory.vue
│       └── Register.vue
├── public/
│   └── logo.png
├── package.json
└── README.md
⚙️ Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/inventory-dashboard.git
cd inventory-dashboard
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
node server.js
Ensure your backend is running on: http://localhost:3001

3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
The frontend will run on: http://localhost:5173 (or whichever port Vite assigns)

🔗 API Endpoints
Base URL: http://localhost:3001/api/inventory
GET /dashboard-data → Returns aggregated data for revenue analysis

GET / → Returns full inventory list

POST /add → Add a new product ({ name, category, stock, price })

POST /update → Update product stock ({ id, stock })

📊 Revenue Chart Behavior
Displays revenue (price × stock) for each month

Filterable by category using the dropdown

Responsive bar chart powered by Chart.js

🧭 Navigation Guide
Route	Description
/revenue	View revenue analysis with interactive chart
/inventory	Manage and view inventory items
/register	Add new products to inventory

📱 Responsive Design
Sidebar auto-collapses on mobile viewports

Fully responsive UI using Tailwind CSS

📬 Contact
For issues or collaboration inquiries, please contact [your-email@example.com].

Let me know if you'd like to include screenshots or deployment instructions (e.g., using Vercel/Render/Heroku).
