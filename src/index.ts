import { CartData, checkedQuerySelector, ProductsData, PromoData, QueryData } from './types/exports';
import { getProductsData } from './components/api/products';
import { setStorage } from './components/storage/setStorage';
import './global.css';
import initRouter, { goTo } from './components/router/router';
import { resetFilters } from './components/constructor/filters/filters';

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
};

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    initRouter();
}

setProdouctsValues();
checkedQuerySelector(document, '.header__cart').addEventListener('click', () => goTo('/cart'));
checkedQuerySelector(document, '.header__logo').addEventListener('click', () => {
    resetFilters(queryState);
});

window.addEventListener('beforeunload', () => {
    setStorage('cartState', cartState);
    setStorage('promoState', promoState);
});
