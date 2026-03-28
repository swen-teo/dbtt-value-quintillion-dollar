import { createBrowserRouter } from "react-router";
import CustomerLayout from "./layouts/CustomerLayout";
import NewAdminLayout from "./layouts/NewAdminLayout";
import LandingHome from "./pages/LandingHome";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import ShopPage from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import QuickOrder from "./pages/QuickOrder";
import Account from "./pages/Account";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";
import Deals from "./pages/Deals";
import AutoPay from "./pages/AutoPay";
import OrderConfirmation from "./pages/OrderConfirmation";
import SubscribePrime from "./pages/SubscribePrime";

import Dashboard from "./pages/admin/Dashboard";
import OrderManagement from "./pages/admin/OrderManagement";
import PickupScheduling from "./pages/admin/PickupScheduling";
import CatalogOperations from "./pages/admin/CatalogOperations";
import PricingConfiguration from "./pages/admin/PricingConfiguration";
import AIForecasting from "./pages/admin/AIForecasting";
import LogisticsHubCollections from "./pages/admin/LogisticsHubCollections";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingHome,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: ShopPage },
      { path: "shop", Component: ShopPage },
      { path: "product/:id", Component: ProductDetails },
      { path: "quick-order", Component: QuickOrder },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "order-confirmation", Component: OrderConfirmation },
      { path: "account", Component: Account },
      { path: "my-orders", Component: MyOrders },
      { path: "orders", Component: OrderTracking },
      { path: "auto-pay", Component: AutoPay },
      { path: "deals", Component: Deals },
      { path: "subscribe-prime", Component: SubscribePrime },
    ],
  },
  {
    path: "/admin/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: NewAdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "catalog", Component: CatalogOperations },
      { path: "catalog/pricing", Component: PricingConfiguration },
      { path: "catalog/forecasting", Component: AIForecasting },
      { path: "logistics/hub-collections", Component: LogisticsHubCollections },
      { path: "logistics/heartland-routing", Component: LogisticsHubCollections },
      { path: "orders", Component: OrderManagement },
      { path: "pickup-scheduling", Component: PickupScheduling },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);