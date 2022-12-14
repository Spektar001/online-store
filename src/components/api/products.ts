import { Products } from '../../types/exports';

export async function getProductsData(): Promise<Products> {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products: Products = await response.json();
        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
