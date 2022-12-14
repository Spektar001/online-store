import { checkedQuerySelector, Products } from '../../types/exports';
import { appendEl, createEl } from './elements';

export function drawProducts(data: Products): void {
    for (let i = 0; i < data.products.length; i += 1) {
        const products = checkedQuerySelector(document, '.products__container');
        const li = createEl('product__item', 'li');

        li.textContent = data.products[i].title;

        appendEl(products, li);
    }
}
