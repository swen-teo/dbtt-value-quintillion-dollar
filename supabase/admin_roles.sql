-- SQL Script to update Admin Roles
-- Objective: Split admins into 'heartland_outlet_manager' and 'warehouse_hub_manager'

-- 1. Update existing admin 'admin@valus.com' to 'warehouse_hub_manager'
-- According to the screenshot, this user currently has 'admin' role.
UPDATE public.admins 
SET role = 'warehouse_hub_manager', name = 'Warehouse Hub Manager'
WHERE email = 'admin@valus.com';

-- 2. Add a test 'heartland_outlet_manager'
-- This role can ONLY view 'Normal Shop' functionality and 'Request Restock'
INSERT INTO public.admins (email, password, name, role) 
VALUES ('outlet@valus.com', 'admin123', 'Heartland Outlet Manager', 'heartland_outlet_manager')
ON CONFLICT (email) DO UPDATE SET role = 'heartland_outlet_manager';

-- Verify the changes
-- SELECT * FROM public.admins;
