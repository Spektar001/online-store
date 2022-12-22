import { createEl, appendEl } from '../elements/elements';
import { ProductsData, CartData, checkedQuerySelector } from '../../../types/exports';
import { addToCart, countCartTotal } from '../cart/cartControls';
import './product.css';

export function drawProduct(product: HTMLElement, data: ProductsData[], cartState: CartData[]): void {
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
    const productCartButton = createEl('product-page__button_cart product-page__button', 'button');
    const productBuyButton = createEl('product-page__button_buy product-page__button', 'button');

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

    for (const item of data) {
        if (item.id === +product.id) {
            productBreadCrumbs.textContent = `Store / ${item.category} / ${item.brand} / ${item.title}`;
            for (let i = 0; i < item.images.length; i++) {
                const productImage = createEl('product-page__image', 'div');
                productImage.style.backgroundImage = `url(${item.images[i]})`;

                productImage.addEventListener('click', () => {
                    productMainImage.style.backgroundImage = productImage.style.backgroundImage;
                });

                appendEl(productImages, productImage);
            }
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
        }
    }

    productCartButton.addEventListener('click', () => {
        addToCart(productCartButton, product, data, cartState);
        countCartTotal(cartState);
    });

    appendEl(productPageContainer, productContainer);
    appendEl(main, productPageContainer);
}
