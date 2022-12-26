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

    drawDoubleSlider(state);
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

function drawDoubleSlider(state: ProductsData[]): void {
    const filtersContainer = checkedQuerySelector(document, '.products-page__container_left');

    const sliderWrapper = createEl('slider__wrapper', 'div');
    const sliderContainer = createEl('slider__container', 'div');
    const valuesContainer = createEl('values__container', 'div');
    const valuesMin = createEl('values__container_min', 'span');
    const valuesDivider = createEl('values__container_divider', 'div');
    const valuesMax = createEl('values__container_max', 'div');
    const inputsContainer = createEl('inputs__container', 'div');
    const inputsSlider = createEl('inputs__slider_track', 'div');
    const inputsRange1 = <HTMLInputElement>createEl('inputs__slider_1', 'input');
    const inputsRange2 = <HTMLInputElement>createEl('inputs__slider_2', 'input');

    appendEl(valuesContainer, valuesMin);
    appendEl(valuesContainer, valuesDivider);
    appendEl(valuesContainer, valuesMax);

    appendEl(inputsContainer, inputsSlider);
    appendEl(inputsContainer, inputsRange1);
    appendEl(inputsContainer, inputsRange2);

    appendEl(sliderContainer, valuesContainer);
    appendEl(sliderContainer, inputsContainer);

    appendEl(sliderWrapper, sliderContainer);
    appendEl(filtersContainer, sliderWrapper);

    console.log(state);

    const min: number = state.reduce((min, item) => (item.price < min ? item.price : min), state[0].price);
    const max: number = state.reduce((max, item) => (item.price > max ? item.price : max), state[0].price);
    console.log(min, max);

    valuesDivider.textContent = '-';
    inputsRange1.type = 'range';
    inputsRange2.type = 'range';
    inputsRange1.min = `${min}`;
    inputsRange1.max = `${max}`;
    inputsRange2.min = `${min}`;
    inputsRange2.max = `${max}`;
    inputsRange1.value = `${min}`;
    inputsRange2.value = `${max}`;

    const minGap = 0;

    function slideOne() {
        if (parseInt(inputsRange2.value) - parseInt(inputsRange1.value) <= minGap) {
            inputsRange1.value = `${parseInt(inputsRange2.value) - minGap}`;
        }
        valuesMin.textContent = inputsRange1.value;
        fillColor();
    }
    function slideTwo() {
        if (parseInt(inputsRange2.value) - parseInt(inputsRange1.value) <= minGap) {
            inputsRange2.value = `${parseInt(inputsRange1.value) + minGap}`;
        }
        valuesMax.textContent = inputsRange2.value;
        fillColor();
    }
    function fillColor() {
        const percent1 = (+inputsRange1.value / +inputsRange1.max) * 100;
        const percent2 = (+inputsRange2.value / +inputsRange1.max) * 100;
        inputsSlider.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #F67280 ${percent1}% , #F67280 ${percent2}%, #dadae5 ${percent2}%)`;
    }

    inputsRange1.addEventListener('input', () => {
        slideOne();
    });

    inputsRange2.addEventListener('input', () => {
        slideTwo();
    });

    slideOne();
    slideTwo();
}
