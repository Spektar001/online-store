import { createEl, appendEl } from '../elements/elements';
import { checkedQuerySelector } from '../../../types/exports';
import './cart.css';

export function drawCartTopbar(): void {
    const cartTopbar = checkedQuerySelector(document, '.cart-products__topbar');

    const topbarMainText = createEl('cart-topbar__text_main', 'span');
    const topbarPaginationContainer = createEl('cart-topbar__container_pagination', 'div');
    const topbarItemsContainer = createEl('cart-topbar__container_items', 'div');
    const topbarItemsText = createEl('cart-topbar__text_items', 'span');
    const topbarItemsInput = <HTMLInputElement>createEl('cart-topbar__input', 'input');
    const topbarPagesContainer = createEl('cart-topbar__container_pages', 'div');
    const topbarPagesText = createEl('cart-topbar__text_pages', 'span');
    const topbarButtonsContainer = createEl('cart-topbar__container_buttons', 'div');
    const topbarAddButton = createEl('cart-topbar__button cart-topbar__button_add', 'button');
    const topbarBuyAmount = createEl('cart-topbar__amount', 'span');
    const topbarRemoveButton = createEl('cart-topbar__button cart-topbar__button_remove', 'button');

    appendEl(cartTopbar, topbarMainText);

    appendEl(topbarItemsContainer, topbarItemsText);
    appendEl(topbarItemsContainer, topbarItemsInput);

    appendEl(topbarPaginationContainer, topbarItemsContainer);

    appendEl(topbarPagesContainer, topbarPagesText);

    appendEl(topbarButtonsContainer, topbarRemoveButton);
    appendEl(topbarButtonsContainer, topbarBuyAmount);
    appendEl(topbarButtonsContainer, topbarAddButton);

    appendEl(topbarPagesContainer, topbarButtonsContainer);

    appendEl(topbarPaginationContainer, topbarPagesContainer);

    appendEl(cartTopbar, topbarPaginationContainer);

    topbarMainText.textContent = 'PRODUCTS IN CART:';
    topbarItemsText.textContent = 'Items per page:';
    topbarItemsInput.type = 'number';
    topbarItemsInput.min = '1';
    topbarItemsInput.max = `10`;
    topbarItemsInput.maxLength = 2;
    topbarItemsInput.value = '10';
    topbarPagesText.textContent = 'Page:';
    topbarAddButton.textContent = '+';
    topbarBuyAmount.textContent = '1';
    topbarRemoveButton.textContent = '-';
}
