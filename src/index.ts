import { checkedQuerySelector, Products } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProducts } from './components/constructor/drawElements';
import './global.css';

let state: Products;

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result;
    drawProducts(state);
}

setProdouctsValues();

checkedQuerySelector(document, '.button').addEventListener('click', () => console.log(state));
