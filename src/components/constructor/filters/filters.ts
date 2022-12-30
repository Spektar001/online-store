import { drawProducts, drawNoMatch } from '../products/drawProducts';
import { checkedQuerySelector, ProductsData, QueryData } from '../../../types/exports';
import { cartState } from '../../..';
import { getMaxDiscount, getMaxPrice, getMinDiscount, getMinPrice } from './drawFilters';

export function setFilters(state: ProductsData[], queryState: QueryData): ProductsData[] {
    console.log(queryState);

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
        (product) => product.price >= +queryState.minPrice && queryState.minPrice
    );
    const filteredMaxPrice: ProductsData[] = state.filter(
        (product) => product.price <= +queryState.maxPrice && queryState.maxPrice
    );

    if (filteredMinPrice.length && filteredMaxPrice.length) {
        filteredPrice = getSameItems(filteredMinPrice.concat(filteredMaxPrice), 2);
    } else if (filteredMinPrice.length && !filteredMaxPrice.length) {
        filteredPrice = filteredMinPrice;
    } else if (!filteredMinPrice.length && filteredMaxPrice.length) {
        filteredPrice = filteredMaxPrice;
    }

    const filteredMinDisc: ProductsData[] = state.filter(
        (product) => product.discountPercentage >= +queryState.minDisc && queryState.minDisc
    );
    const filteredMaxDisc: ProductsData[] = state.filter(
        (product) => product.discountPercentage <= +queryState.maxDisc && queryState.maxDisc
    );

    if (filteredMinDisc.length && filteredMaxDisc.length) {
        filteredDiscount = getSameItems(filteredMinDisc.concat(filteredMaxDisc), 2);
    } else if (filteredMinDisc.length && !filteredMaxDisc.length) {
        filteredDiscount = filteredMinDisc;
    } else if (!filteredMinDisc.length && filteredMaxDisc.length) {
        filteredDiscount = filteredMaxDisc;
    }

    for (const item of state) {
        if (queryState.find) {
            if (item.title.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
            } else if (item.category.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
            } else if (item.brand.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
            } else if (item.description.toLowerCase().indexOf(queryState.find.toLowerCase()) != -1) {
                filteredFind.push(item);
            } else if (item.price === +queryState.find) {
                filteredFind.push(item);
            } else if (
                Math.floor(item.discountPercentage) === +queryState.find ||
                Math.ceil(item.discountPercentage) === +queryState.find
            ) {
                filteredFind.push(item);
            } else if (Math.round(item.rating) === +queryState.find) {
                filteredFind.push(item);
            } else if (item.stock === +queryState.find) {
                filteredFind.push(item);
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

    console.log(filteredCategory, filteredBrands, filteredDiscount, filteredPrice, filteredFind, nonEmptyArrNum);

    if (nonEmptyArrNum === 1) {
        if (
            filteredCategory.length &&
            !queryState.find &&
            !queryState.brand.length &&
            !queryState.minPrice &&
            !queryState.maxPrice &&
            !queryState.minDisc &&
            !queryState.maxDisc
        ) {
            filteredState = filteredCategory;
        } else if (
            filteredBrands.length &&
            !queryState.find &&
            !queryState.category.length &&
            !queryState.minPrice &&
            !queryState.maxPrice &&
            !queryState.minDisc &&
            !queryState.maxDisc
        ) {
            filteredState = filteredBrands;
        } else if (
            queryState.find &&
            !queryState.category.length &&
            !filteredBrands.length &&
            !queryState.minPrice &&
            !queryState.maxPrice &&
            !queryState.minDisc &&
            !queryState.maxDisc
        ) {
            filteredState = filteredFind;
        } else if (
            (queryState.minPrice || queryState.maxPrice) &&
            !queryState.find &&
            !queryState.category.length &&
            !filteredBrands.length &&
            !queryState.minDisc &&
            !queryState.maxDisc
        ) {
            filteredState = filteredPrice;
        } else if (
            (queryState.minDisc || queryState.maxDisc) &&
            !queryState.find &&
            !queryState.category.length &&
            !filteredBrands.length &&
            !queryState.minPrice &&
            !queryState.maxPrice
        ) {
            filteredState = filteredDiscount;
        }
    } else if (nonEmptyArrNum > 1) {
        filteredState = getSameItems(filteredState, nonEmptyArrNum);
    }

    if (
        !queryState.find &&
        !queryState.category.length &&
        !queryState.brand.length &&
        !queryState.minPrice &&
        !queryState.maxPrice &&
        !queryState.minDisc &&
        !queryState.maxDisc
    ) {
        drawProducts(state, cartState);
    } else {
        filteredState.length ? drawProducts(filteredState, cartState) : drawNoMatch();
    }

    return filteredState;
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

export function setDoubleInputsOnCheck(
    state: ProductsData[],
    filteredState: ProductsData[],
    queryState: QueryData
): void {
    const productsContainer = checkedQuerySelector(document, '.products__container');
    const priceInputMin = <HTMLInputElement>checkedQuerySelector(document, '.price__slider_1');
    const priceInputMax = <HTMLInputElement>checkedQuerySelector(document, '.price__slider_2');
    const discInputMin = <HTMLInputElement>checkedQuerySelector(document, '.discount__slider_1');
    const discInputMax = <HTMLInputElement>checkedQuerySelector(document, '.discount__slider_2');
    const priceTextMin = checkedQuerySelector(document, '.min_price__value');
    const priceTextMax = checkedQuerySelector(document, '.max_price__value');
    const discTextMin = checkedQuerySelector(document, '.min_discount__value');
    const discTextMax = checkedQuerySelector(document, '.max_discount__value');

    if (priceInputMin.value === `${Math.floor(getMinPrice(state))}`) queryState.minPrice = '';
    if (priceInputMax.value === `${Math.ceil(getMaxPrice(state))}`) queryState.maxPrice = '';
    if (discInputMin.value === `${Math.floor(getMinDiscount(state))}`) queryState.minDisc = '';
    if (discInputMax.value === `${Math.ceil(getMaxDiscount(state))}`) queryState.maxDisc = '';

    if (filteredState.length) {
        priceInputMin.value = queryState.minPrice ? queryState.minPrice : `${Math.floor(getMinPrice(filteredState))}`;
        priceInputMax.value = queryState.maxPrice ? queryState.maxPrice : `${Math.ceil(getMaxPrice(filteredState))}`;
        discInputMin.value = queryState.minDisc ? queryState.minDisc : `${Math.floor(getMinDiscount(filteredState))}`;
        discInputMax.value = queryState.maxDisc ? queryState.maxDisc : `${Math.ceil(getMaxDiscount(filteredState))}`;

        priceTextMin.textContent = priceInputMin.value;
        priceTextMax.textContent = priceInputMax.value;
        discTextMin.textContent = discInputMin.value;
        discTextMax.textContent = discInputMax.value;
    } else if (!productsContainer.classList.contains('no-products')) {
        priceInputMin.value = `${Math.floor(getMinPrice(state))}`;
        priceInputMax.value = `${Math.ceil(getMaxPrice(state))}`;
        discInputMin.value = `${Math.floor(getMinDiscount(state))}`;
        discInputMax.value = `${Math.ceil(getMaxDiscount(state))}`;

        priceTextMin.textContent = priceInputMin.value;
        priceTextMax.textContent = priceInputMax.value;
        discTextMin.textContent = discInputMin.value;
        discTextMax.textContent = discInputMax.value;
    } else if (productsContainer.classList.contains('no-products')) {
        priceInputMin.value = '0';
        priceInputMax.value = '0';
        discInputMin.value = '0';
        discInputMax.value = '0';

        priceTextMin.textContent = '0';
        priceTextMax.textContent = '0';
        discTextMin.textContent = '0';
        discTextMax.textContent = '0';
    }
}

export function setProductCount(state: ProductsData[], filteredState: ProductsData[]): void {
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
