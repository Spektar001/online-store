import { CartData, ProductsData, checkedQuerySelector } from '../../../types/exports';

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
            console.log(cartState);
            button.textContent = 'Added!';
            button.classList.add('product__button_added');
        }
    }
}

export function deleteFromCart(product: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +product.id && item.amount === 0) {
            cartState.splice(cartState.indexOf(item), 1);
            console.log(cartState);
        }
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

export function setButtons(parent: HTMLElement, button: HTMLElement, cartState: CartData[]): void {
    for (const item of cartState) {
        if (item.id === +parent.id) {
            button.classList.add('product__button_added');
            button.textContent = 'Added';
        }
    }
}
