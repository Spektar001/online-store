import { ProductsData, checkedQuerySelector } from '../../types/exports';
import { drawTopbar } from './topbar/drawTopbar';
import { drawProducts } from './products/drawProducts';
import { drawFilters } from './filters/drawFilters';
import { createEl, appendEl } from './elements/elements';
import './productsPage.css';

export function drawProductsPage(data: ProductsData[], state: ProductsData[], curState: ProductsData[]): void {
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
    drawProducts(data, state);
    drawFilters(data, state, curState);
}
