import { CartData, checkedQuerySelector, ProductsData } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProductsPage } from './components/constructor/drawProductsPage';
import { drawCart } from './components/constructor/cart/drawCart';
import './global.css';

let state: ProductsData[] = [];
const cartState: CartData[] = [];

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    drawProductsPage(state, state, cartState);
}

setProdouctsValues();
checkedQuerySelector(document, '.header__cart').addEventListener('click', () => drawCart(state, cartState));
