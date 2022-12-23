import { CartData, PromoData } from '../../types/exports';

export function setStorage(name: string, state: CartData[] | PromoData[]) {
    localStorage.setItem(name, JSON.stringify(state));
}
