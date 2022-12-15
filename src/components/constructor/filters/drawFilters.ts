import { ProductsData, checkedQuerySelector } from '../../../types/exports';
import { createEl, appendEl } from '../elements/elements';
import './filters.css';

export function drawFilters(data: ProductsData[]): void {
    const categories: string[] = [];
    const brands: string[] = [];
    let filtered: Set<string>;

    for (let i = 0; i < data.length; i += 1) {
        categories.push(data[i].category);
        brands.push(data[i].brand);
    }

    filtered = new Set(categories);
    getFilteredKeys(filtered, 'filter__list', 'filter__item');

    filtered = new Set(brands);
    getFilteredKeys(filtered, 'filter__list', 'filter__item');
}

function getFilteredKeys(data: Set<string>, listSelector: string, itemSelector: string): void {
    const filtered = new Set(data);

    const filtersContainer = checkedQuerySelector(document, '.products-page__container_left');
    const filterList = createEl(listSelector, 'ul');

    for (const item of filtered) {
        const filterItem = createEl(itemSelector, 'li');

        filterItem.textContent = item;

        appendEl(filterList, filterItem);
        appendEl(filtersContainer, filterList);
    }
}
