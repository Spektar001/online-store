import { checkedQuerySelector, ProductsData } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProductsPage } from './components/constructor/drawProductsPage';
import { drawCart } from './components/constructor/cart/drawCart';
import './global.css';

let state: ProductsData[] = [];
let curState: ProductsData[] = [];
const cartState: ProductsData[] = [];

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    curState = state;
    drawProductsPage(state, state, curState);
}

setProdouctsValues();
checkedQuerySelector(document, '.header__cart').addEventListener('click', () => drawCart(state));
