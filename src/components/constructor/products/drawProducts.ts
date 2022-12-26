import { CartData, checkedQuerySelector, ProductsData } from '../../../types/exports';
import { appendEl, createEl } from '../elements/elements';
import { addToCart, countCartTotal, countCartProducts, setButtons } from '../cart/cartControls';
import './products.css';
import { goTo } from '../../router/router';

export function drawProducts(state: ProductsData[], cartState: CartData[]): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
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
            addToCart(buyButton, productItem.id, state, cartState);
            countCartProducts(cartState);
            countCartTotal(cartState);
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

export function drawNoMatch(): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    productsContainer.innerHTML = '';

    const noMatchEl = createEl('no-match', 'div');
    noMatchEl.textContent = `NO MATCHES`;

    appendEl(productsContainer, noMatchEl);
}
