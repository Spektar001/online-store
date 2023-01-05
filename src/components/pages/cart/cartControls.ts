import { CartData, ProductsData, PromoData, checkedQuerySelector } from '../../../types/types';
import { setStorage } from '../../storage/setStorage';
import { drawEmptyCart } from './drawCart';

export function addToCart(button: HTMLElement, index: string, state: ProductsData[], cartState: CartData[]): void {
    for (const item of state) {
        if (item.id === +index) {
            const cartItem = Object.assign(item, { amount: 1 });
            cartState.push(cartItem);
            button.textContent = 'Remove from cart';
            button.classList.add('product__button_added');
            setStorage('cartState', cartState);
        }
    }
}

export function addToCartAndBuy(button: HTMLElement, state: ProductsData[], cartState: CartData[]): void {
    for (const item of state) {
        if (item.id === +button.id) {
            const cartItem = Object.assign(item, { amount: 1 });
            cartState.push(cartItem);
            setStorage('cartState', cartState);
        }
    }
}

export function removeFromCart(button: HTMLElement, index: string, state: ProductsData[], cartState: CartData[]): void {
    for (const item of state) {
        if (item.id === +index) {
            const cartItem = Object.assign(item, { amount: 0 });
            cartState.splice(cartState.indexOf(cartItem), 1);
            button.textContent = 'Add to card';
            button.classList.remove('product__button_added');
            setStorage('cartState', cartState);
        }
    }
}

export function deleteFromCart(product: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +product.id && item.amount === 0) {
            cartState.splice(cartState.indexOf(item), 1);
            setStorage('cartState', cartState);
        }
    }
}

export function clearCart(cartState: CartData[], promoState: PromoData[]): void {
    cartState.splice(0);
    promoState.splice(0);
    setStorage('cartState', cartState);
    setStorage('promoState', promoState);
}

export function checkEmptyCart(contaiter: HTMLElement, cartState: CartData[]): void {
    if (cartState.length === 0) {
        drawEmptyCart();
    }
}

export function reduceAmount(
    button: HTMLElement,
    selector: string,
    product: HTMLElement,
    amountEl: HTMLElement,
    cartState: CartData[]
): void {
    for (const item of cartState) {
        if (item.id === +product.id) {
            item.amount--;
            amountEl.textContent = `${item.amount}`;

            if (item.amount < item.stock) {
                button.classList.remove(selector);
            }

            setStorage('cartState', cartState);
        }
    }
}

export function increaseAmount(
    button: HTMLElement,
    selector: string,
    product: HTMLElement,
    amountEl: HTMLElement,
    cartState: CartData[]
): void {
    for (const item of cartState) {
        if (item.id === +product.id) {
            item.amount++;
            amountEl.textContent = `${item.amount}`;

            if (item.amount === item.stock) {
                button.classList.add(selector);
            }

            setStorage('cartState', cartState);
        }
    }
}

export function countCartTotal(cartState: CartData[]): number {
    let total = 0;
    const headerTotal = checkedQuerySelector(document, '.header__total-count');

    for (const item of cartState) {
        total += Math.floor(item.price * ((100 - item.discountPercentage) / 100)) * item.amount;
    }

    headerTotal.textContent = `${total}`;
    return total;
}

export function countCartProducts(cartState: CartData[]): number {
    let products = 0;
    const headerProducts = checkedQuerySelector(document, '.header__cart-count');

    for (const item of cartState) {
        products += item.amount;
    }

    headerProducts.textContent = `${products}`;
    return products;
}

export function addPromoItem(input: HTMLInputElement, promocodes: PromoData[], promoState: PromoData[]): boolean {
    for (const promo of promocodes) {
        if (input.value === promo.name && promoState.every((item) => item.name !== input.value)) {
            promoState.push(promo);
            input.value = '';
            setStorage('promoState', promoState);
            return true;
        } else if (input.value === promo.name && promoState.findIndex((item) => item.name === input.value) !== -1) {
            input.style.color = 'red';
            input.value = 'CODE IS ALLREADY USED!';
            setTimeout(() => {
                input.style.color = 'black';
                input.value = '';
            }, 1500);
        }
    }
    return false;
}

export function removePromoItem(button: HTMLElement, promoState: PromoData[]): void {
    for (const item of promoState) {
        if (item.name === button.id) {
            promoState.splice(promoState.indexOf(item), 1);
            setStorage('promoState', promoState);
        }
    }
}

function countPromoDiscount(promoState: PromoData[]): number {
    let discount = 0;

    for (const item of promoState) {
        discount += item.discount;
    }

    return discount;
}

export function countTotalSum(cartState: CartData[], promoState: PromoData[]): string {
    return countPromoDiscount(promoState) === 0
        ? ''
        : `${Math.floor((1 - countPromoDiscount(promoState)) * countCartTotal(cartState))}€`;
}

export function setButtons(index: string, button: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +index) {
            button.classList.add('product__button_added');
            button.textContent = 'Remove from cart';
        }
    }
}

export function setLinedSum(sumItem: HTMLElement, selector: string, promoState: PromoData[]): void {
    promoState.length ? sumItem.classList.add(selector) : sumItem.classList.remove(selector);
}
