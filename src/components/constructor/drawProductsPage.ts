import { ProductsData, CartData, checkedQuerySelector } from '../../types/exports';
import { drawTopbar } from './topbar/drawTopbar';
import { drawProducts } from './products/drawProducts';
import { drawFilters } from './filters/drawFilters';
import { createEl, appendEl } from './elements/elements';
import './productsPage.css';

export function drawProductsPage(state: ProductsData[], cartState: CartData[]): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const productsPageContainer = createEl('products-page__container', 'div');
    const productsPageLeft = createEl('products-page__container_left', 'div');
    const productsPageRight = createEl('products-page__container_right', 'div');
    const productsTopbar = createEl('products__topbar', 'div');
    const productsContainer = createEl('products__container', 'div');

    appendEl(productsPageRight, productsTopbar);
    appendEl(productsPageRight, productsContainer);

    appendEl(productsPageContainer, productsPageLeft);
    appendEl(productsPageContainer, productsPageRight);

    appendEl(checkedQuerySelector(document, 'main'), productsPageContainer);

    drawTopbar();
    drawProducts(state, cartState);
    drawFilters(state, cartState);
}
