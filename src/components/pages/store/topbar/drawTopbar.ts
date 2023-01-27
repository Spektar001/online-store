/* imports ------------------------------------------------- */

import { ProductsData, QueryData, checkedQuerySelector, appendEl, createEl } from '../../../../types/types';
import { cartState } from '../../../app/initApp';
import { setFilters } from '../filters/setFilters';
import './topbar.css';

/* function to draw topbar ------------------------------------------------- */

export function drawTopbar(state: ProductsData[], queryState: QueryData): void {
    const topbarContainer = checkedQuerySelector(document, '.products__topbar');
    const sortListContainer = createEl('sort__contaiter', 'div');
    const sortListButton = createEl('sort__list_button', 'button');
    const sortSearch = <HTMLInputElement>createEl('sort__search', 'input');
    const viewButtonsContainer = createEl('products__view', 'div');
    const productsViewButton1 = createEl('view__button_1', 'button');
    const productsViewButton2 = createEl('view__button_2', 'button');

    if (queryState.view === 'column') {
        productsViewButton2.classList.add('view__button_selected');
        productsViewButton1.classList.remove('view__button_selected');
    } else {
        productsViewButton2.classList.remove('view__button_selected');
        productsViewButton1.classList.add('view__button_selected');
    }

    appendEl(sortListContainer, sortListButton);
    appendEl(sortListContainer, sortListButton);

    appendEl(viewButtonsContainer, productsViewButton1);
    appendEl(viewButtonsContainer, productsViewButton2);

    setSortList(state, queryState, sortListContainer, sortListButton);

    sortListButton.textContent =
        queryState.sortBy &&
        (queryState.sortBy === 'Min Price' ||
            queryState.sortBy === 'Max Price' ||
            queryState.sortBy === 'Min Discount' ||
            queryState.sortBy === 'Max Discount')
            ? `Sorted by ${queryState.sortBy}`
            : 'Sort by...';
    sortSearch.type = 'search';
    sortSearch.placeholder = 'Type to search products...';
    productsViewButton1.style.backgroundImage = 'url(../../../assets/circled.png)';
    productsViewButton2.style.backgroundImage = 'url(../../../assets/burger.png)';
    sortSearch.value = queryState.find ? queryState.find : '';

    sortSearch.addEventListener('input', () => {
        setFindSearchParams(sortSearch, state, queryState);
    });

    appendEl(topbarContainer, sortListContainer);
    appendEl(topbarContainer, sortSearch);
    appendEl(topbarContainer, viewButtonsContainer);

    productsViewButton1.addEventListener('click', () => {
        setView(productsViewButton1, productsViewButton2, 'row', state, queryState);
        setFilters(state, cartState, queryState);
    });

    productsViewButton2.addEventListener('click', () => {
        setView(productsViewButton1, productsViewButton2, 'column', state, queryState);
        setFilters(state, cartState, queryState);
    });
}

/* function to set sorting parameters ------------------------------------------------- */

function setSortList(
    state: ProductsData[],
    queryState: QueryData,
    sortListContainer: HTMLElement,
    sortListButton: HTMLElement
): void {
    const sortListItemsVals = ['Min Price', 'Max Price', 'Min Discount', 'Max Discount'];
    const sortList = createEl('sort__list sort__list_hidden', 'ul');

    for (const item of sortListItemsVals) {
        const sortListItem = createEl('sort__list_item', 'li');

        sortListItem.textContent = item;
        sortListItem.addEventListener('click', () => {
            const url = new URL(window.location.href);

            sortListButton.textContent = `Sorted by ${item}`;
            queryState.sortBy = item;
            url.searchParams.set('sortBy', item);
            window.history.pushState(url.search, '', url);

            setFilters(state, cartState, queryState);
        });
        appendEl(sortList, sortListItem);
    }

    toggleSortList(sortList, sortListButton, 'sort__list_hidden');

    appendEl(sortListContainer, sortList);
}

/* function to switch sorting parameters ------------------------------------------------- */

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

/* function to set find parameters ------------------------------------------------- */

function setFindSearchParams(searchInput: HTMLInputElement, state: ProductsData[], queryState: QueryData): void {
    const url = new URL(window.location.href);
    queryState.find = searchInput.value;
    searchInput.value !== '' ? url.searchParams.set('find', `${searchInput.value}`) : url.searchParams.delete('find');
    window.history.pushState(url.search, '', url);
    setFilters(state, cartState, queryState);
}

/* function to set view parameters ------------------------------------------------- */

function setView(
    button1: HTMLElement,
    button2: HTMLElement,
    view: string,
    state: ProductsData[],
    queryState: QueryData
): void {
    button1.classList.toggle('view__button_selected');
    button2.classList.toggle('view__button_selected');

    const url = new URL(window.location.href);

    url.searchParams.set('view', view);
    queryState.view = view;
    window.history.pushState(url.search, '', url);

    setFilters(state, cartState, queryState);
}
