# Valu$ B2B Wholesale Platform 🛒

> **Transforming Singapore's Heartland Retail with Buy-Now-Pay-Later (BNPL) and Smart Logistics.**

The Valu$ B2B Platform is a sophisticated, dual-sided e-commerce ecosystem designed to empower small retailers (mama shops) with flexible financing and tiered logistics. Built with a premium aesthetic and modern tech stack, it streamlines wholesale procurement while offering enterprise-grade management tools.

---

## ✨ Core Pillars

### 💳 Financial Empowerment (BNPL)
Access inventory without upfront capital. Our integrated **Buy-Now-Pay-Later** model allows shops to split payments into 4 interest-free weekly installments (25/25/25/25%), effectively bridging the cash flow gap for heartland businesses.

### 🚛 Tiered Logistics Engine
*   **Immediate Pickup (Hub Outlets):** Ready within 1 hour at central distribution hubs for urgent restocking.
*   **Scheduled Pickup (Heartland Outlets):** Optimized routing to 69+ neighborhood locations via daily replenishment trucks with a 24-48h lead time.

### 📈 AI-Driven Insights
The Admin portal features predictive demand forecasting and dynamic pricing governance, allowing Valu$ to anticipate spikes and manage supplier PO plans with 90%+ confidence.

---

## 🛠️ Technology Stack

This project leverages the latest frontend technologies for a responsive, high-performance experience:

*   **Framework:** [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
*   **Routing:** [React Router 7](https://reactrouter.com/) (Data APIs & File-based patterns)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Next-gen utility-first CSS)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Motion](https://motion.dev/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) (Primitives) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Visualization:** [Recharts](https://recharts.org/) for business intelligence dashboards
*   **Build Tool:** [Vite 6](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0 or higher)
*   [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/valu-b2b-platform.git
    cd valu-b2b-platform
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```
3.  **Start development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```
## 2. Running the Forecasting Service

### 1. Navigate to the folder

```bash
cd forecasting_service
```

### 2. Create a virtual environment (so your current pip installs do not get affected)

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**On Windows:**

```bash
.\venv\Scripts\activate
```

**On Mac/Linux:**

```bash
source venv/bin/activate
```

### 4. Start the service

```bash
npm start
```
---
### 5. Optional (Only if your SQL database has a password)

Install required package:

```bash
pip install cryptography
```

Then update the `DB_PASS` variable in the following files:

* `forecasting_service/app.py` (~Line 30)
* `forecasting_service/forecast.py` (~Line 27)
* `forecasting_service/init_db.py` (~Line 15)

> 💡 If a `.env` file exists in the root of `forecasting_service`, simply update:

```env
DB_PASS=your_password_here
```

instead of editing the `.py` files individually.

---

## 📱 Platform Features

### Customer Experience (B2B Portal)
-   **Smart Catalog:** Filter by category, real-time search, and margin-at-a-glance indicators.
-   **Quick Order:** Bulk restocking interface for repeat orders.
-   **BNPL Calculator:** Individual product pages show exact payment schedules for either cash or credit paths.
-   **Order Tracking:** Live status monitoring from *Pending* to *Collected*.
-   **Valu$ Prime:** Subscription tier for waived logistics fees and extra 5% bulk discounts.
-   **Auto-Pay & Credits:** Manage recurring payments and monitor store credit limits (CLP).

### Admin Operations Portal (Enterprise)
-   **BI Dashboard:** Real-time KPIs on revenue, pending registrations, and pickup volume.
-   **Order Management:** State-machine based processing (Confirm → Ready → Complete).
-   **Logistics Hub:** Dedicated views for Hub Collection vs. Heartland Routing optimization.
-   **Demand Forecasting:** AI-driven predictions for peak uplift (e.g., school holidays) and stock cover analysis.
-   **Pricing Governance:** Manage volume tiers, Prime policy registration, and credit limit risk scoring.

---

## 🗂️ Project Structure

```text
/src
  /app
    /components       # Atomic UI components (Buttons, Cards, Inputs)
    /data            # Mock database (Products, Outlets, Tiers)
    /layouts         # Shared shells (CustomerLayout, NewAdminLayout)
    /pages           # Page-level components
      /admin         # Admin analytics & operations pages
    /types           # Shared TypeScript interfaces
    /utils           # Business logic & formatting helpers
    routes.ts        # Routing configuration (v7 Router)
    App.tsx          # Main entry point
  /assets            # Static images and brand assets
  /imports           # Design system assets (Figma imports)
  /styles            # Global CSS and Tailwind directives
index.html           # HTML entry point
vite.config.ts       # Vite build configuration
package.json         # Dependency manifest
```

---

## 🔄 User Journeys

### The "Mama Shop" Flow
1.  **Discovery:** Shop for high-margin staples (Beverages, Goods, etc.).
2.  **Financing:** Choose **BNPL** at checkout to preserve cash flow.
3.  **Logistics:** Select **Heartland Pickup** at the nearest neighborhood outlet.
4.  **Collection:** Track order status and collect via QR/Confirmation code.

### The "Operator" Flow
1.  **Registration Check:** Approve new shops based on UEN and risk scores.
2.  **Order Routing:** Dispatch scheduled orders to replenishment trucks.
3.  **Analytics:** Review AI-focasted demand to adjust supplier PO plans.
4.  **Governance:** Update bulk pricing tiers for seasonal campaigns.

---

## 📊 Demo Credentials

### Customer Portal
*   **Email:** `demo@mamashop.com`
*   **Password:** `demo123`

### Admin Portal
*   **Username:** `admin`
*   **Password:** `admin123`

---

## 🛠️ Future Roadmap

-   **Backend Integration:** Connect Supabase/PostgreSQL for persistent real-time data.
-   **IoT Integration:** Real-time truck GPS tracking for better heartland routing ETA.
-   **Multi-Tenancy:** Support for diverse regional hubs beyond Singapore.
-   **Financial API:** Direct integration with Stripe/Adyen for automated installment collection.
-   **ML Model Refinement:** Real sentiment analysis on product feedback to drive procurement.

---

## 📄 License

Proprietary License - © 2026 Valu$ Wholesale. All rights reserved.

---

Built with ❤️ for Singapore's Retail Ecosystem.

