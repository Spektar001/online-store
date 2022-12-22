import { createEl, appendEl } from '../elements/elements';
import { ProductsData, CartData, checkedQuerySelector } from '../../../types/exports';
import { drawCartProducts } from './drawCartProducts';
import { drawCartTopbar } from './drawTopbar';
import { drawCartSummary } from './drawSummary';
import './cart.css';

export function drawCart(state: ProductsData[], cartState: CartData[]): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    if (!cartState.length) {
        main.innerHTML = 'NO PRODUCTS';
    } else {
        drawFilledCart(main, state, cartState);
    }
}

function drawFilledCart(parent: HTMLElement, state: ProductsData[], cartState: CartData[]): void {
    const cartPageContainer = createEl('cart-page__container container', 'div');
    const cartPageLeft = createEl('cart-page__container_left', 'div');
    const cartPageRight = createEl('cart-page__container_right', 'div');
    const cartProductsTopbar = createEl('cart-products__topbar', 'div');
    const cartProductsContainer = createEl('cart-products__container', 'div');

    appendEl(cartPageLeft, cartProductsTopbar);
    appendEl(cartPageLeft, cartProductsContainer);

    appendEl(cartPageContainer, cartPageLeft);
    appendEl(cartPageContainer, cartPageRight);

    appendEl(parent, cartPageContainer);

    drawCartProducts(state, cartState);
    drawCartTopbar(cartState);
    drawCartSummary(cartState);
}
