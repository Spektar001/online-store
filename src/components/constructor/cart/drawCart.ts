import { createEl, appendEl } from '../elements/elements';
import { ProductsData, CartData, PromoData, checkedQuerySelector } from '../../../types/exports';
import { drawCartProducts } from './drawCartProducts';
import { drawCartTopbar } from './drawTopbar';
import { drawCartSummary } from './drawSummary';
import { goTo } from '../../router/router';
import './cart.css';
import { queryState } from '../../..';

export function drawCart(state: ProductsData[], cartState: CartData[], promoState: PromoData[]): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const cartPageContainer = createEl('cart-page__container container', 'div');

    if (!cartState.length) {
        drawEmptyCart();
    } else {
        drawFilledCart(main, cartPageContainer, state, cartState, promoState);
    }
}

function drawFilledCart(
    parent: HTMLElement,
    pageContaier: HTMLElement,
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[]
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

    drawCartTopbar(state, cartState, queryState);
    drawCartProducts(state, cartState, promoState, queryState);
    drawCartSummary(cartState, promoState);
}

export function drawEmptyCart(): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const noCartContainer = createEl('no-cart__container container', 'div');
    const noCartImage = createEl('no-cart__image', 'div');
    const noCartHeader = createEl('no-cart__header', 'h2');
    const noCartTextContainer = createEl('no-cart__container_text', 'div');
    const noCartText = createEl('no-cart__text', 'span');
    const noCartMainLink = createEl('no-cart__main_link', 'span');

    appendEl(noCartContainer, noCartImage);
    appendEl(noCartContainer, noCartHeader);

    appendEl(noCartTextContainer, noCartText);
    appendEl(noCartTextContainer, noCartMainLink);
    appendEl(noCartContainer, noCartTextContainer);

    appendEl(main, noCartContainer);

    noCartHeader.textContent = 'Your cart is empty!';
    noCartText.textContent = `You may find and add many other great products to your cart if you `;
    noCartMainLink.textContent = 'return to the store.';

    noCartMainLink.addEventListener('click', () => {
        goTo('/');
    });
}
