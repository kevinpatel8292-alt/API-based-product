import { useState, useEffect, useCallback } from 'react';
import { fetchProductsList } from '../services/api';

/**
 * Custom hook to fetch and manage product state for Trendify.
 * Prepends Trendify-specific items and calculates original prices/discounts.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiData = await fetchProductsList();
      
      // Replicate the 6 trending products shown in the Trendify screenshot
      const trendifyProducts = [
        {
          id: 2001,
          title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
          price: 279.99,
          originalPrice: 349.99,
          discount: 20,
          category: "electronics",
          description: "Industry-leading active noise cancellation wireless over-ear headphones with premium sound quality and microphone.",
          image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.8, count: 245 }
        },
        {
          id: 2002,
          title: "Apple Watch Series 9 GPS 41mm Midnight Aluminum",
          price: 339.00,
          originalPrice: 399.00,
          discount: 15,
          category: "electronics",
          description: "Advanced smartwatch with blood oxygen tracker, ECG monitor, fitness metrics, and crash detection.",
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.7, count: 189 }
        },
        {
          id: 2003,
          title: "Nike Air Max 270 Men's Shoes",
          price: 125.99,
          originalPrice: 169.99,
          discount: 25,
          category: "footwear",
          description: "Comfortable and stylish lifestyle sneakers featuring Nike's largest Max Air heel unit for lightweight cushioning.",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.6, count: 310 }
        },
        {
          id: 2004,
          title: "Herschel Classic Backpack",
          price: 59.99,
          originalPrice: 85.99,
          discount: 30,
          category: "bags",
          description: "Clean, everyday backpack styled with front storage pocket, key clip, and internal media pocket.",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.5, count: 98 }
        },
        {
          id: 2005,
          title: "Swarovski Sparkling Dance Necklace",
          price: 89.99,
          originalPrice: 109.99,
          discount: 18,
          category: "jewellery",
          description: "Exquisite rose-gold plated necklace featuring a circular floating clear crystal inside a 3D cage motif.",
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.4, count: 76 }
        },
        {
          id: 2006,
          title: "Polo Ralph Lauren Classic Fit T-Shirt",
          price: 49.99,
          originalPrice: 64.00,
          discount: 22,
          category: "men's fashion",
          description: "Standard fit crewneck short-sleeve tee made from soft cotton jersey, complete with signature embroidered pony.",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.3, count: 132 }
        }
      ];

      // Format Fake Store API data to align categories and create original prices for discounts
      const formattedApiProducts = apiData.map((item) => {
        let updatedItem = { ...item };

        // Clean up categories to match Trendify pills
        if (item.category === "men's clothing") {
          updatedItem.category = "men's fashion";
        } else if (item.category === "women's clothing") {
          updatedItem.category = "women's fashion";
        } else if (item.category === "jewelery") {
          updatedItem.category = "jewellery";
        }

        // Calculate original price and static discounts
        const priceVal = Number(item.price);
        updatedItem.originalPrice = Math.round(priceVal * 1.25 * 100) / 100;
        updatedItem.discount = 20;

        return updatedItem;
      });

      setProducts([...trendifyProducts, ...formattedApiProducts]);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    retry: fetchProducts
  };
};
