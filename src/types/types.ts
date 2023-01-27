/* imports ------------------------------------------------- */

import Route from 'route-parser';

/* interfaces ------------------------------------------------- */

export interface Products {
    limit: number;
    products: ProductsData[];
    skip: number;
    total: number;
}

export interface ProductsData {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export interface CartData extends ProductsData {
    amount: number;
}

export interface PromoData {
    name: string;
    discount: number;
}

export interface QueryData {
    category: string[];
    brand: string[];
    minPrice: string;
    maxPrice: string;
    minDisc: string;
    maxDisc: string;
    find: string;
    sortBy: string;
    view: string;
    page: string;
    limitPerPage: string;
}

export interface Paths {
    [k: string]: string;
}

export interface Routes {
    [k: string]: Route;
}

/* functions ------------------------------------------------- */

export function checkedQuerySelector(parent: Element | Document, selector: string): HTMLElement {
    const el = parent.querySelector(selector);
    if (!el) {
        throw new Error(`Selector ${selector} didn't match any elements.`);
    }
    return el as HTMLElement;
}

export function createEl(classList: string, element = 'div'): HTMLElement {
    const el = document.createElement(element);
    el.classList.add(...classList.split(' '));
    return el;
}

export function appendEl(parent: HTMLElement, element: HTMLElement): void {
    parent.append(element);
}
