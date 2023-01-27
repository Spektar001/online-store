/* imports ------------------------------------------------- */

import { showPopUp } from '../popup/popup';
import {
    ProductsData,
    CartData,
    PromoData,
    checkedQuerySelector,
    QueryData,
    appendEl,
    createEl,
} from '../../../types/types';
import {
    countCartTotal,
    countCartProducts,
    addPromoItem,
    removePromoItem,
    countTotalSum,
    setLinedSum,
} from './cartControls';
import { promocodes } from '../../promocodes/promocodes';
import './cart.css';

/* function to draw cart summary ------------------------------------------------- */

export function drawCartSummary(
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[],
    queryState: QueryData
): void {
    const cartSummary = checkedQuerySelector(document, '.cart-page__container_right');
    cartSummary.innerHTML = '';

    const summaryMainText = createEl('cart-summary__text_main', 'span');
    const summaryItemsAmountContainer = createEl('cart-summary__container_items', 'div');
    const summaryItemsAmountText = createEl('cart-summary__text_items', 'span');
    const summaryItemsAmount = createEl('cart-summary__items', 'span');
    const summarySummContainer = createEl('cart-summary__container_summ', 'div');
    const summarySummText = createEl('cart-summary__text_summ', 'span');
    const summarySummDisc = createEl('cart-summary__summ_disc', 'span');
    const summarySumm = createEl('cart-summary__summ', 'span');
    const summaryItemsInput = <HTMLInputElement>createEl('cart-summary__input', 'input');
    const summaryPromoContainer = createEl('cart-summary__container_promo', 'div');
    const summaryTooltip = createEl('cart-summary__tip', 'span');
    const summaryBuyButton = createEl('cart-summary__button_buy', 'button');

    appendEl(cartSummary, summaryMainText);

    appendEl(summaryItemsAmountContainer, summaryItemsAmountText);
    appendEl(summaryItemsAmountContainer, summaryItemsAmount);

    appendEl(cartSummary, summaryItemsAmountContainer);

    appendEl(summarySummContainer, summarySummText);
    appendEl(summarySummContainer, summarySummDisc);
    appendEl(summarySummContainer, summarySumm);

    appendEl(cartSummary, summarySummContainer);
    appendEl(cartSummary, summaryItemsInput);
    appendEl(cartSummary, summaryPromoContainer);
    appendEl(cartSummary, summaryTooltip);
    appendEl(cartSummary, summaryBuyButton);

    summaryMainText.textContent = 'SUMMARY';
    summaryItemsAmountText.textContent = `Products: ${countCartProducts(cartState)}`;
    summarySummText.textContent = `Total: `;
    summarySummDisc.textContent = countTotalSum(cartState, promoState);
    summarySumm.textContent = `${countCartTotal(cartState)}€`;
    summaryTooltip.textContent = 'Test: RSSCHOOL or DISC10';
    summaryItemsInput.type = 'text';
    summaryItemsInput.placeholder = 'Enter your promocode...';
    summaryBuyButton.textContent = 'BUY NOW';

    summaryItemsInput.addEventListener('input', () => {
        if (addPromoItem(summaryItemsInput, promocodes, promoState)) {
            drawCartPromos(summaryPromoContainer, state, cartState, promoState, queryState);
            drawCartSummary(state, cartState, promoState, queryState);
        }
    });

    summaryBuyButton.addEventListener('click', () => {
        showPopUp(summaryBuyButton, state, cartState, promoState, queryState);
    });

    setLinedSum(summarySumm, 'cart-summary__summ_lined', promoState);
    drawCartPromos(summaryPromoContainer, state, cartState, promoState, queryState);
}

/* function to draw cart promocodes ------------------------------------------------- */

function drawCartPromos(
    parent: HTMLElement,
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[],
    queryState: QueryData
): void {
    parent.innerHTML = '';

    for (const item of promoState) {
        const summaryPromoItemContainer = createEl('cart-summary__promo-item_container', 'div');
        const summaryPromoItemTextContainer = createEl('cart-summary__promo-item_container_text', 'div');
        const summaryPromoName = createEl('cart-summary__promo-item_name', 'div');
        const summaryPromoDiscount = createEl('cart-summary__promo-item_disc', 'div');
        const summaryPromoRemove = createEl('cart-summary__promo-item_button button', 'button');

        appendEl(summaryPromoItemTextContainer, summaryPromoName);
        appendEl(summaryPromoItemTextContainer, summaryPromoDiscount);

        appendEl(summaryPromoItemContainer, summaryPromoItemTextContainer);
        appendEl(summaryPromoItemContainer, summaryPromoRemove);

        summaryPromoName.textContent = item.name;
        summaryPromoDiscount.textContent = `${item.discount * 100}%`;
        summaryPromoRemove.id = item.name;
        summaryPromoRemove.textContent = `X`;

        summaryPromoRemove.addEventListener('click', () => {
            removePromoItem(summaryPromoRemove, promoState);
            drawCartPromos(parent, state, cartState, promoState, queryState);
            drawCartSummary(state, cartState, promoState, queryState);
        });

        appendEl(parent, summaryPromoItemContainer);
    }
}
