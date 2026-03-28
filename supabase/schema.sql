DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.outlet_locations CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;

-- Products table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  mock_id text UNIQUE NOT NULL, -- Used to map the mockData 'id' string to UUID easily
  name text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  cash_price numeric(10, 2) NOT NULL,
  bnpl_price numeric(10, 2) NOT NULL,
  retail_price numeric(10, 2) NOT NULL,
  savings numeric(10, 2) NOT NULL,
  savings_percent integer NOT NULL,
  unit text NOT NULL,
  stock integer NOT NULL,
  description text
);

-- Outlet locations table
CREATE TABLE public.outlet_locations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  mock_id text UNIQUE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  type text NOT NULL,
  availability text NOT NULL,
  lead_time text
);

-- Customers table
CREATE TABLE public.customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id), -- If using Supabase Auth
  shop_name text NOT NULL,
  uen text,
  address text,
  contact_person text NOT NULL,
  email text NOT NULL,
  password text NOT NULL, -- Added to support login (Note: Plain text for simplicity per user flow)
  phone text NOT NULL,
  credit_limit numeric(10, 2) NOT NULL DEFAULT 0,
  used_credit numeric(10, 2) NOT NULL DEFAULT 0,
  membership_tier text NOT NULL DEFAULT 'standard'
);

-- Admins table
CREATE TABLE public.admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'admin'
);

-- Orders table
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid REFERENCES public.customers(id),
  customer_name text NOT NULL,
  shop_name text NOT NULL,
  total_amount numeric(10, 2) NOT NULL,
  payment_method text NOT NULL,
  bnpl_installments integer,
  pickup_type text NOT NULL,
  pickup_location text NOT NULL,
  pickup_date timestamp with time zone,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id),
  quantity integer NOT NULL,
  unit_price numeric(10, 2) NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outlet_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies (open for development, restrict later)
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.outlet_locations FOR SELECT USING (true);

-- Allow anonymous inserts for orders since there's no auth setup yet
CREATE POLICY "Enable insert for anonymous users" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.orders FOR SELECT USING (true);

CREATE POLICY "Enable insert for anonymous users" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.order_items FOR SELECT USING (true);

CREATE POLICY "Enable read access for anonymous users" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Enable insert for anonymous users" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for anonymous users" ON public.customers FOR UPDATE USING (true);

CREATE POLICY "Enable read access for anonymous users" ON public.admins FOR SELECT USING (true);
CREATE POLICY "Enable insert for anonymous users" ON public.admins FOR INSERT WITH CHECK (true);
