import { checkedQuerySelector, ProductsData } from './types/exports';
import { getProductsData } from './components/api/products';
import { drawProducts } from './components/constructor/products/drawProducts';
import './global.css';

let state: ProductsData[] = [];

async function setProdouctsValues() {
    const result = await getProductsData();
    state = result.products;
    drawProducts(state);
}

setProdouctsValues();
checkedQuerySelector(document, '.button').addEventListener('click', () => console.log(state));
