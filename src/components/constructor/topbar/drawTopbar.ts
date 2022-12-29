import { createEl, appendEl } from '../elements/elements';
import { ProductsData, QueryData, checkedQuerySelector } from '../../../types/exports';
import './topbar.css';
import { setFilters } from '../filters/filters';

export function drawTopbar(state: ProductsData[], queryState: QueryData): void {
    const topbarContainer = checkedQuerySelector(document, '.products__topbar');
    const sortListContainer = createEl('sort__contaiter', 'div');
    const sortListButton = createEl('sort__list_button', 'button');
    const sortSearch = <HTMLInputElement>createEl('sort__search', 'input');
    const viewButtonsContainer = createEl('products__view', 'div');
    const productsViewButton1 = createEl('view__button_1', 'button');
    const productsViewButton2 = createEl('view__button_2', 'button');

    appendEl(sortListContainer, sortListButton);
    appendEl(sortListContainer, sortListButton);

    appendEl(viewButtonsContainer, productsViewButton1);
    appendEl(viewButtonsContainer, productsViewButton2);

    setSortList(sortListContainer, sortListButton);

    sortListButton.textContent = 'Sort by...';
    sortSearch.type = 'search';
    sortSearch.placeholder = 'Type to search products...';
    productsViewButton1.textContent = '3';
    productsViewButton2.textContent = '4';

    sortSearch.value = queryState.find ? queryState.find : '';

    sortSearch.addEventListener('input', () => {
        setFindSearchParams(sortSearch, state, queryState);
    });

    appendEl(topbarContainer, sortListContainer);
    appendEl(topbarContainer, sortSearch);
    appendEl(topbarContainer, viewButtonsContainer);
}

function setSortList(sortListContainer: HTMLElement, sortListButton: HTMLElement): void {
    const sortListItemsVals = ['Min Price', 'Max Price', 'Min Discount', 'Max Discount'];
    const sortList = createEl('sort__list sort__list_hidden', 'ul');

    for (const item of sortListItemsVals) {
        const sortListItem = createEl('sort__list_item', 'li');
        sortListItem.textContent = item;
        sortListItem.addEventListener('click', () => {
            sortListButton.textContent = `Sorted by ${item}`;
        });
        appendEl(sortList, sortListItem);
    }

    toggleSortList(sortList, sortListButton, 'sort__list_hidden');

    appendEl(sortListContainer, sortList);
}

function toggleSortList(sortList: HTMLElement, sortListButton: HTMLElement, selector: string) {
    document.addEventListener('click', (evt: Event) => {
        const target = evt.target;
        if (target === sortListButton) {
            sortList.classList.toggle(selector);
        } else if (target !== sortListButton) {
            sortList.classList.add(selector);
        }
    });
}

function setFindSearchParams(searchInput: HTMLInputElement, state: ProductsData[], queryState: QueryData): void {
    const url = new URL(window.location.href);
    queryState.find = searchInput.value;
    searchInput.value !== '' ? url.searchParams.set('find', `${searchInput.value}`) : url.searchParams.delete('find');
    window.history.pushState(url.search, '', url);
    setFilters(state, queryState);
}
