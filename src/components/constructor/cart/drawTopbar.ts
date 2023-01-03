import { createEl, appendEl } from '../elements/elements';
import { CartData, checkedQuerySelector, ProductsData, QueryData } from '../../../types/exports';
import './cart.css';
import { drawCartProducts } from './drawCartProducts';
import { promoState } from '../../..';

export function drawCartTopbar(state: ProductsData[], cartState: CartData[], queryState: QueryData): void {
    const cartTopbar = checkedQuerySelector(document, '.cart-products__topbar');

    const topbarMainText = createEl('cart-topbar__text_main', 'span');
    const topbarPaginationContainer = createEl('cart-topbar__container_pagination', 'div');
    const topbarItemsContainer = createEl('cart-topbar__container_items', 'div');
    const topbarItemsText = createEl('cart-topbar__text_items', 'span');
    const topbarItemsInput = <HTMLInputElement>createEl('cart-topbar__input', 'input');
    const topbarPagesContainer = createEl('cart-topbar__container_pages', 'div');
    const topbarPagesText = createEl('cart-topbar__text_pages', 'span');
    const topbarButtonsContainer = createEl('cart-topbar__container_buttons', 'div');
    const topbarNextPage = createEl('cart-topbar__button cart-topbar__button_add', 'button');
    const topbarCurrentPage = createEl('cart-topbar__amount', 'span');
    const topbarPrevPage = createEl('cart-topbar__button cart-topbar__button_remove', 'button');

    appendEl(cartTopbar, topbarMainText);

    appendEl(topbarItemsContainer, topbarItemsText);
    appendEl(topbarItemsContainer, topbarItemsInput);

    appendEl(topbarPaginationContainer, topbarItemsContainer);

    appendEl(topbarPagesContainer, topbarPagesText);

    appendEl(topbarButtonsContainer, topbarPrevPage);
    appendEl(topbarButtonsContainer, topbarCurrentPage);
    appendEl(topbarButtonsContainer, topbarNextPage);

    appendEl(topbarPagesContainer, topbarButtonsContainer);

    appendEl(topbarPaginationContainer, topbarPagesContainer);

    appendEl(cartTopbar, topbarPaginationContainer);

    topbarMainText.textContent = 'PRODUCTS IN CART:';
    topbarItemsText.textContent = 'Items per page:';
    topbarItemsInput.type = 'number';
    topbarItemsInput.min = '1';
    topbarItemsInput.max = `10`;
    topbarItemsInput.maxLength = 2;
    topbarItemsInput.value = queryState.limitPerPage;

    let page = +queryState.page || 1;

    console.log(queryState.limitPerPage);

    +queryState.page <= 1
        ? topbarPrevPage.classList.add('cart-product__button_disabled')
        : topbarPrevPage.classList.remove('cart-product__button_disabled');

    cartState.length <= +queryState.page * +queryState.limitPerPage
        ? topbarNextPage.classList.add('cart-product__button_disabled')
        : topbarNextPage.classList.remove('cart-product__button_disabled');

    topbarPagesText.textContent = 'Page:';
    topbarNextPage.textContent = '+';
    topbarCurrentPage.textContent = `${page}`;
    topbarPrevPage.textContent = '-';

    let currentValue = topbarItemsInput.value;

    topbarItemsInput.addEventListener('input', () => {
        queryState.limitPerPage = topbarItemsInput.value === '' ? currentValue : topbarItemsInput.value;

        +queryState.page <= 1
            ? topbarPrevPage.classList.add('cart-product__button_disabled')
            : topbarPrevPage.classList.remove('cart-product__button_disabled');

        cartState.length <= +queryState.page * +queryState.limitPerPage
            ? topbarNextPage.classList.add('cart-product__button_disabled')
            : topbarNextPage.classList.remove('cart-product__button_disabled');

        const url = new URL(window.location.href);
        url.searchParams.set('limitPerPage', queryState.limitPerPage);
        window.history.pushState(url.search, '', url);
        currentValue = topbarItemsInput.value;

        drawCartProducts(state, cartState, promoState, queryState);
    });

    topbarNextPage.addEventListener('click', () => {
        page++;

        topbarCurrentPage.textContent = `${page}`;
        queryState.page = `${page}`;

        +queryState.page <= 1
            ? topbarPrevPage.classList.add('cart-product__button_disabled')
            : topbarPrevPage.classList.remove('cart-product__button_disabled');

        cartState.length <= +queryState.page * +queryState.limitPerPage
            ? topbarNextPage.classList.add('cart-product__button_disabled')
            : topbarNextPage.classList.remove('cart-product__button_disabled');

        const url = new URL(window.location.href);
        url.searchParams.set('page', `${page}`);
        window.history.pushState(url.search, '', url);

        drawCartProducts(state, cartState, promoState, queryState);
    });

    topbarPrevPage.addEventListener('click', () => {
        page--;

        topbarCurrentPage.textContent = `${page}`;
        queryState.page = `${page}`;

        +queryState.page <= 1
            ? topbarPrevPage.classList.add('cart-product__button_disabled')
            : topbarPrevPage.classList.remove('cart-product__button_disabled');

        cartState.length <= +queryState.page * +queryState.limitPerPage
            ? topbarNextPage.classList.add('cart-product__button_disabled')
            : topbarNextPage.classList.remove('cart-product__button_disabled');

        const url = new URL(window.location.href);
        url.searchParams.set('page', `${page}`);
        window.history.pushState(url.search, '', url);

        drawCartProducts(state, cartState, promoState, queryState);
    });
}
