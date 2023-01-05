import { checkedQuerySelector } from '../../../types/types';
import { queryState } from '../../api/initApp';
import { goTo } from '../../router/router';
import { resetFilters } from '../store/filters/setFilters';

export function setHeaderButtons() {
    checkedQuerySelector(document, '.header__cart').addEventListener('click', () => {
        goTo('/cart');
    });
    checkedQuerySelector(document, '.header__logo').addEventListener('click', () => {
        goTo(`/${resetFilters(queryState)}`);
    });
}
