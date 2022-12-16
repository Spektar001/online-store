import { setFilter } from './filters';
import { ProductsData, checkedQuerySelector } from '../../../types/exports';
import { createEl, appendEl } from '../elements/elements';
import './filters.css';

export function drawFilters(data: ProductsData[], state: ProductsData[], curState: ProductsData[]): void {
    const categories: string[] = [];
    const brands: string[] = [];
    let filtered: Set<string>;

    for (let i = 0; i < data.length; i += 1) {
        categories.push(data[i].category);
        brands.push(data[i].brand);
    }

    filtered = new Set(categories);
    getFilteredKeys(filtered, 'filter__list', 'filter__item', state, curState);

    filtered = new Set(brands);
    getFilteredKeys(filtered, 'filter__list', 'filter__item', state, curState);
}

function getFilteredKeys(
    data: Set<string>,
    listSelector: string,
    itemSelector: string,
    state: ProductsData[],
    curState: ProductsData[]
): void {
    const filtered = new Set(data);

    const filtersContainer = checkedQuerySelector(document, '.products-page__container_left');
    const filterList = createEl(listSelector, 'ul');

    for (const item of filtered) {
        const filterItem = createEl(itemSelector, 'li');
        const filterCheckbox = <HTMLInputElement>createEl('filter__checkbox', 'input');
        const filterLabel = <HTMLLabelElement>createEl('filter__label', 'label');

        filterCheckbox.type = 'checkbox';
        filterCheckbox.id = item;
        filterLabel.textContent = item;
        filterLabel.htmlFor = item;

        filterCheckbox.addEventListener('change', () => {
            setFilter(filterCheckbox, state, curState);
            curState = setFilter(filterCheckbox, state, curState);
        });

        appendEl(filterItem, filterCheckbox);
        appendEl(filterItem, filterLabel);

        appendEl(filterList, filterItem);
    }

    appendEl(filtersContainer, filterList);
}
