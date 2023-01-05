import { CartData, PromoData } from '../../types/types';
import { cartState, promoState } from '../api/initApp';

export function setStorage(name: string, state: CartData[] | PromoData[]) {
    localStorage.setItem(name, JSON.stringify(state));
}

window.addEventListener('beforeunload', () => {
    setStorage('cartState', cartState);
    setStorage('promoState', promoState);
});
