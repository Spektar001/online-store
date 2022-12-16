import { drawProducts } from '../products/drawProducts';
import { ProductsData } from '../../../types/exports';

export function setFilter(checkbox: HTMLInputElement, state: ProductsData[], curState: ProductsData[]) {
    let filterState: ProductsData[] = [];
    if (checkbox.checked) {
        const filtered = state.filter((item) => item.category === checkbox.id || item.brand === checkbox.id);

        if (curState === state) {
            filterState = filterState.concat(filtered);
            curState = filterState;
        } else {
            filterState = curState;
            filterState = filterState.concat(filtered);
            curState = filterState;
        }

        drawProducts(filterState);
    } else {
        drawProducts(curState);
        console.log(curState);
    }
    return curState;
}
