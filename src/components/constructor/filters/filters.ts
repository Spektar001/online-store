import { drawProducts, drawNoMatch } from '../products/drawProducts';
import { ProductsData, QueryData } from '../../../types/exports';
import { cartState } from '../../..';

// let filterState: ProductsData[] = [];
// let filteredBrands: ProductsData[] = [];
// let filtered: ProductsData[] = [];

export function setFilters(state: ProductsData[], queryState: QueryData): void {
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

    console.log(filteredBrands);

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

    console.log(filteredState);

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
