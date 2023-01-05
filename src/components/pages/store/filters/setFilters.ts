import { drawProducts, drawNoMatch } from '../products/drawProducts';
import { CartData, checkedQuerySelector, ProductsData, QueryData } from '../../../../types/types';
import { getMaxDiscount, getMaxPrice, getMinDiscount, getMinPrice } from './drawFilters';
import { checkStoreQueryParams } from './checkFilters';

export function setFilters(state: ProductsData[], cartState: CartData[], queryState: QueryData): void {
    let filteredState: ProductsData[] = [];
    const filteredFind: ProductsData[] = [];

    const filteredCategory = getFilteredCategory(state, queryState);
    const filteredBrands = getFilteredBrands(state, queryState);
    const filteredPrice = getFilteredPrice(state, queryState);
    const filteredDiscount = getFilteredDiscount(state, queryState);
    const isExist = getFilteredFind(filteredFind, state, queryState);

    filteredState = filteredState.concat(
        filteredCategory,
        filteredBrands,
        filteredPrice,
        filteredDiscount,
        filteredFind
    );

    filteredState = getFilteredState(
        filteredCategory,
        filteredBrands,
        filteredPrice,
        filteredDiscount,
        filteredFind,
        filteredState,
        isExist,
        queryState
    );

    if (checkStoreQueryParams(state, queryState)) {
        drawFilteredProducts(state, filteredState, cartState, queryState);
    } else {
        filteredState = [];
        drawNoMatch(queryState);
        setTotalProducts(filteredState);
        setDoubleInputsOnCheck(state, state, queryState);
        setProductCount(state, filteredState);
    }
}

function getFilteredCategory(state: ProductsData[], queryState: QueryData): ProductsData[] {
    let filteredCategory: ProductsData[] = [];

    for (const item of queryState.category) {
        const filteredState: ProductsData[] = state.filter((product) => product.category === item);
        filteredCategory = filteredCategory.concat(filteredState);
    }
    return filteredCategory;
}

function getFilteredBrands(state: ProductsData[], queryState: QueryData): ProductsData[] {
    let filteredBrands: ProductsData[] = [];

    for (const item of queryState.brand) {
        const filteredState: ProductsData[] = state.filter((product) => product.brand === item);
        filteredBrands = filteredBrands.concat(filteredState);
    }
    return filteredBrands;
}

function getFilteredPrice(state: ProductsData[], queryState: QueryData): ProductsData[] {
    let filteredPrice: ProductsData[] = [];

    const filteredMinPrice: ProductsData[] = state.filter(
        (product) => product.price >= (+queryState.minPrice || getMinPrice(state))
    );
    const filteredMaxPrice: ProductsData[] = state.filter(
        (product) => product.price <= (+queryState.maxPrice || getMaxPrice(state))
    );

    if (filteredMinPrice.length && filteredMaxPrice.length) {
        filteredPrice = getSameItems(filteredMinPrice.concat(filteredMaxPrice), 2);
    } else if (filteredMinPrice.length && !filteredMaxPrice.length) {
        filteredPrice = filteredMinPrice;
    } else if (!filteredMinPrice.length && filteredMaxPrice.length) {
        filteredPrice = filteredMaxPrice;
    }

    return filteredPrice;
}

function getFilteredDiscount(state: ProductsData[], queryState: QueryData): ProductsData[] {
    let filteredDiscount: ProductsData[] = [];

    const filteredMinDisc: ProductsData[] = state.filter(
        (product) => product.discountPercentage >= (+queryState.minDisc || getMinDiscount(state))
    );
    const filteredMaxDisc: ProductsData[] = state.filter(
        (product) => product.discountPercentage <= (+queryState.maxDisc || getMaxDiscount(state))
    );

    if (filteredMinDisc.length && filteredMaxDisc.length) {
        filteredDiscount = getSameItems(filteredMinDisc.concat(filteredMaxDisc), 2);
    } else if (filteredMinDisc.length && !filteredMaxDisc.length) {
        filteredDiscount = filteredMinDisc;
    } else if (!filteredMinDisc.length && filteredMaxDisc.length) {
        filteredDiscount = filteredMaxDisc;
    }

    return filteredDiscount;
}

function getFilteredFind(filteredFind: ProductsData[], state: ProductsData[], queryState: QueryData): boolean {
    let isExist = false;

    for (const item of state) {
        if (queryState.find) {
            if (item.title.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
                isExist = true;
            } else if (item.category.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
                isExist = true;
            } else if (item.brand.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
                isExist = true;
            } else if (item.description.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
                isExist = true;
            } else if (item.price === +queryState.find) {
                filteredFind.push(item);
                isExist = true;
            } else if (
                Math.floor(item.discountPercentage) === +queryState.find ||
                Math.ceil(item.discountPercentage) === +queryState.find
            ) {
                filteredFind.push(item);
                isExist = true;
            } else if (Math.round(item.rating) === +queryState.find) {
                filteredFind.push(item);
                isExist = true;
            } else if (item.stock === +queryState.find) {
                filteredFind.push(item);
                isExist = true;
            }
        }
    }

    return isExist;
}

