import { appendEl, createEl } from '../elements/elements';
import { checkedQuerySelector } from '../../../types/exports';
import { goTo } from '../../router/router';
import './404.css';

export function draw404(): void {
    const main = checkedQuerySelector(document, 'main');
    main.innerHTML = '';

    const noPageContainer = createEl('no-page__container container', 'div');
    const noPageImage = createEl('no-page__image', 'div');
    const noPageHeader = createEl('no-page__header', 'h2');
    const noPageTextContainer = createEl('no-page__container_text', 'div');
    const noPageText = createEl('no-page__text', 'span');
    const noPageMainLink = createEl('no-page__main_link', 'span');

    appendEl(noPageContainer, noPageImage);
    appendEl(noPageContainer, noPageHeader);

    appendEl(noPageTextContainer, noPageText);
    appendEl(noPageTextContainer, noPageMainLink);
    appendEl(noPageContainer, noPageTextContainer);

    appendEl(main, noPageContainer);

    noPageHeader.textContent = 'Oops! There is no such page!';
    noPageText.textContent = `You may find many other great products if you `;
    noPageMainLink.textContent = 'return to the store.';

    noPageMainLink.addEventListener('click', () => {
        goTo('/');
    });
}
