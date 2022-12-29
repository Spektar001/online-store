import { setFilters } from './filters';
import { ProductsData, CartData, QueryData, checkedQuerySelector } from '../../../types/exports';
import { createEl, appendEl } from '../elements/elements';
import './filters.css';

export function drawFilters(state: ProductsData[], cartState: CartData[], queryState: QueryData): void {
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
        queryState.category,
        'category',
        state,
        queryState
    );

    filtered = new Set(brands);
    getFilteredKeys(
        filtered,
        'filter__list',
        'filter__item',
        'filter__checkbox filter__checkbox_brand',
        queryState.brand,
        'brand',
        state,
        queryState
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
        max,
        'minPrice',
        'maxPrice',
        state,
        queryState
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
        max,
        'minDisc',
        'maxDisc',
        state,
        queryState
    );
}

function getFilteredKeys(
    data: Set<string>,
    listSelector: string,
    itemSelector: string,
    checkboxSelector: string,
    checboxArr: string[],
    group: string,
    state: ProductsData[],
    queryState: QueryData
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

        for (const category of queryState.category) {
            if (item === category) filterCheckbox.checked = true;
        }

        for (const brand of queryState.brand) {
            if (item === brand) filterCheckbox.checked = true;
        }

        filterCheckbox.addEventListener('change', () => {
            setCheckboxSearchParams(checboxArr, filterCheckbox, group);
            setFilters(state, queryState);
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
    max: number,
    minLimit: string,
    maxLimit: string,
    state: ProductsData[],
    queryState: QueryData
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

    setSliderSearchParams(inputsRange1, inputsRange2, minLimit, maxLimit, state, queryState);
    slideOne();
    slideTwo();
}

function fillColor(input1: HTMLInputElement, input2: HTMLInputElement, sliderBar: HTMLElement): void {
    const percent1 = (+input1.value / +input1.max) * 100;
    const percent2 = (+input2.value / +input1.max) * 100;
    sliderBar.style.background = `linear-gradient(to right, white 0% , #F67280 ${percent1}% , #F67280 ${percent2}%, white 100%)`;
}

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

function setCheckboxSearchParams(checboxArr: string[], checkboxItem: HTMLInputElement, group: string): void {
    const url = new URL(window.location.href);
    if (checkboxItem.checked) {
        if (!checboxArr.includes(checkboxItem.id) && checboxArr.length) {
            checboxArr.push(checkboxItem.id);
        } else if (!checboxArr.length) {
            checboxArr.push(checkboxItem.id);
        } else if (checboxArr.includes(checkboxItem.id)) {
            console.log('СONTAINS!');
            checboxArr.splice(checboxArr.indexOf(checkboxItem.id), 1);
        }
        console.log(checboxArr);
    } else if (!checkboxItem.checked) {
        checboxArr.splice(checboxArr.indexOf(checkboxItem.id), 1);
        console.log(checboxArr);
    }
    checboxArr.length ? url.searchParams.set(group, `${checboxArr.join('-')}`) : url.searchParams.delete(group);
    window.history.pushState(url.search, '', url);
}

function setSliderSearchParams(
    sliderInputMin: HTMLInputElement,
    sliderInputMax: HTMLInputElement,
    groupMin: string,
    groupMax: string,
    state: ProductsData[],
    queryState: QueryData
): void {
    sliderInputMin.addEventListener('change', () => {
        const url = new URL(window.location.href);
        groupMin === 'minPrice'
            ? (queryState.minPrice = sliderInputMin.value)
            : (queryState.minDisc = sliderInputMin.value);
        sliderInputMin.value !== sliderInputMin.min
            ? url.searchParams.set(groupMin, `${sliderInputMin.value}`)
            : url.searchParams.delete(groupMin);
        window.history.pushState(url.search, '', url);
        setFilters(state, queryState);
    });

    sliderInputMax.addEventListener('change', () => {
        const url = new URL(window.location.href);
        groupMax === 'maxPrice'
            ? (queryState.maxPrice = sliderInputMax.value)
            : (queryState.maxDisc = sliderInputMax.value);
        sliderInputMax.value !== sliderInputMax.max
            ? url.searchParams.set(groupMax, `${sliderInputMax.value}`)
            : url.searchParams.delete(groupMax);
        window.history.pushState(url.search, '', url);
        setFilters(state, queryState);
    });
}