function getFilteredState(
    filteredCategory: ProductsData[],
    filteredBrands: ProductsData[],
    filteredPrice: ProductsData[],
    filteredDiscount: ProductsData[],
    filteredFind: ProductsData[],
    filteredState: ProductsData[],
    isExist: boolean,
    queryState: QueryData
): ProductsData[] {
    let nonEmptyArrNum = 0;

    if (filteredCategory.length) nonEmptyArrNum++;
    if (filteredBrands.length) nonEmptyArrNum++;
    if (filteredPrice.length) nonEmptyArrNum++;
    if (filteredDiscount.length) nonEmptyArrNum++;
    if (filteredFind.length) nonEmptyArrNum++;

    if (nonEmptyArrNum === 1) {
        if (filteredCategory.length) {
            if (queryState.find) filteredState = isExist ? filteredCategory : [];
        } else if (filteredBrands.length) {
            if (queryState.find) filteredState = isExist ? filteredBrands : [];
        } else if (filteredFind.length) {
            if (queryState.find) filteredState = isExist ? filteredFind : [];
        } else if (filteredPrice.length) {
            if (queryState.find) filteredState = isExist ? filteredPrice : [];
        } else if (filteredDiscount.length) {
            if (queryState.find) filteredState = isExist ? filteredDiscount : [];
        }

        if (!getSameItems(filteredPrice.concat(filteredDiscount), 2).length) filteredState = [];
    } else if (nonEmptyArrNum > 1 && !filteredFind.length) {
        if (queryState.find) {
            filteredState = isExist ? getSameItems(filteredState, nonEmptyArrNum) : [];
        } else {
            filteredState = getSameItems(filteredState, nonEmptyArrNum);
        }
        if (!getSameItems(filteredPrice.concat(filteredDiscount), 2).length) filteredState = [];
    } else if (nonEmptyArrNum > 1 && filteredFind.length) {
        filteredState = getSameItems(filteredState, nonEmptyArrNum);
        if (!getSameItems(filteredPrice.concat(filteredDiscount), 2).length) filteredState = [];
    }

    return filteredState;
}

function drawFilteredProducts(
    state: ProductsData[],
    filteredState: ProductsData[],
    cartState: CartData[],
    queryState: QueryData
): void {
    if (
        !queryState.find &&
        !queryState.category.length &&
        !queryState.brand.length &&
        !queryState.minPrice &&
        !queryState.maxPrice &&
        !queryState.minDisc &&
        !queryState.maxDisc
    ) {
        setSortParams(state, queryState);
        drawProducts(state, cartState, queryState);
        setTotalProducts(state);
        setDoubleInputsOnCheck(state, state, queryState);
        setProductCount(state, state);
    } else {
        if (filteredState.length) {
            setSortParams(filteredState, queryState);
            drawProducts(filteredState, cartState, queryState);
            setTotalProducts(filteredState);
            setDoubleInputsOnCheck(state, filteredState, queryState);
            setProductCount(state, filteredState);
        } else {
            drawNoMatch(queryState);
            setTotalProducts(filteredState);
            setDoubleInputsOnCheck(state, state, queryState);
            setProductCount(state, filteredState);
        }
    }
}

function getSameItems(state: ProductsData[], nonEmptyNum: number): ProductsData[] {
    const result: ProductsData[] = [];

    for (let i = 0; i < state.length; i++) {
        const item = state[i];
        let counter = 0;
        for (let j = i; j < state.length; j++) {
            if (item === state[j]) {
                counter += 1;
                if (counter === nonEmptyNum) {
                    result.push(item);
                }
            }
        }
    }

    return result;
}

function setTotalProducts(state: ProductsData[]): void {
    const filterProdoctsFound = checkedQuerySelector(document, '.products_found__total');

    filterProdoctsFound.textContent = `FOUND: ${state.length}`;
}

