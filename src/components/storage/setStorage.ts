import { CartData } from '../../types/exports';

export function setStorage(cartState: CartData[]) {
    localStorage.setItem('cartState', JSON.stringify(cartState));
}
