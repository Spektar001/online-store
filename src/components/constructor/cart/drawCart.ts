import { createEl, appendEl } from '../elements/elements';
import { ProductsData, checkedQuerySelector } from '../../../types/exports';
import { drawCartProducts } from './drawCartProducts';
import { drawCartTopbar } from './drawTopbar';
import { drawCartSummary } from './drawSummary';
import './cart.css';

export function drawCart(data: ProductsData[]): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const cartPageContainer = createEl('cart-page__container container', 'div');
    const cartPageLeft = createEl('cart-page__container_left', 'div');
    const cartPageRight = createEl('cart-page__container_right', 'div');
    const cartProductsTopbar = createEl('cart-products__topbar', 'div');
    const cartProductsContainer = createEl('cart-products__container', 'div');

    appendEl(cartPageLeft, cartProductsTopbar);
    appendEl(cartPageLeft, cartProductsContainer);

    appendEl(cartPageContainer, cartPageLeft);
    appendEl(cartPageContainer, cartPageRight);

    appendEl(main, cartPageContainer);

    drawCartProducts(data);
    drawCartTopbar(data);
    drawCartSummary(data);
}