function setDoubleInputsOnCheck(state: ProductsData[], filteredState: ProductsData[], queryState: QueryData): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    const priceInputMin = <HTMLInputElement>checkedQuerySelector(document, '.price__slider_1');
    const priceInputMax = <HTMLInputElement>checkedQuerySelector(document, '.price__slider_2');
    const discInputMin = <HTMLInputElement>checkedQuerySelector(document, '.discount__slider_1');
    const discInputMax = <HTMLInputElement>checkedQuerySelector(document, '.discount__slider_2');
    const priceTextMin = checkedQuerySelector(document, '.min_price__value');
    const priceTextMax = checkedQuerySelector(document, '.max_price__value');
    const discTextMin = checkedQuerySelector(document, '.min_discount__value');
    const discTextMax = checkedQuerySelector(document, '.max_discount__value');

    if (filteredState.length && !productsContainer.classList.contains('no-products')) {
        priceInputMin.value = queryState.minPrice ? queryState.minPrice : `${Math.floor(getMinPrice(filteredState))}`;
        priceInputMax.value = queryState.maxPrice ? queryState.maxPrice : `${Math.ceil(getMaxPrice(filteredState))}`;
        discInputMin.value = queryState.minDisc ? queryState.minDisc : `${Math.floor(getMinDiscount(filteredState))}`;
        discInputMax.value = queryState.maxDisc ? queryState.maxDisc : `${Math.ceil(getMaxDiscount(filteredState))}`;
    } else if (!filteredState.length && !productsContainer.classList.contains('no-products')) {
        priceInputMin.value = `${Math.floor(getMinPrice(state))}`;
        priceInputMax.value = `${Math.ceil(getMaxPrice(state))}`;
        discInputMin.value = `${Math.floor(getMinDiscount(state))}`;
        discInputMax.value = `${Math.ceil(getMaxDiscount(state))}`;
    } else if (productsContainer.classList.contains('no-products')) {
        priceInputMin.value = queryState.minPrice ? queryState.minPrice : `${Math.floor(getMinPrice(filteredState))}`;
        priceInputMax.value = queryState.maxPrice ? queryState.maxPrice : `${Math.ceil(getMaxPrice(filteredState))}`;
        discInputMin.value = queryState.minDisc ? queryState.minDisc : `${Math.floor(getMinDiscount(filteredState))}`;
        discInputMax.value = queryState.maxDisc ? queryState.maxDisc : `${Math.ceil(getMaxDiscount(filteredState))}`;
    }

    priceTextMin.textContent = priceInputMin.value;
    priceTextMax.textContent = priceInputMax.value;
    discTextMin.textContent = discInputMin.value;
    discTextMax.textContent = discInputMax.value;
}

function setSortParams(state: ProductsData[], queryState: QueryData): void {
    if (queryState.sortBy) {
        switch (queryState.sortBy) {
            case 'Min Price':
                state.sort((item1, item2) => item1.price - item2.price);
                break;
            case 'Max Price':
                state.sort((item1, item2) => item2.price - item1.price);
                break;
            case 'Min Discount':
                state.sort((item1, item2) => item1.discountPercentage - item2.discountPercentage);
                break;
            case 'Max Discount':
                state.sort((item1, item2) => item2.discountPercentage - item1.discountPercentage);
                break;
        }
    }
}

function setProductCount(state: ProductsData[], filteredState: ProductsData[]): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    const countProductCategory = Array.from(document.querySelectorAll('.filter__item_category'));
    const countProductBrand = Array.from(document.querySelectorAll('.filter__item_brand'));

    if (filteredState.length) {
        for (const item of countProductCategory) {
            const checkbox = checkedQuerySelector(item, '.filter__checkbox_category');
            const label = checkedQuerySelector(item, '.filter__label');
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = filteredState.length
                ? `${filteredState.filter((item) => item.category === checkbox.id).length}`
                : '0';
            if (counter.textContent === '0') {
                checkbox.style.opacity = '0.5';
                label.style.opacity = '0.5';
                counter.style.opacity = '0.5';
            } else {
                checkbox.style.opacity = '1';
                label.style.opacity = '1';
                counter.style.opacity = '1';
            }
        }

        for (const item of countProductBrand) {
            const checkbox = checkedQuerySelector(item, '.filter__checkbox_brand');
            const label = checkedQuerySelector(item, '.filter__label');
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = filteredState.length
                ? `${filteredState.filter((item) => item.brand === checkbox.id).length}`
                : '0';
            if (counter.textContent === '0') {
                checkbox.style.opacity = '0.5';
                label.style.opacity = '0.5';
                counter.style.opacity = '0.5';
            } else {
                checkbox.style.opacity = '1';
                label.style.opacity = '1';
                counter.style.opacity = '1';
            }
        }
    } else if (!productsContainer.classList.contains('no-products')) {
        for (const item of countProductCategory) {
            const checkbox = checkedQuerySelector(item, '.filter__checkbox_category');
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = state.length
                ? `${state.filter((item) => item.category === checkbox.id).length}`
                : '0';
        }

        for (const item of countProductBrand) {
            const checkbox = checkedQuerySelector(item, '.filter__checkbox_brand');
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = state.length ? `${state.filter((item) => item.brand === checkbox.id).length}` : '0';
        }
    } else if (productsContainer.classList.contains('no-products')) {
        for (const item of countProductCategory) {
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = '0';
        }

        for (const item of countProductBrand) {
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = '0';
        }
    }
}

export function resetFilters(queryState: QueryData): string {
    queryState.brand = [];
    queryState.category = [];
    queryState.find = '';
    queryState.minPrice = '';
    queryState.maxPrice = '';
    queryState.minDisc = '';
    queryState.maxDisc = '';
    queryState.sortBy = '';
    queryState.page = '1';
    queryState.limitPerPage = '5';

    const url = new URL(window.location.href);
    url.search = '';

    url.searchParams.delete('brand');
    url.searchParams.delete('category');
    url.searchParams.delete('find');
    url.searchParams.delete('minPrice');
    url.searchParams.delete('maxPrice');
    url.searchParams.delete('minDisc');
    url.searchParams.delete('maxDisc');
    url.searchParams.delete('sortBy');
    url.searchParams.delete('page');
    url.searchParams.delete('limitPerPage');

    return url.search;
}
