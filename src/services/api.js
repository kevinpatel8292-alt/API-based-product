/**
 * Service to interact with the DummyJSON API
 */

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Fetches all products from the API
 * @returns {Promise<Array>} A promise that resolves to the list of products
 */
export const fetchProductsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // DummyJSON returns data in a { products: [...] } object
    return data.products;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
