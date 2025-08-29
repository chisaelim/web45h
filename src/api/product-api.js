export async function getAllProducts() {
  try {
    const result = await axios.get('https://dummyjson.com/products');
    return result;
  } catch (error) {
    throw error;
  }
}
