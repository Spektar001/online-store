import { CartData, Products, ProductsData, PromoData, QueryData } from '../../types/types';
import { setHeaderButtons } from '../pages/header/setHeader';
import { initRouter } from '../router/router';

export let state: ProductsData[] = [];
export const cartState: CartData[] =
    localStorage.getItem('cartState') !== null ? JSON.parse(localStorage.getItem('cartState') || '') : [];
export const promoState: PromoData[] =
    localStorage.getItem('promoState') !== null ? JSON.parse(localStorage.getItem('promoState') || '') : [];
export const queryState: QueryData = {
    category: [],
    brand: [],
    minPrice: '',
    maxPrice: '',
    minDisc: '',
    maxDisc: '',
    find: '',
    sortBy: '',
    view: '',
    page: '1',
    limitPerPage: '5',
};

export async function initApp() {
    const result = await getProductsData();
    state = result.products;
    initRouter();
    setHeaderButtons();
}

async function getProductsData(): Promise<Products> {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products: Products = await response.json();
        return products;
    } catch (error) {
        console.error(`Can't load data!`);
        throw error;
    }
}
