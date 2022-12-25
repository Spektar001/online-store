import Route from 'route-parser';
import { Paths, Routes } from '../../types/exports';
import { state, cartState, promoState } from '../..';
import { drawProductsPage } from '../constructor/drawProductsPage';
import { countCartProducts, countCartTotal } from '../constructor/cart/cartControls';
import { drawCart } from '../constructor/cart/drawCart';

const Paths: Paths = {
    index: '/',
    cart: '/cart',
    description: '/description',
};

export const routes: Routes = {};

export const render = (path: string) => {
    if (routes.index.match(path)) {
        drawProductsPage(state, cartState);
        countCartProducts(cartState);
        countCartTotal(cartState);
        return;
    } else if (routes.cart.match(path)) {
        drawCart(state, cartState, promoState);
        return;
    }
};

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
