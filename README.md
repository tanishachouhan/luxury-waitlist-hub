# 🏢 EstateCRM - Real Estate Lead Management System

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-Full%20Stack-blue)

## 📖 Overview

**EstateCRM** is a modern, full-stack Customer Relationship Management (CRM) tool designed specifically for real estate professionals. It solves the problem of "messy spreadsheets" by providing a unified platform to capture, track, and manage high-value property leads.

The application features a dual-interface architecture: a **Public Landing Page** for lead capture and a secure **Admin Dashboard** for data visualization and management.

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Admin Login:** Powered by **Supabase Auth** (Email/Password).
* **Password Recovery:** Full "Forgot Password" flow with email triggers.
* **Protected Routes:** Middleware ensures only authenticated users can access the dashboard.

### 📊 Interactive Dashboard
* **Data Visualization:** Dynamic growth charts using **Recharts** to track lead velocity.
* **Smart Analytics:** Real-time calculation of key metrics (Total Leads, Conversion Rates, Top Neighborhoods).
* **Dual-View Interface:** Separated "Overview" (Stats) and "Leads" (Data Table) views for better UX.

### 🚀 Lead Capture Engine
* **Conditional Logic:** Smart forms that reveal custom input fields (e.g., "Other" location) only when needed.
* **Shareable Links:** Built-in "Share Studio" that generates and copies dynamic public links for social media.
* **Mobile Responsive:** Fully optimized layout that adapts from Desktop to Tablet and Mobile.

### 🛠 Technical Highlights
* **Database:** PostgreSQL (via Supabase) with Row Level Security (RLS).
* **State Management:** TanStack Query for efficient data fetching and caching.
* **UI/UX:** Built with **Tailwind CSS** and **Shadcn UI** for a polished, accessible aesthetic.
* **Export:** CSV Export functionality for data portability.

## 💻 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Backend** | Supabase (PostgreSQL, Auth, Edge Functions) |
| **State** | TanStack Query (React Query) |
| **Charts** | Recharts |
| **Deployment** | Lovable / Netlify |

## 📸 Screenshots

### The Command Center (Dashboard)
*(Add your dashboard screenshot here)*

### Public Lead Capture
*(Add your landing page screenshot here)*

## 🚀 Getting Started locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/estate-crm.git](https://github.com/your-username/estate-crm.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

---
*Built by Tanisha Chouhan as a Full Stack Portfolio Project.*
