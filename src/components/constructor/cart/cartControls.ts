import { CartData, ProductsData, PromoData, checkedQuerySelector } from '../../../types/exports';

export function addToCart(
    button: HTMLElement,
    product: HTMLElement,
    state: ProductsData[],
    cartState: CartData[]
): void {
    for (const item of state) {
        if (item.id === +product.id) {
            const cartItem = Object.assign(item, { amount: 1 });
            cartState.push(cartItem);
            button.textContent = 'Added!';
            button.classList.add('product__button_added');
        }
    }
}

export function deleteFromCart(product: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +product.id && item.amount === 0) {
            cartState.splice(cartState.indexOf(item), 1);
        }
    }
}

export function checkEmptyCart(contaiter: HTMLElement, cartState: CartData[]): void {
    if (cartState.length === 0) {
        contaiter.innerHTML = 'NO PRODUCTS';
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

export function setButtons(parent: HTMLElement, button: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +parent.id) {
            button.classList.add('product__button_added');
            button.textContent = 'Added';
        }
    }
}

export function setLinedSum(sumItem: HTMLElement, selector: string, promoState: PromoData[]): void {
    promoState.length ? sumItem.classList.add(selector) : sumItem.classList.remove(selector);
}
