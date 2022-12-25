import { setFilter } from './filters';
import { ProductsData, CartData, checkedQuerySelector } from '../../../types/exports';
import { createEl, appendEl } from '../elements/elements';
import './filters.css';

export function drawFilters(state: ProductsData[], cartState: CartData[]): void {
    const categories: string[] = [];
    const brands: string[] = [];
    let filtered: Set<string>;

    for (let i = 0; i < state.length; i += 1) {
        categories.push(state[i].category);
        brands.push(state[i].brand);
    }

    filtered = new Set(categories);
    getFilteredKeys(
        filtered,
        'filter__list',
        'filter__item',
        'filter__checkbox filter__checkbox_category',
        state,
        cartState
    );

    filtered = new Set(brands);
    getFilteredKeys(
        filtered,
        'filter__list',
        'filter__item',
        'filter__checkbox filter__checkbox_brand',
        state,
        cartState
    );
}

function getFilteredKeys(
    data: Set<string>,
    listSelector: string,
    itemSelector: string,
    checkboxSelector: string,
    state: ProductsData[],
    cartState: CartData[]
): void {
    const filtered = new Set(data);

    const filtersContainer = checkedQuerySelector(document, '.products-page__container_left');
    const filterList = createEl(listSelector, 'ul');

    for (const item of filtered) {
        const filterItem = createEl(itemSelector, 'li');
        const filterCheckbox = <HTMLInputElement>createEl(checkboxSelector, 'input');
        const filterLabel = <HTMLLabelElement>createEl('filter__label', 'label');

        filterCheckbox.type = 'checkbox';
        filterCheckbox.id = item;
        filterCheckbox.checked = true;
        filterLabel.textContent = item;
        filterLabel.htmlFor = item;

        filterCheckbox.addEventListener('change', () => {
            const url = new URL(window.location.href);
            url.searchParams.append('category', `${filterCheckbox.id}`);
            console.log(url);
            window.history.pushState(url.search, '', url);
            setFilter(filterCheckbox, state, cartState);
        });

        appendEl(filterItem, filterCheckbox);
        appendEl(filterItem, filterLabel);

        appendEl(filterList, filterItem);
    }

    appendEl(filtersContainer, filterList);
}
