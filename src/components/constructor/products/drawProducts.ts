import { checkedQuerySelector, ProductsData } from '../../../types/exports';
import { appendEl, createEl } from '../elements/elements';
import './products.css';

export function drawProducts(data: ProductsData[]): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    productsContainer.innerHTML = '';

    for (let i = 0; i < data.length; i += 1) {
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

        productRating.textContent = `${data[i].rating.toFixed(1)}`;
        productDiscount.textContent = `-${data[i].discountPercentage}%`;
        productImage.style.backgroundImage = `url(${data[i].thumbnail}`;
        productTitle.textContent = `${data[i].title}`;
        productCategory.textContent = `${data[i].category}`;
        productBrand.textContent = `${data[i].brand}`;
        productDiscPrice.textContent = `${Math.floor(data[i].price * ((100 - data[i].discountPercentage) / 100))}€`;
        productPrice.textContent = `${data[i].price}€`;
        buyButton.textContent = `Add to cart`;

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
