import { ProductsData, QueryData } from '../../../types/exports';
import { getMaxPrice, getMinPrice, getMaxDiscount, getMinDiscount } from './drawFilters';

export function checkStoreQueryParams(state: ProductsData[], queryState: QueryData) {
    const url = new URL(window.location.href);
    const str = url.search;

    return (
        checkMinMax(str, state, queryState) &&
        checkEmptyStr(str, state, queryState) &&
        checkSort(queryState) &&
        checkEqualsAnds(url, str)
    );
}

function checkEmptyStr(str: string, state: ProductsData[], queryState: QueryData): boolean {
    const categories: string[] = [];
    const brands: string[] = [];

    for (let i = 0; i < state.length; i += 1) {
        categories.push(state[i].category);
        brands.push(state[i].brand.split(' ').join('+').replace('&', '%26'));
    }

    for (const item of Object.keys(queryState)) {
        str = str.replace(item, '');
    }

    for (const item of Object.keys(queryState)) {
        str = str.replace(item, '');
    }

    for (const item of categories) {
        str = str.replace(item, '');
    }

    for (const item of brands) {
        str = str.replace(item, '');
    }

    str = str
        .replace(/[&?+=-]/g, '')
        .replace(/Min|Max|Price|Discount|column|row/g, '')
        .replace(/[0-9]/g, '');

    return !str.length;
}

function checkMinMax(str: string, state: ProductsData[], queryState: QueryData): boolean {
    let result = true;

    if (str.lastIndexOf('maxPrice') !== -1 && queryState.maxPrice === '') result = false;

    if (queryState.maxPrice) {
        if (+queryState.maxPrice > getMaxPrice(state) || +queryState.maxPrice < getMinPrice(state)) {
            result = false;
        }
    }

    if (str.lastIndexOf('minPrice') !== -1 && queryState.minPrice === '') result = false;

    if (queryState.minPrice) {
        if (+queryState.minPrice > getMaxPrice(state) || +queryState.minPrice < getMinPrice(state)) {
            result = false;
        }
    }

    if (queryState.maxPrice && queryState.minPrice) {
        if (+queryState.minPrice > +queryState.maxPrice) result = false;
    }

    if (str.lastIndexOf('maxDisc') !== -1 && queryState.maxDisc === '') result = false;

    if (queryState.maxDisc) {
        if (
            +queryState.maxDisc > Math.ceil(getMaxDiscount(state)) ||
            +queryState.maxDisc < Math.floor(getMinDiscount(state))
        ) {
            result = false;
        }
    }

    if (str.lastIndexOf('minDisc') !== -1 && queryState.minDisc === '') result = false;

    if (queryState.minDisc) {
        if (
            +queryState.minDisc > Math.ceil(getMaxDiscount(state)) ||
            +queryState.minDisc < Math.floor(getMinDiscount(state))
        ) {
            result = false;
        }
    }

    if (queryState.maxDisc && queryState.minDisc) {
        if (+queryState.minDisc > +queryState.maxDisc) result = false;
    }

    return result;
}

function checkSort(queryState: QueryData): boolean {
    let result = true;

    if (queryState.sortBy) {
        if (
            queryState.sortBy.toString() !== 'Min Price' &&
            queryState.sortBy.toString() !== 'Max Price' &&
            queryState.sortBy.toString() !== 'Min Discount' &&
            queryState.sortBy.toString() !== 'Max Discount'
        )
            result = false;
    }

    return result;
}

function checkEqualsAnds(url: URL, str: string): boolean {
    let result = true;

    if (url.search && str.indexOf('=') === -1) result = false;

    const equallyAmount = str.split('=').length;
    const andAmount = str.split('&').length;

    if (url.search && equallyAmount - 1 !== andAmount) result = false;

    if (
        url.search &&
        (str.indexOf('=') === 0 || str[str.length - 1] === '=' || str.indexOf('&') === 0 || str[str.length - 1] === '&')
    )
        result = false;

    return result;
}
