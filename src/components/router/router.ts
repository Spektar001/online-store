import Route from 'route-parser';
import { Paths, Routes } from '../../types/exports';
import { state, cartState, promoState, queryState } from '../..';
import { drawProductsPage } from '../constructor/drawProductsPage';
import { countCartProducts, countCartTotal } from '../constructor/cart/cartControls';
import { drawCart } from '../constructor/cart/drawCart';
import { drawProduct } from '../constructor/pruduct/drawProduct';
import { draw404 } from '../constructor/404/404';

const Paths: Paths = {
    index: '/',
    cart: '/cart',
    description: '/description',
};

export const routes: Routes = {};

export const render = (path: string) => {
    const url = new URL(window.location.href);
    const queryParams = url.searchParams;
    setQueryState(queryParams);
    for (const item of Object.values(routes)) {
        if (item.match(path) && Object.values(item)[0] === `/`) {
            drawProductsPage(state, cartState, queryState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        } else if (item.match(path) && Object.values(item)[0] === `/cart`) {
            drawCart(state, cartState, promoState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        } else if (item.match(path)) {
            drawProduct(Object.values(item)[0].slice(9), state, cartState);
            countCartProducts(cartState);
            countCartTotal(cartState);
            return;
        }
    }
    draw404();
};

function setQueryState(queryParams: URLSearchParams): void {
    const brand = queryParams.get('brand')?.split('-');
    const category = queryParams.get('category')?.split('-');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const minDisc = queryParams.get('minDisc');
    const maxDisc = queryParams.get('maxDisc');
    const find = queryParams.get('find');

    brand !== undefined ? (queryState.brand = brand) : [];
    category !== undefined ? (queryState.category = category) : [];
    minPrice !== null ? (queryState.minPrice = minPrice) : '';
    maxPrice !== null ? (queryState.maxPrice = maxPrice) : '';
    minDisc !== null ? (queryState.minDisc = minDisc) : '';
    maxDisc !== null ? (queryState.maxDisc = maxDisc) : '';
    find !== null ? (queryState.find = find) : '';

    console.log(queryState);
}

export const goTo = (path: string) => {
    window.history.pushState({ path }, path, path);
    render(path);
};

const initRouter = () => {
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
};

export default initRouter;
