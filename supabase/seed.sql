-- Insert Products
INSERT INTO public.products (mock_id, name, category, image, cash_price, bnpl_price, retail_price, savings, savings_percent, unit, stock, description)
VALUES 
  ('1', 'Premium Cola (24x330ml)', 'BEVERAGES', 'https://www.brandinginasia.com/wp-content/uploads/2018/07/BTS-Coca-Cola-KPOP-Branding-in-Asia-1.jpg', 22.50, 23.63, 28.50, 5.00, 21, '24x330ml', 150, 'Premium quality cola in bulk packaging. Perfect for retail shops.'),
  ('2', 'Potato Chips Box (60x30g)', 'SNACKS', 'https://www.honestfoodtalks.com/wp-content/uploads/2022/07/bts-favorite-snacks-honey-butter-chip.jpg', 25.50, 26.78, 26.60, 1.10, 4, '60x30g', 200, 'Popular potato chips in individual packets. High-margin product.'),
  ('3', 'Instant Noodles (40 packs)', 'SNACKS', 'https://scontent-sin2-1.cdninstagram.com/v/t51.82787-15/654967801_18106495501850704_535747531038733368_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzU5MTE3NTQwMTc0ODAwNzAyNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=JmfVvVqn_jQQ7kNvwFwyv4a&_nc_oc=AdqV8PaqPD-IAKSggWzAy5VchmC24C4LAVSxhXspcD3QgkcygppzjZ0E5gcdG01_kLA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-sin2-1.cdninstagram.com&_nc_gid=Tum_xrEiwh-8wTXIJfIFiA&_nc_ss=7a32e&oh=00_Afx8tBS03AE5CbPSI_D-qjJ-tYRKBLz0oNspVFH15G4dCg&oe=69C6F287', 22.00, 23.10, 25.00, 3.00, 12, '40 packs', 300, 'Fast-moving instant noodles. Multiple flavors available.'),
  ('4', 'Energy Drink (24x250ml)', 'BEVERAGES', 'https://pbs.twimg.com/media/EdWt9d8XkAEtcB9.jpg:orig', 28.00, 29.40, 32.00, 4.00, 13, '24x250ml', 100, 'Popular energy drink brand. High demand product.'),
  ('5', 'Laundry Detergent (6x1L)', 'HOUSEHOLD', 'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2021/01/28/0262957e-5b08-11eb-a99a-beae699a1a1d_972x_194734.jpg', 42.00, 44.10, 50.00, 8.00, 16, '6x1L', 80, 'Premium laundry detergent. Long-lasting formula.'),
  ('6', 'Cleaning Liquid (6x1L)', 'HOUSEHOLD', 'https://www.lioncorp.com.sg/wp-content/uploads/2020/05/MML-group-v2.jpg', 28.00, 29.40, 32.00, 4.00, 13, '6x1L', 120, 'Multi-purpose cleaning solution. Popular household item.');

-- Insert Outlet Locations
INSERT INTO public.outlet_locations (mock_id, name, address, type, availability, lead_time)
VALUES
  ('hub-1', 'Valu$ Central Hub & Warehouse', '123 Industrial Road, Singapore 629876', 'hub', 'immediate', NULL),
  ('hub-2', 'Valu$ Jurong Hub Outlet', '456 Jurong West Ave 1, Singapore 640456', 'hub', 'immediate', NULL),
  ('hl-1', 'Valu$ Ang Mo Kio', '123 Ang Mo Kio Ave 3, Singapore 560123', 'heartland', 'scheduled', '24-48 hours'),
  ('hl-2', 'Valu$ Bedok', '456 Bedok North Street 1, Singapore 460456', 'heartland', 'scheduled', '24-48 hours'),
  ('hl-3', 'Valu$ Clementi', '789 Clementi Ave 4, Singapore 120789', 'heartland', 'scheduled', '24-48 hours'),
  ('hl-4', 'Valu$ Tampines', '321 Tampines Street 32, Singapore 520321', 'heartland', 'scheduled', '24-48 hours'),
  ('hl-5', 'Valu$ Woodlands', '654 Woodlands Drive 71, Singapore 730654', 'heartland', 'scheduled', '24-48 hours'),
  ('hl-6', 'Valu$ Yishun', '987 Yishun Ring Road, Singapore 760987', 'heartland', 'scheduled', '24-48 hours');
