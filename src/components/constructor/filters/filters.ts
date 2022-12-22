import { drawProducts, drawNoMatch } from '../products/drawProducts';
import { ProductsData, CartData } from '../../../types/exports';

let filterState: ProductsData[] = [];
let filteredCategory: ProductsData[] = [];
let filteredBrands: ProductsData[] = [];
let filtered: ProductsData[] = [];

export function setFilter(checkbox: HTMLInputElement, state: ProductsData[], cartState: CartData[]) {
    if (checkbox.checked && checkbox.classList.contains('filter__checkbox_category')) {
        filtered = state.filter((item) => item.category === checkbox.id);
        filteredCategory = filteredCategory.concat(filtered);
    } else if (!checkbox.checked && checkbox.classList.contains('filter__checkbox_category')) {
        filtered = state.filter((item) => item.category === checkbox.id);
        filteredCategory = filteredCategory.filter((item) => !filtered.includes(item));
    }

    if (checkbox.checked && checkbox.classList.contains('filter__checkbox_brand')) {
        filtered = state.filter((item) => item.brand === checkbox.id);
        filteredBrands = filteredBrands.concat(filtered);
    } else if (!checkbox.checked && checkbox.classList.contains('filter__checkbox_brand')) {
        filtered = state.filter((item) => item.brand === checkbox.id);
        filteredBrands = filteredBrands.filter((item) => !filtered.includes(item));
    }

    filterState = filteredCategory.concat(filteredBrands);

    const checkboxes = document.querySelectorAll('.filter__checkbox');
    const selectedCboxes = Array.prototype.slice.call(checkboxes).filter((item) => item.checked === true);

    if (selectedCboxes.length === 0 || selectedCboxes.length === checkboxes.length) {
        drawProducts(state, state, cartState);
    } else if (selectedCboxes.length === 1) {
        drawProducts(filterState, state, cartState);
    } else if (selectedCboxes.length > 1) {
        if (getSameItems(filterState).length !== 0) {
            drawProducts(getSameItems(filterState), state, cartState);
        } else if (isEqual(filterState, filteredCategory) || isEqual(filterState, filteredBrands)) {
            drawProducts(filterState, state, cartState);
        } else {
            drawNoMatch();
        }
    }
}

function getSameItems(state: ProductsData[]): ProductsData[] {
    const result: ProductsData[] = [];

    for (let i = 0; i < state.length; i++) {
        const item = state[i];
        let counter = 0;
        for (let j = i; j < state.length; j++) {
            if (item === state[j]) {
                counter += 1;
                if (counter === 2) {
                    result.push(item);
                }
            }
        }
    }

    return result;
}

function isEqual(arr1: ProductsData[], arr2: ProductsData[]) {
    return arr1.length === arr2.length && arr1.sort().every((value, index) => value === arr2.sort()[index]);
}
