import { drawProducts, drawNoMatch } from '../products/drawProducts';
import { checkedQuerySelector, ProductsData, QueryData } from '../../../types/exports';
import { cartState } from '../../..';
import { getMaxDiscount, getMaxPrice, getMinDiscount, getMinPrice } from './drawFilters';

export function setFilters(state: ProductsData[], queryState: QueryData): void {
    let filteredState: ProductsData[] = [];

    let filteredCategory: ProductsData[] = [];
    let filteredBrands: ProductsData[] = [];
    let filteredPrice: ProductsData[] = [];
    let filteredDiscount: ProductsData[] = [];
    const filteredFind: ProductsData[] = [];

    for (const item of queryState.category) {
        const filteredState: ProductsData[] = state.filter((product) => product.category === item);
        filteredCategory = filteredCategory.concat(filteredState);
    }

    for (const item of queryState.brand) {
        const filteredState: ProductsData[] = state.filter((product) => product.brand === item);
        filteredBrands = filteredBrands.concat(filteredState);
    }

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

    filteredState = filteredState.concat(
        filteredCategory,
        filteredBrands,
        filteredPrice,
        filteredDiscount,
        filteredFind
    );

    let nonEmptyArrNum = 0;

    if (filteredCategory.length) nonEmptyArrNum++;
    if (filteredBrands.length) nonEmptyArrNum++;
    if (filteredPrice.length) nonEmptyArrNum++;
    if (filteredDiscount.length) nonEmptyArrNum++;
    if (filteredFind.length) nonEmptyArrNum++;

    if (nonEmptyArrNum === 1) {
        if (
            filteredCategory.length &&
            !filteredFind.length &&
            !filteredBrands.length &&
            !filteredPrice.length &&
            !filteredDiscount.length
        ) {
            if (queryState.find) filteredState = isExist ? filteredCategory : [];
        } else if (
            !filteredCategory.length &&
            !filteredFind.length &&
            filteredBrands.length &&
            !filteredPrice.length &&
            !filteredDiscount.length
        ) {
            if (queryState.find) filteredState = isExist ? filteredBrands : [];
        } else if (
            !filteredCategory.length &&
            filteredFind.length &&
            !filteredBrands.length &&
            !filteredPrice.length &&
            !filteredDiscount.length
        ) {
            if (queryState.find) filteredState = isExist ? filteredFind : [];
        } else if (
            !filteredCategory.length &&
            !filteredFind.length &&
            !filteredBrands.length &&
            filteredPrice.length &&
            !filteredDiscount.length
        ) {
            if (queryState.find) filteredState = isExist ? filteredPrice : [];
        } else if (
            !filteredCategory.length &&
            !filteredFind.length &&
            !filteredBrands.length &&
            !filteredPrice.length &&
            filteredDiscount.length
        ) {
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

    if (checkStoreQueryParams(state, queryState)) {
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
    } else {
        filteredState = [];
        drawNoMatch(queryState);
        setTotalProducts(filteredState);
        setDoubleInputsOnCheck(state, state, queryState);
        setProductCount(state, filteredState);
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
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = filteredState.length
                ? `${filteredState.filter((item) => item.category === checkbox.id).length}`
                : '0';
        }

        for (const item of countProductBrand) {
            const checkbox = checkedQuerySelector(item, '.filter__checkbox_brand');
            const counter = checkedQuerySelector(item, '.filter__product_counter');
            counter.textContent = filteredState.length
                ? `${filteredState.filter((item) => item.brand === checkbox.id).length}`
                : '0';
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

export function checkStoreQueryParams(state: ProductsData[], queryState: QueryData) {
    let result = true;
    const url = new URL(window.location.href);
    let str = url.search;

    const categories: string[] = [];
    const brands: string[] = [];

    for (let i = 0; i < state.length; i += 1) {
        categories.push(state[i].category);
        brands.push(state[i].brand.split(' ').join('+').replace('&', '%26'));
    }

    if (url.search && str.indexOf('=') === -1) result = false;

    const equallyAmount = str.split('=').length;
    const andAmount = str.split('&').length;

    if (url.search && equallyAmount - 1 !== andAmount) result = false;

    if (
        url.search &&
        (str.indexOf('=') === 0 ||
            str.indexOf('=') === str.length - 1 ||
            str.indexOf('&') === 0 ||
            str.indexOf('&') === str.length - 1)
    )
        result = false;

    if (queryState.sortBy) {
        if (
            queryState.sortBy.toString() !== 'Min Price' &&
            queryState.sortBy.toString() !== 'Max Price' &&
            queryState.sortBy.toString() !== 'Min Discount' &&
            queryState.sortBy.toString() !== 'Max Discount'
        )
            result = false;
    }

    if (queryState.maxPrice) {
        if (+queryState.maxPrice > getMaxPrice(state) || +queryState.maxPrice < getMinPrice(state)) {
            result = false;
        }
    }

    if (str.lastIndexOf('minPrice') !== -1 && queryState.minPrice === '') result = false;

    if (queryState.minPrice) {
        if (+queryState.minPrice > getMaxPrice(state) || +queryState.minPrice < getMinPrice(state)) {
            result = false;
        }
    }

    if (queryState.maxPrice && queryState.minPrice) {
        if (+queryState.minPrice > +queryState.maxPrice) result = false;
    }

    if (str.lastIndexOf('maxDisc') !== -1 && queryState.maxDisc === '') result = false;

    if (queryState.maxDisc) {
        if (
            +queryState.maxDisc > Math.ceil(getMaxDiscount(state)) ||
            +queryState.maxDisc < Math.floor(getMinDiscount(state))
        ) {
            console.log(1);
            result = false;
        }
    }

    if (str.lastIndexOf('minDisc') !== -1 && queryState.minDisc === '') result = false;

    if (queryState.minDisc) {
        if (
            +queryState.minDisc > Math.ceil(getMaxDiscount(state)) ||
            +queryState.minDisc < Math.floor(getMinDiscount(state))
        ) {
            result = false;
        }
    }

    if (queryState.maxDisc && queryState.minDisc) {
        if (+queryState.minDisc > +queryState.maxDisc) result = false;
    }

    for (const item of Object.keys(queryState)) {
        str = str.replace(item, '');
    }

    for (const item of categories) {
        str = str.replace(item, '');
    }

    for (const item of brands) {
        str = str.replace(item, '');
    }

    str = str
        .replace(/[&?+=-]/g, '')
        .replace(/Min|Max|Price|Discount|column|row/g, '')
        .replace(/[0-9]/g, '');
    console.log(str);

    if (str.length) result = false;

    return result;
}
