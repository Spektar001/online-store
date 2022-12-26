import { setFilter } from './filters';
import { ProductsData, CartData, checkedQuerySelector } from '../../../types/exports';
import { createEl, appendEl } from '../elements/elements';
import './filters.css';

export function drawFilters(state: ProductsData[], cartState: CartData[]): void {
    const categories: string[] = [];
    const brands: string[] = [];
    let filtered: Set<string>;
    let min: number;
    let max: number;

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

    min = getMinPrice(state);
    max = getMaxPrice(state);

    drawDoubleSlider(
        'values__container_min min_price__value',
        'values__container_max max_price__value',
        'inputs__slider_track price_track',
        'inputs__slider_1 price__slider_1',
        'inputs__slider_2 price__slider_2',
        min,
        max
    );

    min = getMinDiscount(state);
    max = getMaxDiscount(state);

    drawDoubleSlider(
        'values__container_min min_discount__value',
        'values__container_max max_discount__value',
        'inputs__slider_track discount_track',
        'inputs__slider_1 discount__slider_1',
        'inputs__slider_2 discount__slider_2',
        min,
        max
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

function drawDoubleSlider(
    minValTextSelector: string,
    maxValTextSelector: string,
    sliderBarSelector: string,
    inputSelector1: string,
    inputSelector2: string,
    min: number,
    max: number
): void {
    const filtersContainer = checkedQuerySelector(document, '.products-page__container_left');
    const sliderWrapper = createEl('slider__wrapper', 'div');
    sliderWrapper.innerHTML = '';

    const sliderContainer = createEl('slider__container', 'div');
    const valuesContainer = createEl('values__container', 'div');
    const valuesMin = createEl(minValTextSelector, 'span');
    const valuesDivider = createEl('values__container_divider', 'div');
    const valuesMax = createEl(maxValTextSelector, 'span');
    const inputsContainer = createEl('inputs__container', 'div');
    const inputsSlider = createEl(sliderBarSelector, 'div');
    const inputsRange1 = <HTMLInputElement>createEl(inputSelector1, 'input');
    const inputsRange2 = <HTMLInputElement>createEl(inputSelector2, 'input');

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

    valuesDivider.textContent = '-';
    inputsRange1.type = 'range';
    inputsRange2.type = 'range';
    inputsRange1.min = `${Math.floor(min)}`;
    inputsRange1.max = `${Math.ceil(max)}`;
    inputsRange2.min = `${Math.floor(min)}`;
    inputsRange2.max = `${Math.ceil(max)}`;
    inputsRange1.value = `${Math.floor(min)}`;
    inputsRange2.value = `${Math.ceil(max)}`;

    const minGap = 0;

    function slideOne() {
        if (parseInt(inputsRange2.value) - parseInt(inputsRange1.value) <= minGap) {
            inputsRange1.value = `${parseInt(inputsRange2.value) - minGap}`;
        }
        valuesMin.textContent = inputsRange1.value;
        fillColor(inputsRange1, inputsRange2, inputsSlider);
    }
    function slideTwo() {
        if (parseInt(inputsRange2.value) - parseInt(inputsRange1.value) <= minGap) {
            inputsRange2.value = `${parseInt(inputsRange1.value) + minGap}`;
        }
        valuesMax.textContent = inputsRange2.value;
        fillColor(inputsRange1, inputsRange2, inputsSlider);
    }

    fillColor(inputsRange1, inputsRange2, inputsSlider);

    inputsRange1.addEventListener('input', () => {
        slideOne();
    });

    inputsRange2.addEventListener('input', () => {
        slideTwo();
    });

    slideOne();
    slideTwo();
}

function fillColor(input1: HTMLInputElement, input2: HTMLInputElement, sliderBar: HTMLElement): void {
    const percent1 = (+input1.value / +input1.max) * 100;
    const percent2 = (+input2.value / +input1.max) * 100;
    sliderBar.style.background = `linear-gradient(to right, white 0% , #F67280 ${percent1}% , #F67280 ${percent2}%, white 100%)`;
}

// export function setInputValues(
//     minValTextSelector: string,
//     maxValTextSelector: string,
//     inputSelector1: string,
//     inputSelector2: string,
//     sliderBarSelector: string,
//     min: number,
//     max: number
// ): void {
//     const minVal = checkedQuerySelector(document, minValTextSelector);
//     const maxVal = checkedQuerySelector(document, maxValTextSelector);
//     const input1 = <HTMLInputElement>checkedQuerySelector(document, inputSelector1);
//     const input2 = <HTMLInputElement>checkedQuerySelector(document, inputSelector2);
//     const sliderBar = checkedQuerySelector(document, sliderBarSelector);

//     input1.value = `${min}`;
//     input2.value = `${max}`;
//     minVal.textContent = `${min}`;
//     maxVal.textContent = `${max}`;

//     fillColor(input1, input2, sliderBar);
// }

export function getMinPrice(state: ProductsData[]): number {
    return state.reduce((min, item) => (item.price < min ? item.price : min), state[0].price);
}

export function getMaxPrice(state: ProductsData[]): number {
    return state.reduce((max, item) => (item.price > max ? item.price : max), state[0].price);
}

export function getMinDiscount(state: ProductsData[]): number {
    return state.reduce(
        (min, item) => (item.discountPercentage < min ? item.discountPercentage : min),
        state[0].discountPercentage
    );
}

export function getMaxDiscount(state: ProductsData[]): number {
    return state.reduce(
        (max, item) => (item.discountPercentage > max ? item.discountPercentage : max),
        state[0].discountPercentage
    );
}
