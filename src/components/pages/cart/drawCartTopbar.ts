import {
    ProductsData,
    CartData,
    PromoData,
    checkedQuerySelector,
    QueryData,
    appendEl,
    createEl,
} from '../../../types/types';
import { drawCartProducts } from './drawCartProducts';
import './cart.css';

export function drawCartTopbar(
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[],
    queryState: QueryData
): void {
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
    topbarItemsInput.value = queryState.limitPerPage;

    let page = +queryState.page || 1;

    setPaginationButtons(topbarNextPage, topbarPrevPage, cartState, queryState);

    topbarPagesText.textContent = 'Page:';
    topbarNextPage.textContent = '+';
    topbarCurrentPage.textContent = `${page}`;
    topbarPrevPage.textContent = '-';

    let currentValue = topbarItemsInput.value;

    topbarItemsInput.addEventListener('input', () => {
        currentValue = setItemsPerPage(
            currentValue,
            topbarItemsInput,
            topbarNextPage,
            topbarPrevPage,
            cartState,
            queryState
        );
        drawCartProducts(state, cartState, promoState, queryState);
    });

    topbarItemsInput.addEventListener('focusout', () => {
        if (!topbarItemsInput.value) topbarItemsInput.value = queryState.limitPerPage;
    });

    topbarNextPage.addEventListener('mousedown', () => {
        page = setNextPage(page, topbarCurrentPage, topbarNextPage, topbarPrevPage, cartState, queryState);
        drawCartProducts(state, cartState, promoState, queryState);
    });

    topbarPrevPage.addEventListener('mousedown', () => {
        page = setPrevPage(page, topbarCurrentPage, topbarNextPage, topbarPrevPage, cartState, queryState);
        drawCartProducts(state, cartState, promoState, queryState);
    });
}

function setItemsPerPage(
    currentValue: string,
    itemsInput: HTMLInputElement,
    nextPage: HTMLElement,
    prevPage: HTMLElement,
    cartState: CartData[],
    queryState: QueryData
): string {
    if (itemsInput.value.match(/[0-9]+$/g) && +itemsInput.value > 0) {
        itemsInput.value = itemsInput.value.slice(0, 2);
        queryState.limitPerPage = itemsInput.value === '' ? currentValue : itemsInput.value;

        setPaginationButtons(nextPage, prevPage, cartState, queryState);

        const url = new URL(window.location.href);
        url.searchParams.set('limitPerPage', queryState.limitPerPage);
        window.history.pushState(url.search, '', url);
        currentValue = itemsInput.value;
    } else {
        itemsInput.value = '';
    }

    return currentValue;
}

function setPrevPage(
    page: number,
    currentPage: HTMLElement,
    nextPage: HTMLElement,
    prevPage: HTMLElement,
    cartState: CartData[],
    queryState: QueryData
): number {
    page--;

    currentPage.textContent = `${page}`;
    queryState.page = `${page}`;

    setPaginationButtons(nextPage, prevPage, cartState, queryState);

    const url = new URL(window.location.href);
    url.searchParams.set('page', `${page}`);
    window.history.pushState(url.search, '', url);

    return page;
}

function setNextPage(
    page: number,
    currentPage: HTMLElement,
    nextPage: HTMLElement,
    prevPage: HTMLElement,
    cartState: CartData[],
    queryState: QueryData
): number {
    page++;

    currentPage.textContent = `${page}`;
    queryState.page = `${page}`;

    setPaginationButtons(nextPage, prevPage, cartState, queryState);

    const url = new URL(window.location.href);
    url.searchParams.set('page', `${page}`);
    window.history.pushState(url.search, '', url);

    return page;
}

function setPaginationButtons(
    nextPage: HTMLElement,
    prevPage: HTMLElement,
    cartState: CartData[],
    queryState: QueryData
): void {
    +queryState.page <= 1
        ? prevPage.classList.add('cart-product__button_disabled')
        : prevPage.classList.remove('cart-product__button_disabled');

    cartState.length <= +queryState.page * +queryState.limitPerPage
        ? nextPage.classList.add('cart-product__button_disabled')
        : nextPage.classList.remove('cart-product__button_disabled');
}
