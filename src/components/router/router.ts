import Route from 'route-parser';
import { Paths, Routes } from '../../types/types';
import { state, cartState, promoState, queryState } from '../app/initApp';
import { drawProductsPage } from '../pages/store/drawProductsPage';
import { countCartProducts, countCartTotal } from '../pages/cart/cartControls';
import { drawCart } from '../pages/cart/drawCart';
import { drawProduct } from '../pages/product/drawProduct';
import { draw404 } from '../pages/404/404';
import { setStorage } from '../storage/setStorage';

const Paths: Paths = {
    index: '/',
    cart: '/cart',
    description: '/description',
};

const routes: Routes = {};

export function render(path: string): void {
    setStorage('cartState', cartState);

    const url = new URL(window.location.href);
    setQueryState(url.searchParams);

    for (const item of Object.values(routes)) {
        if (item.match(path) && Object.values(item)[0] === `/`) {
            drawProductsPage(state, cartState, queryState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        } else if (item.match(path) && Object.values(item)[0] === `/cart`) {
            drawCart(state, cartState, promoState, queryState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        } else if (item.match(path)) {
            drawProduct(Object.values(item)[0].slice(9), state, cartState, promoState, queryState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        }
    }
    draw404();
}

export function goTo(path: string): void {
    window.history.pushState({ path }, path, path);
    render(path);
}

export function initRouter(): void {
    for (let i = 0; i < state.length; i++) {
        const key = `product${i + 1}`;
        const value = `/product/${i + 1}`;
        Paths[key] = value;
    }
    for (const key of Object.keys(Paths)) {
        routes[key] = new Route(Paths[key]);
    }
    window.addEventListener('popstate', () => {
        render(new URL(window.location.href).pathname);
    });
    render(new URL(window.location.href).pathname);
}

function setQueryState(queryParams: URLSearchParams): void {
    const brand = queryParams.get('brand')?.split('-');
    const category = queryParams.get('category')?.split('-');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const minDisc = queryParams.get('minDisc');
    const maxDisc = queryParams.get('maxDisc');
    const find = queryParams.get('find');
    const sortBy = queryParams.get('sortBy');
    const view = queryParams.get('view');
    const page = queryParams.get('page');
    const limitPerPage = queryParams.get('limitPerPage');

    brand !== undefined ? (queryState.brand = brand) : [];
    category !== undefined ? (queryState.category = category) : [];
    minPrice !== null ? (queryState.minPrice = minPrice) : '';
    maxPrice !== null ? (queryState.maxPrice = maxPrice) : '';
    minDisc !== null ? (queryState.minDisc = minDisc) : '';
    maxDisc !== null ? (queryState.maxDisc = maxDisc) : '';
    find !== null ? (queryState.find = find) : '';
    sortBy !== null ? (queryState.sortBy = sortBy) : '';
    view !== null ? (queryState.view = view) : 'row';
    page !== null && +page > 0 && +page < 100 ? (queryState.page = page) : '1';
    limitPerPage !== null && +limitPerPage > 0 ? (queryState.limitPerPage = limitPerPage) : '5';
}
