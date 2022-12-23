import { CartData, checkedQuerySelector, ProductsData, PromoData } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProductsPage } from './components/constructor/drawProductsPage';
import { countCartProducts, countCartTotal } from './components/constructor/cart/cartControls';
import { drawCart } from './components/constructor/cart/drawCart';
import { setStorage } from './components/storage/setStorage';
import './global.css';

let state: ProductsData[] = [];
const cartState: CartData[] =
    localStorage.getItem('cartState') !== null ? JSON.parse(localStorage.getItem('cartState') || '') : [];
const promoState: PromoData[] =
    localStorage.getItem('promoState') !== null ? JSON.parse(localStorage.getItem('promoState') || '') : [];

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    drawProductsPage(state, cartState);
    countCartProducts(cartState);
    countCartTotal(cartState);
}

setProdouctsValues();
checkedQuerySelector(document, '.header__cart').addEventListener('click', () => drawCart(state, cartState, promoState));

window.addEventListener('beforeunload', () => {
    setStorage('cartState', cartState);
    setStorage('promoState', promoState);
});
