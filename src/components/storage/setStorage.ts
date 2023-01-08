/* import ------------------------------------------------- */

import { CartData, PromoData } from '../../types/types';
import { cartState, promoState } from '../app/initApp';

export function setStorage(name: string, state: CartData[] | PromoData[]): void {
    localStorage.setItem(name, JSON.stringify(state));
}

/* function to set local storage ------------------------------------------------- */

window.addEventListener('beforeunload', () => {
    setStorage('cartState', cartState);
    setStorage('promoState', promoState);
});
