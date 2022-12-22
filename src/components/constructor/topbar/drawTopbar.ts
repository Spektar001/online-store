import { createEl, appendEl } from '../elements/elements';
import { checkedQuerySelector } from '../../../types/exports';
import './topbar.css';

const details = <HTMLElement>document.querySelector('.details');
const bgLayer = <HTMLElement>document.querySelector('.bg_layer');
const btnConfirm = <HTMLElement>document.querySelector('.btn-confirm');

export function drawTopbar() {
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

    appendEl(topbarContainer, sortListContainer);
    appendEl(topbarContainer, sortSearch);
    appendEl(topbarContainer, viewButtonsContainer);

    productsViewButton1.addEventListener('click', (e) => {
        e.preventDefault();
        details.classList.remove('close');
        bgLayer.classList.remove('close');
    });
    btnConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        details.classList.add('close');
        bgLayer.classList.add('close');
    });

    document.addEventListener('click', (e) => {
      const targetDocument = <HTMLDivElement>e.target;
      const its_details = targetDocument == details || details.contains(targetDocument);
        const its_productsViewButton1 = targetDocument == productsViewButton1;
        const details_is_active = details.classList.contains('details');
        if (!its_details && !its_productsViewButton1 && details_is_active) {
            details.classList.add('close');
            setTimeout(() => {
                bgLayer.classList.add('close');
            }, 500);
        }
    });
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
