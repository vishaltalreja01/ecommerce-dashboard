# 🧾 Inventory & Revenue Dashboard

A full-stack web application that provides real-time inventory management and revenue analysis through interactive charts and a dynamic dashboard. Built with **Vue 3**, **Chart.js**, **Tailwind CSS**, and **Express.js**.

---

## 🚀 Features

- 📊 **Revenue Analysis** with interactive bar charts (Chart.js)
- 📦 **Inventory Management** with add/update product capabilities
- 🗂️ **Filterable Charts** by product category
- 📆 **Supports revenue comparison** over time (ready for future enhancements)
- 🔄 Sidebar navigation with auto-collapse on small screens

---

## 🛠️ Tech Stack

### Frontend:
- Vue 3
- Vue Router
- Tailwind CSS
- Chart.js

### Backend:
- Express.js
- RESTful APIs (Node.js)

---

## 📁 Project Structure
project-root/
├── backend/
│ └── routes/
│ └── inventory.js
├── frontend/
│ ├── components/
│ │ ├── SidebarNavigation.vue
│ │ └── RevenueAnalysis.vue
│ └── views/
│ ├── Inventory.vue
│ └── Register.vue
├── public/
│ └── logo.png
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/vishaltalreja01/ecommerce-dashboard.git
cd ecommerce-dashboard
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```
The frontend will run on: http://localhost:5173 (or whichever port Vite assigns)

### 3. Backend Setup

```bash
cd backend
npm install
node server.js
```
Ensure your backend is running on: http://localhost:3001

## 🔗 API Endpoints

**Base URL:** `http://localhost:3001/api/inventory`

- `GET /dashboard-data` → Returns aggregated data for revenue analysis
- `GET /` → Returns full inventory list
- `POST /add` → Add a new product (`{ name, category, stock, price }`)
- `POST /update` → Update product stock (`{ id, stock }`)

## 📊 Revenue Chart Behavior

- Displays revenue (`price × stock`) for each month
- Filterable by category using the dropdown
- Responsive bar chart powered by Chart.js

## 🧭 Navigation Guide

| Route        | Description                                |
|--------------|--------------------------------------------|
| `/revenue`   | View revenue analysis with interactive chart |
| `/inventory` | Manage and view inventory items             |
| `/register`  | Add new products to inventory               |

## 📱 Responsive Design

- Sidebar auto-collapses on mobile viewports  
- Fully responsive UI using Tailwind CSS  

---

## 📬 Contact

For issues or collaboration inquiries, please contact [vishaltalreja01@gmail.com].
