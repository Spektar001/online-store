/* imports ------------------------------------------------- */

import { appendEl, CartData, checkedQuerySelector, createEl, ProductsData, QueryData } from '../../../../types/types';
import { addToCart, countCartTotal, countCartProducts, setButtons, removeFromCart } from '../../cart/cartControls';
import { resetFilters } from '../filters/setFilters';
import { goTo } from '../../../router/router';
import './products.css';

/* function to draw products ------------------------------------------------- */

export function drawProducts(state: ProductsData[], cartState: CartData[], queryState: QueryData): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    productsContainer.classList.remove('no-products');
    productsContainer.classList.remove('no-match');
    productsContainer.innerHTML = '';

    for (const item of state) {
        const productItem = createEl('product__item', 'div');
        const productRating = createEl('product__label product__rating', 'span');
        const productDiscount = createEl('product__label product__discount', 'span');
        const productImage = createEl('product__image', 'div');
        const productTitle = createEl('product__title', 'span');
        const productDiscPrice = createEl('product__price_disc', 'span');
        const productPrice = createEl('product__price', 'span');
        const productBrand = createEl('product__label product__brand', 'span');
        const productCategory = createEl('product__label product__category', 'span');
        const buyButton = createEl('product__button_buy', 'button');

        const productTopBox = createEl('product__contaiter product__contaiter_top', 'div');
        const productMidBox = createEl('product__contaiter product__contaiter_mid', 'div');
        const productBotBox = createEl('product__contaiter product__contaiter_bot', 'div');

        queryState.view === 'column'
            ? productItem.classList.add('product__item_column')
            : productItem.classList.remove('product__item_column');

        productItem.id = `${item.id}`;
        productRating.textContent = `${item.rating.toFixed(1)}`;
        productDiscount.textContent = `-${item.discountPercentage}%`;
        productImage.style.backgroundImage = `url(${item.thumbnail}`;
        productTitle.textContent = `${item.title}`;
        productCategory.textContent = `${item.category}`;
        productBrand.textContent = `${item.brand}`;
        productDiscPrice.textContent = `${Math.floor(item.price * ((100 - item.discountPercentage) / 100))}€`;
        productPrice.textContent = `${item.price}€`;
        buyButton.textContent = `Add to cart`;

        productItem.addEventListener('click', (e) => {
            const target = e.target;
            if (target !== buyButton) {
                goTo(`/product/${productItem.id}`);
            }
        });

        buyButton.addEventListener('click', () => {
            if (buyButton.classList.contains('product__button_added')) {
                removeFromCart(buyButton, productItem.id, state, cartState);
                countCartProducts(cartState);
                countCartTotal(cartState);
            } else {
                addToCart(buyButton, productItem.id, state, cartState);
                countCartProducts(cartState);
                countCartTotal(cartState);
            }
        });

        setButtons(productItem.id, buyButton, cartState);

        appendEl(productTopBox, productRating);
        appendEl(productTopBox, productDiscount);
        appendEl(productItem, productTopBox);
        appendEl(productItem, productImage);
        appendEl(productItem, productTitle);
        appendEl(productMidBox, productCategory);
        appendEl(productMidBox, productBrand);
        appendEl(productItem, productMidBox);
        appendEl(productBotBox, productDiscPrice);
        appendEl(productBotBox, productPrice);
        appendEl(productItem, productBotBox);
        appendEl(productItem, buyButton);

        appendEl(productsContainer, productItem);
    }
}

/* function to draw products section when filtered state is empry or query is false ------------------------------------------------- */

export function drawNoMatch(queryState: QueryData): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    productsContainer.classList.add('no-products');
    productsContainer.classList.add('no-match');
    productsContainer.innerHTML = '';

    const noMatchEl = createEl('no-match__container', 'div');
    const noMatchElImage = createEl('no-match__image', 'div');
    const noMatchElHeader = createEl('no-match__header', 'h2');
    const noMatchElTextContainer = createEl('no-match__container_text', 'div');
    const noMatchElText = createEl('no-match__text', 'span');
    const noMatchElText2 = createEl('no-match__text', 'span');
    const noMatchElLink = createEl('no-match__main_link', 'span');

    appendEl(productsContainer, noMatchEl);
    appendEl(noMatchEl, noMatchElImage);
    appendEl(noMatchEl, noMatchElHeader);

    appendEl(noMatchEl, noMatchElTextContainer);
    appendEl(noMatchElTextContainer, noMatchElText);
    appendEl(noMatchElTextContainer, noMatchElLink);
    appendEl(noMatchElTextContainer, noMatchElText2);

    noMatchElHeader.textContent = 'Oops! No products found!';
    noMatchElText.textContent = `You may have entered the wrong url or there are no matches for your search parameters. Try to `;
    noMatchElLink.textContent = 'reset the filters ';
    noMatchElText2.textContent = `and start over!`;
    noMatchElLink.addEventListener('click', () => {
        goTo(`/${resetFilters(queryState)}`);
    });
}
