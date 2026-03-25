# Valu$ B2B Wholesale Platform

A comprehensive B2B e-commerce platform for Valu$ Wholesale, designed to serve small retailers (mama shops) with a Buy Now Pay Later (BNPL) model and flexible tiered logistics.

## 🎯 Key Features

### Customer Portal
- **Product Discovery**: Browse 6 product categories with real-time search
- **Buy Now Pay Later (BNPL)**: Split payments into 4 equal weekly installments with no interest
- **Dual Payment Options**: Choose between cash price or BNPL pricing
- **Smart Logistics**: 
  - **Immediate Pickup**: Collect orders within 1 hour at Hub Outlets
  - **Scheduled Pickup**: Choose from 69+ heartland outlets with 24-48 hour lead time
- **Quick Order**: Bulk ordering system for fast restocking
- **Order Tracking**: Monitor order status and pickup schedules
- **Account Management**: View credit limits, payment schedules, and preferences

### Admin Portal
- **Dashboard**: Real-time overview of orders, customers, and revenue
- **Order Management**: Process and manage all customer orders
- **Pickup Scheduling**: Route orders to appropriate outlets based on pickup type
- **Inventory Oversight**: Monitor stock levels and alerts

## 🚀 Technology Stack

- **React 18** with TypeScript
- **React Router 7** for navigation
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **LocalStorage** for demo data persistence

## 📱 User Flows

### Customer Journey
1. **Login** → Enter credentials to access the B2B portal
2. **Shop** → Browse products with category filters and search
3. **Product Details** → Select payment method (Cash/BNPL) and quantity
4. **Cart** → Review items and adjust quantities
5. **Checkout** → Choose pickup type and location
6. **Order Tracking** → Monitor order status and pickup details

### Admin Journey
1. **Admin Login** → Secure access to operations portal
2. **Dashboard** → Overview of business metrics
3. **Order Management** → Process orders (Confirm → Ready → Complete)
4. **Pickup Scheduling** → Route scheduled orders to heartland outlets

## 🏪 Pickup System

### Immediate Pickup (Hub Outlets)
- Ready within 1 hour
- Available at 2 central hub locations
- Best for urgent restocking needs

### Scheduled Pickup (Heartland Outlets)
- 24-48 hour lead time
- Choose from 69+ neighborhood outlets
- Orders routed via daily replenishment trucks
- Customers select preferred pickup date

## 💳 BNPL Payment Model

- **No upfront capital required**: Pay 25% today, rest over 3 weeks
- **No interest or hidden fees**: Transparent pricing
- **Credit limit tracking**: Monitor available credit in real-time
- **Automatic payment schedule**: Weekly installments

### Payment Example:
- Product Cash Price: $22.50
- BNPL Price: $23.63 (total)
- Payment Schedule:
  - Today: $5.91
  - Week 2: $5.91
  - Week 3: $5.91
  - Week 4: $5.91

## 🎨 Design System

The platform uses the Figma design provided, featuring:
- Primary Color: Orange (#FF6900)
- Secondary Color: Blue (#155DFC)
- Professional sidebar navigation
- Product cards with savings indicators
- Clear status badges and indicators

## 📊 Demo Credentials

### Customer Portal
- Email: `demo@mamashop.com`
- Password: `demo123`

### Admin Portal
- Username: `admin`
- Password: `admin123`

## 🗂️ Project Structure

```
/src
  /app
    /components       # Reusable UI components
    /data            # Mock data (products, outlets)
    /layouts         # CustomerLayout, AdminLayout
    /pages           # All page components
      /admin         # Admin-specific pages
    /types           # TypeScript interfaces
    routes.ts        # React Router configuration
    App.tsx          # Main app component
  /imports           # Figma imported assets
  /styles            # CSS files
```

## 🔑 Key Components

### Customer Pages
- `Login.tsx` - Customer authentication
- `Shop.tsx` - Product catalog with filtering
- `ProductDetails.tsx` - Product page with BNPL calculator
- `Cart.tsx` - Shopping cart management
- `Checkout.tsx` - Pickup selection and order placement
- `QuickOrder.tsx` - Bulk ordering interface
- `Account.tsx` - Customer profile and credit info
- `OrderTracking.tsx` - Order status monitoring

### Admin Pages
- `AdminLogin.tsx` - Admin authentication
- `AdminDashboard.tsx` - Business overview
- `OrderManagement.tsx` - Order processing
- `PickupScheduling.tsx` - Logistics routing

## 🔄 Order Lifecycle

1. **Pending** - Order placed by customer
2. **Confirmed** - Admin confirms order
3. **Ready** - Order ready for pickup
4. **Completed** - Customer collected order

## 📦 Logistics Flow

### Immediate Pickup Orders
Customer → Hub Outlet (1 hour)

### Scheduled Pickup Orders
Customer → Central Hub → Daily Replenishment Truck → Heartland Outlet (24-48h)

## 🛠️ Future Enhancements

- Supabase backend integration for real data
- Real-time inventory updates
- SMS/Email notifications for order status
- Advanced routing optimization
- Payment gateway integration
- Customer loyalty program
- Multi-language support
- Mobile app version

## 📄 License

Proprietary - Valu$ Wholesale Platform

---

Built with ❤️ for Valu$ Wholesale
