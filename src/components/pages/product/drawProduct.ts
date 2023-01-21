/* imports ------------------------------------------------- */

import { showPopUp } from '../popup/popup';
import {
    checkedQuerySelector,
    ProductsData,
    CartData,
    PromoData,
    QueryData,
    appendEl,
    createEl,
} from '../../../types/types';
import {
    addToCart,
    removeFromCart,
    countCartTotal,
    countCartProducts,
    setButtons,
    addToCartAndBuy,
} from '../cart/cartControls';
import { checkImagesForDulicatesByUrl } from '../../utils';
import { goTo } from '../../router/router';
import './product.css';

/* function to draw product ------------------------------------------------- */

export function drawProduct(
    index: string,
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[],
    queryState: QueryData
): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';
    const productPageContainer = createEl('product-page__container', 'div');
    productPageContainer.innerHTML = '';

    const productContainer = createEl('product__container', 'div');
    const productBreadCrumbs = createEl('product-page__bread-crumbs', 'span');
    const productImageContainer = createEl('product-page__container_images', 'div');
    const productDescriptionContainer = createEl('product-page__container_desc', 'div');
    const productImages = createEl('product-page__images', 'div');
    const productMainImage = createEl('product-page__images_main', 'div');
    const productTitle = createEl('product-page__desc_el product-page__title', 'span');
    const productDescription = createEl('product-page__desc_el product-page__description', 'span');
    const productCategory = createEl('product-page__desc_el product-page__category', 'span');
    const productBrand = createEl('product-page__desc_el product-page__brand', 'span');
    const productRating = createEl('product-page__desc_el product-page__rating', 'span');
    const productDiscount = createEl('product-page__desc_el product-page__discount', 'span');
    const productStock = createEl('product-page__desc_el product-page__stock', 'span');
    const productPriceContainer = createEl('product-page__container_price', 'div');
    const productDiscPrice = createEl('product-page__desc_el product-page__price_disc', 'span');
    const productPrice = createEl('product-page__desc_el product-page__price', 'span');
    const productButtonsContainer = createEl('product-page__container_buttons', 'div');
    const productCartButton = createEl('product__button_buy', 'button');
    const productBuyButton = createEl('product__button_buy_now', 'button');

    appendEl(productImageContainer, productMainImage);
    appendEl(productImageContainer, productImages);

    appendEl(productDescriptionContainer, productTitle);
    appendEl(productDescriptionContainer, productDescription);
    appendEl(productDescriptionContainer, productCategory);
    appendEl(productDescriptionContainer, productBrand);
    appendEl(productDescriptionContainer, productRating);
    appendEl(productDescriptionContainer, productDiscount);
    appendEl(productDescriptionContainer, productStock);

    appendEl(productPriceContainer, productDiscPrice);
    appendEl(productPriceContainer, productPrice);

    appendEl(productDescriptionContainer, productPriceContainer);

    appendEl(productButtonsContainer, productCartButton);
    appendEl(productButtonsContainer, productBuyButton);

    appendEl(productDescriptionContainer, productButtonsContainer);

    appendEl(productContainer, productBreadCrumbs);
    appendEl(productContainer, productImageContainer);
    appendEl(productContainer, productDescriptionContainer);

    for (const item of state) {
        if (item.id === +index) {
            productBreadCrumbs.textContent = `Store / ${item.category} / ${item.brand} / ${item.title}`;

            checkImagesForDulicatesByUrl(item.images, productMainImage, productImages);

            productMainImage.style.backgroundImage = `url(${item.images[0]})`;
            productTitle.textContent = item.title;
            productDescription.textContent = item.description;
            productCategory.textContent = `Category: ${item.category}`;
            productBrand.textContent = `Brand: ${item.brand}`;
            productRating.textContent = `Rating: ${item.rating.toFixed(1)}`;
            productDiscount.textContent = `Discount: -${item.discountPercentage}%`;
            productStock.textContent = `In stock: ${item.stock}`;
            productDiscPrice.textContent = `${Math.floor(item.price * ((100 - item.discountPercentage) / 100))}€`;
            productPrice.textContent = `${item.price}€`;
            productCartButton.textContent = `Add to cart`;
            productBuyButton.textContent = `Buy now`;
            productBuyButton.id = `${item.id}`;
        }
    }

    setButtons(index, productCartButton, cartState);

    productCartButton.addEventListener('click', () => {
        if (productCartButton.classList.contains('product__button_added')) {
            removeFromCart(productCartButton, index, cartState);
            countCartProducts(cartState);
            countCartTotal(cartState);
        } else {
            addToCart(productCartButton, index, state, cartState);
            countCartProducts(cartState);
            countCartTotal(cartState);
        }
    });

    appendEl(productPageContainer, productContainer);
    appendEl(main, productPageContainer);

    productBuyButton.addEventListener('click', () => {
        if (!productCartButton.classList.contains('product__button_added')) {
            addToCartAndBuy(productBuyButton, state, cartState);
            countCartProducts(cartState);
            countCartTotal(cartState);
        }

        goTo('/cart');
        showPopUp(productBuyButton, state, cartState, promoState, queryState);
    });
}
