import { ProductsData, CartData, checkedQuerySelector, QueryData } from '../../types/exports';
import { drawTopbar } from './topbar/drawTopbar';
import { drawFilters } from './filters/drawFilters';
import { createEl, appendEl } from './elements/elements';
import { setFilters } from './filters/filters';
import './productsPage.css';

export function drawProductsPage(state: ProductsData[], cartState: CartData[], queryState: QueryData): void {
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

    drawTopbar(state, queryState);
    drawFilters(state, cartState, queryState);
    setFilters(state, queryState);
}
