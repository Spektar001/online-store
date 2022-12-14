import { checkedQuerySelector } from './types/exports';
import { getProductsData } from './components/api/products';
import './global.css';

async function setProdouctsValues() {
    const result = await getProductsData();

    for (let i = 0; i < result.products.length; i += 1) {
        const products = checkedQuerySelector(document, '.products__container');
        const li = document.createElement('li');

        li.textContent = result.products[i].title;

        products.append(li);
    }
}

setProdouctsValues();
