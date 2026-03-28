import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { products as mockProducts, outletLocations as mockLocations } from '../data/mockData';
import { Product, OutletLocation } from '../types';

// Helper hook to fetch products
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        // Fallback to mock data if not configured
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map to match frontend interface
          const mappedProducts: Product[] = data.map(dbItem => {
            let image = dbItem.image;
            // If the image is a relative path (doesn't start with http), prepend Supabase storage URL
            if (image && !image.startsWith('http')) {
              const bucket = 'product-images'; // Assuming 'product-images' bucket
              const baseUrl = import.meta.env.VITE_SUPABASE_URL;
              image = `${baseUrl}/storage/v1/object/public/${bucket}/${image}`;
            }
            
            return {
              id: dbItem.mock_id || dbItem.id, // using mock_id to keep existing relations working for now
              name: dbItem.name,
              category: dbItem.category as any,
              image: image,
              cashPrice: Number(dbItem.cash_price),
              bnplPrice: Number(dbItem.bnpl_price),
              retailPrice: Number(dbItem.retail_price),
              savings: Number(dbItem.savings),
              savingsPercent: dbItem.savings_percent,
              unit: dbItem.unit,
              stock: dbItem.stock,
              description: dbItem.description,
              dbId: dbItem.id
            };
          });
          setProducts(mappedProducts);
        } else {
          setProducts(mockProducts);
        }
      } catch (err: any) {
        console.error('Error fetching products from Supabase:', err.message);
        setError(err);
        setProducts(mockProducts); // fallback
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// Helper hook to fetch outlet locations
export function useOutletLocations() {
  const [locations, setLocations] = useState<OutletLocation[]>(mockLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        setLocations(mockLocations);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('outlet_locations').select('*');
        if (error) throw error;

        if (data && data.length > 0) {
          const mappedLocations: OutletLocation[] = data.map(loc => ({
            id: loc.mock_id || loc.id,
            name: loc.name,
            address: loc.address,
            type: loc.type as any,
            availability: loc.availability as any,
            leadTime: loc.lead_time
          }));
          setLocations(mappedLocations);
        } else {
          setLocations(mockLocations);
        }
      } catch (err: any) {
        console.error('Error fetching outlet locations from Supabase:', err.message);
        setLocations(mockLocations);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return { locations, loading };
}
