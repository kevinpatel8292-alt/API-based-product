/**
 * Service to interact with the Fake Store API
 */

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the Fake Store API
 * @returns {Promise<Array>} A promise that resolves to the list of products
 */
export const fetchProductsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData = await response.json();
    
    // Filter out default FakeStore API electronics (tvs, sd cards, drives)
    const data = rawData.filter(item => item.category !== 'electronics');

    // Add custom products (Household items and Mobiles)
    const customProducts = [
      {
        id: 101,
        title: "Apple iPhone 17 Pro Max",
        price: 1199.99,
        description: "The ultimate iPhone featuring a titanium design, A17 Pro chip, and advanced camera system.",
        category: "mobile",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTk8WBEmRa_Glkc8vJyo9wDUh51SrKLIF2hzoN078p1zOWs15AARXcz9qli7DPzwEb3m8rJGqttT_b1IZV2Uo_Qa5ET3oS--4zbpr9OfB0eFBG5JyO7-c-lVr8",
        images: [
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTk8WBEmRa_Glkc8vJyo9wDUh51SrKLIF2hzoN078p1zOWs15AARXcz9qli7DPzwEb3m8rJGqttT_b1IZV2Uo_Qa5ET3oS--4zbpr9OfB0eFBG5JyO7-c-lVr8",
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTNB6mZhWX0qfYto_KEgqKDnQYML9zpKPmSsWfcsExPgrQwL5rd1JcsMqFlr9-l5GATDjbx_E8mZe8sMRZlVmL3ptvnVTfVbh3fmLIDVzMOh6cFrNecTlRTPaAs",
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSG-AJXht1xXzVDsZUefWYBOEkfLcnEe994-IUY5XEu2crRVG-5P-lyzE2Jw_BcMtpCAIrOL8UbaOsVsIxdiycElbdWFGUEm75h9NAyp3D_PCG5T9-ddsHE",
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSLlnPvT4OFvmtltbwYxV3w0LgGnJ9jn7swPqOCZFjtpEEgfe_A4tsrY1CUuj1h6UerJ0e25X-OrCDElazuNfsCRbN4OoWalxsOG6COItUWEiN5Jbvyt9jH"
        ],
        rating: { rate: 4.8, count: 1245 }
      },
      {
        id: 102,
        title: "Samsung S25 Ultra",
        price: 1299.99,
        description: "Experience the next level of smartphone innovation with Galaxy AI and a 200MP camera.",
        category: "mobile",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTetU0hUeMHB85zGVoFXUzrSoxJokV-YcXLMXTGVSqWXVRcjz45psd7JWRpa0GdXS5xiqK3X1jc905l1JZXljkDoFLyc_02VbzkmvwdLLNPbKsORvmXewj1_x4",
        images: [
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTetU0hUeMHB85zGVoFXUzrSoxJokV-YcXLMXTGVSqWXVRcjz45psd7JWRpa0GdXS5xiqK3X1jc905l1JZXljkDoFLyc_02VbzkmvwdLLNPbKsORvmXewj1_x4",
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSQsFYiiOAVQKohvHWGxhghCc--1FfkBWD5RLVnossUR7Jce1IZULTlTkGxzOoi5argKbcRaonmqLHbjS4Ls-aYIlyZo8lq0ewywbDoujKR0tW9SKoWCcOaxw",
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR-0olHAzghZCdbCTehvb3XC9J40AV0CQM3Ibbcx7YLFRUcyZdiSSXNW_IiyCV96i6OJ8QLOdRoK0Zqdu7EZm0sPDLLZHEpbeagfLGFsDL_VqemfasS8T1tMg",
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR8eAzS68-PKTlakUv1hTQnQmaBcH3sHec4BVm789UbiveESc1l0Fjz6ZEBSF_9YmqP7snQtvtSIpQ5nTbmM9U-umj1S5RgXcQ0U6FZ14p7Vs7lrTcis1Rehw"
        ],
        rating: { rate: 4.7, count: 980 }
      },
      {
        id: 103,
        title: "Google Pixel 8 Pro",
        price: 999.00,
        description: "The best of Google AI, a pro-level camera, and advanced security features.",
        category: "mobile",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRGRFPX7ezhzLssUB8ocTfm0kxMUQ4-d9fbSTxaJ27T8OqVTHx9cHmab_Ai6trdUm-MfeUHo-9B2v9k6qseEAXE0ArFCrfuHoXOYTKPEVSwGB_zF_cO0fZusA",
        images: [
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRGRFPX7ezhzLssUB8ocTfm0kxMUQ4-d9fbSTxaJ27T8OqVTHx9cHmab_Ai6trdUm-MfeUHo-9B2v9k6qseEAXE0ArFCrfuHoXOYTKPEVSwGB_zF_cO0fZusA",
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS6mxK2AVJACJj2qseKd3XuyyaPFoWEc_15aEo_hN66GiXmXU7a2bSLb1jIRPjHkYd5U1LoMdLe6SbSFHnj-gcHC0WR3RYgBYLMH8HyigcSLNywIv_Oejv9aA",
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTM0S3AH3jG1JppC_hEy5FN3mKT7qJcgZ3T-EuqVbiF2I6SC6euhJK2KMbo7-tvFIQ0EL63zA8W2njDLwSyxv0CkH2a-X3RJGL9pAPUWwPf0ifUdH0CKkWo",
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSDeiDljjAJgJCG-V2q9XggUSP0_scLU7HLcqiDmiZV06NtlvMI2-DCxMR13qrAqvh2ETNHktUA0GWZOG-GjMtA_CaXSCiTg"
        ],
        rating: { rate: 4.6, count: 850 }
      },
      {
        id: 104,
        title: "OnePlus 12 5G",
        price: 799.99,
        description: "Smooth beyond belief. Featuring Snapdragon 8 Gen 3 and Hasselblad Camera for Mobile.",
        category: "mobile",
        image: "https://m.media-amazon.com/images/I/717Qo4MH97L._AC_UY327_FMwebp_QL65_.jpg",
        rating: { rate: 4.5, count: 620 }
      },
      {
        id: 201,
        title: "Smart Robot Vacuum Cleaner",
        price: 299.99,
        description: "Self-charging robot vacuum cleaner with mopping functionality and app control.",
        category: "electronics",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTuIAmrfxnjmCPEH0qbPAS582-3HMoofZCBNkQTP8IT6GKjzRQX4CePb1UJeQfhNDETMtL5ZKvMv8LuQWx5mWMg6MEaxuqknR0thCiE1YkpmVsKj7X1YbvGBA",
        images: [
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTuIAmrfxnjmCPEH0qbPAS582-3HMoofZCBNkQTP8IT6GKjzRQX4CePb1UJeQfhNDETMtL5ZKvMv8LuQWx5mWMg6MEaxuqknR0thCiE1YkpmVsKj7X1YbvGBA",
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQD3D0hzncBZJqEor3lF7bmxsVagWuA0QGFOIe60r4CC-a8OFcBVtNsw4vYM-X1_S4EZgksIeG3S6_1IX2g3joYUgxeH15juCo8aTbTIA"
        ],
        rating: { rate: 4.6, count: 852 }
      },
      {
        id: 202,
        title: "Air Purifier with HEPA Filter",
        price: 129.50,
        description: "True HEPA air purifier for home, covers up to 1000 sq ft.",
        category: "electronics",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQJXG1anYRGeX5x9surimnGmrzIKNg36nwwqS_pg7SuZjKkWQZoMUqI4l-OpJzwY3kjc4B24oDeB24GSCsKvQZstunjGQjiPS_wSLpA_L6DpbuRkcgvu3y7ABE",
        images: [
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQJXG1anYRGeX5x9surimnGmrzIKNg36nwwqS_pg7SuZjKkWQZoMUqI4l-OpJzwY3kjc4B24oDeB24GSCsKvQZstunjGQjiPS_wSLpA_L6DpbuRkcgvu3y7ABE",
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTYICVm-b6vWoxmGLO5ICocKGfIh41odmHJ5g7Pumn67ZnRmTIEqifTKoEtJJ5o9cGNLAT159_tXGbPVCluBTtCjHtadIDaFEW1_gMFZ8"
        ],
        rating: { rate: 4.8, count: 1205 }
      },
      {
        id: 203,
        title: "Ceramic Non-Stick Cookware Set",
        price: 89.99,
        description: "12-piece non-stick pots and pans set, free of PTFE and PFOA.",
        category: "electronics",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQDEjuAi02J01m5Yayo_rEd-yLwDPABsxDbMweCah_eaA8BAwxUpd0e8DKYzOLToM-t4yoQE8hwyVcFFo-OcK6sJVK6xsveJXek9ZBNNqn8DC98_8B88M8mx_M7",
        images: [
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQDEjuAi02J01m5Yayo_rEd-yLwDPABsxDbMweCah_eaA8BAwxUpd0e8DKYzOLToM-t4yoQE8hwyVcFFo-OcK6sJVK6xsveJXek9ZBNNqn8DC98_8B88M8mx_M7",
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSW_NIM2gTKPTuEBn_fIGz7K85ZEgtbq1JmAPC-rxcVH6REeikQdojEs7r4TN8pfI9lh4FQGF2jfiPvqDl5HzQxPUEGMEFIQSsti9JL6dHlGueFe8qMBdGMbQ"
        ],
        rating: { rate: 4.5, count: 642 }
      },
      {
        id: 204,
        title: "Memory Foam Mattress Topper",
        price: 65.00,
        description: "3-inch cooling gel memory foam mattress topper for pressure relief.",
        category: "electronics",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSWpq52GHCiXLJzHTgtd12sItGSsyBlDlvimLp6-X85PY_Y-kNcRZ-WQzZ54jlcobAyvu28Sj05VYKvC3D0BdyRAkMAoJrTVvv73u0AUOUT",
        images: [
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSWpq52GHCiXLJzHTgtd12sItGSsyBlDlvimLp6-X85PY_Y-kNcRZ-WQzZ54jlcobAyvu28Sj05VYKvC3D0BdyRAkMAoJrTVvv73u0AUOUT",
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRJZ4Lig0UQx5Am2ufvjHgwnuWs3QfzcX4mpii6JaV7RJ6PwtaNWhvyXZY17vP24V8ssk6ZaKaM5dEe1J9rZ-CkX0u1xpuHsFIf5f5WpF0ZKCy-ftpDjoiiRQ"
        ],
        rating: { rate: 4.7, count: 3200 }
      }
    ];
    const combinedData = [...customProducts, ...data];
    return combinedData.map(item => ({
      ...item,
      images: item.images || [
        item.image,
        item.image,
        item.image,
        item.image
      ]
    }));
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
