/* imports ------------------------------------------------- */

import { checkedQuerySelector } from '../../../types/types';
import { queryState } from '../../app/initApp';
import { goTo } from '../../router/router';
import { resetFilters } from '../store/filters/setFilters';

/* function to set header buttons ------------------------------------------------- */

export function setHeaderButtons(): void {
    checkedQuerySelector(document, '.header__cart').addEventListener('click', () => {
        goTo('/cart');
    });
    checkedQuerySelector(document, '.header__logo').addEventListener('click', () => {
        goTo(`/${resetFilters(queryState)}`);
    });
}
