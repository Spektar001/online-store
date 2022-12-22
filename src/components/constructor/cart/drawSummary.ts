import { createEl, appendEl } from '../elements/elements';
import { ProductsData, checkedQuerySelector } from '../../../types/exports';
import './cart.css';

export function drawCartSummary(data: ProductsData[]): void {
    const cartSummary = checkedQuerySelector(document, '.cart-page__container_right');

    const summaryMainText = createEl('cart-summary__text_main', 'span');
    const summaryItemsAmountContainer = createEl('cart-summary__container_items', 'div');
    const summaryItemsAmountText = createEl('cart-summary__text_items', 'span');
    const summaryItemsAmount = createEl('cart-summary__items', 'span');
    const summarySummContainer = createEl('cart-summary__container_summ', 'div');
    const summarySummText = createEl('cart-summary__text_summ', 'span');
    const summarySumm = createEl('cart-summary__summ', 'span');
    const topbarItemsInput = <HTMLInputElement>createEl('cart-summary__input', 'input');
    const summaryTooltip = createEl('cart-summary__tip', 'span');
    const summaryBuyButton = createEl('cart-summary__button_buy', 'button');

    appendEl(cartSummary, summaryMainText);

    appendEl(summaryItemsAmountContainer, summaryItemsAmountText);
    appendEl(summaryItemsAmountContainer, summaryItemsAmount);

    appendEl(cartSummary, summaryItemsAmountContainer);

    appendEl(summarySummContainer, summarySummText);
    appendEl(summarySummContainer, summarySumm);

    appendEl(cartSummary, summarySummContainer);
    appendEl(cartSummary, topbarItemsInput);
    appendEl(cartSummary, summaryTooltip);
    appendEl(cartSummary, summaryBuyButton);

    summaryMainText.textContent = 'SUMMARY';
    summaryItemsAmountText.textContent = 'Products:';
    summarySummText.textContent = 'Total:';
    summaryTooltip.textContent = 'Test: HALAVA or TEN%';
    topbarItemsInput.type = 'text';
    topbarItemsInput.placeholder = 'Enter your promocode...';
    summaryBuyButton.textContent = 'BUY NOW';
}
