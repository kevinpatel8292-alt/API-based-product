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
      
      const formattedApiProducts = apiData.map((item) => {
        const discountVal = item.discountPercentage || 0;
        const originalPrice = discountVal > 0 
          ? Math.round((item.price / (1 - (discountVal / 100))) * 100) / 100 
          : item.price;

        return {
          ...item,
          image: item.thumbnail,
          originalPrice: originalPrice,
          discount: Math.round(discountVal),
          rating: { rate: item.rating, count: item.reviews?.length || Math.floor(Math.random() * 500) + 50 }
        };
      });

      const customProducts = [
        {
          id: 101,
          title: "Apple iPhone 17 Pro Max",
          price: 1199.99,
          originalPrice: 1399.99,
          discount: 14,
          description: "The ultimate iPhone featuring a titanium design, A17 Pro chip, and advanced camera system.",
          category: "smartphones",
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTk8WBEmRa_Glkc8vJyo9wDUh51SrKLIF2hzoN078p1zOWs15AARXcz9qli7DPzwEb3m8rJGqttT_b1IZV2Uo_Qa5ET3oS--4zbpr9OfB0eFBG5JyO7-c-lVr8",
          rating: { rate: 4.8, count: 1245 }
        },
        {
          id: 102,
          title: "Samsung S25 Ultra",
          price: 1299.99,
          originalPrice: 1499.99,
          discount: 13,
          description: "Experience the next level of smartphone innovation with Galaxy AI and a 200MP camera.",
          category: "smartphones",
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTetU0hUeMHB85zGVoFXUzrSoxJokV-YcXLMXTGVSqWXVRcjz45psd7JWRpa0GdXS5xiqK3X1jc905l1JZXljkDoFLyc_02VbzkmvwdLLNPbKsORvmXewj1_x4",
          rating: { rate: 4.7, count: 980 }
        },
        {
          id: 103,
          title: "Google Pixel 8 Pro",
          price: 999.00,
          originalPrice: 1099.00,
          discount: 9,
          description: "The best of Google AI, a pro-level camera, and advanced security features.",
          category: "smartphones",
          image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRGRFPX7ezhzLssUB8ocTfm0kxMUQ4-d9fbSTxaJ27T8OqVTHx9cHmab_Ai6trdUm-MfeUHo-9B2v9k6qseEAXE0ArFCrfuHoXOYTKPEVSwGB_zF_cO0fZusA",
          rating: { rate: 4.6, count: 850 }
        },
        {
          id: 104,
          title: "OnePlus 12 5G",
          price: 799.99,
          originalPrice: 899.99,
          discount: 11,
          description: "Smooth beyond belief. Featuring Snapdragon 8 Gen 3 and Hasselblad Camera for Mobile.",
          category: "smartphones",
          image: "https://m.media-amazon.com/images/I/717Qo4MH97L._AC_UY327_FMwebp_QL65_.jpg",
          rating: { rate: 4.5, count: 620 }
        },
        {
          id: 2005,
          title: "Swarovski Sparkling Dance Necklace",
          price: 89.99,
          originalPrice: 109.99,
          discount: 18,
          category: "womens-jewellery",
          description: "Exquisite rose-gold plated necklace featuring a circular floating clear crystal inside a 3D cage motif.",
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.4, count: 76 }
        },
        {
          id: 2006,
          title: "Elegant Summer Floral Dress",
          price: 49.99,
          originalPrice: 69.99,
          discount: 28,
          category: "womens-dresses",
          description: "Beautiful and breathable summer floral dress, perfect for casual outings and parties.",
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80",
          rating: { rate: 4.5, count: 120 }
        }
      ];

      setProducts([...customProducts, ...formattedApiProducts]);
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
