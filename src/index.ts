import { checkedQuerySelector, ProductsData } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProductsPage } from './components/constructor/drawProductsPage';
import './global.css';

let state: ProductsData[] = [];
let curState: ProductsData[] = [];

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    curState = state;
    drawProductsPage(state, state, curState);
}

setProdouctsValues();
checkedQuerySelector(document, '.button').addEventListener('click', () => console.log(state));
