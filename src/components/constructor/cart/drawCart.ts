import { createEl, appendEl } from '../elements/elements';
import { ProductsData, CartData, checkedQuerySelector } from '../../../types/exports';
import { drawCartProducts } from './drawCartProducts';
import { drawCartTopbar } from './drawTopbar';
import { drawCartSummary } from './drawSummary';
import './cart.css';

export function drawCart(state: ProductsData[], cartState: CartData[]): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const cartPageContainer = createEl('cart-page__container container', 'div');

    if (!cartState.length) {
        appendEl(main, cartPageContainer);
        cartPageContainer.innerHTML = 'NO PRODUCTS';
    } else {
        drawFilledCart(main, cartPageContainer, state, cartState);
    }
}

function drawFilledCart(
    parent: HTMLElement,
    pageContaier: HTMLElement,
    state: ProductsData[],
    cartState: CartData[]
): void {
    const cartPageLeft = createEl('cart-page__container_left', 'div');
    const cartPageRight = createEl('cart-page__container_right', 'div');
    const cartProductsTopbar = createEl('cart-products__topbar', 'div');
    const cartProductsContainer = createEl('cart-products__container', 'div');

    appendEl(cartPageLeft, cartProductsTopbar);
    appendEl(cartPageLeft, cartProductsContainer);

    appendEl(pageContaier, cartPageLeft);
    appendEl(pageContaier, cartPageRight);

    appendEl(parent, pageContaier);

    drawCartProducts(state, cartState);
    drawCartTopbar();
    drawCartSummary(cartState);
}
