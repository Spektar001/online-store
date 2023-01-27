/* imports ------------------------------------------------- */

import {
    appendEl,
    CartData,
    checkedQuerySelector,
    createEl,
    ProductsData,
    PromoData,
    QueryData,
} from '../../../types/types';
import { drawCart } from '../cart/drawCart';
import { clearCart, countCartProducts, countCartTotal } from '../cart/cartControls';
import { resetFilters } from '../store/filters/setFilters';
import { goTo } from '../../router/router';
import './popup.css';

/* function to show popup on buy ------------------------------------------------- */

export function showPopUp(
    button: HTMLElement,
    state: ProductsData[],
    cartState: CartData[],
    promoState: PromoData[],
    queryState: QueryData
): void {
    const main = checkedQuerySelector(document, 'main');
    const sectionDetails = createEl('section__details', 'div');
    const bgLayer = createEl('bg_layer', 'div');
    const detailsWrapper = createEl('details-wrapper', 'div');
    const details = createEl('details', 'form');
    const detailsTitle = createEl('details__title', 'h2');
    const detailsInputName = <HTMLInputElement>createEl('details__input details__input_name checked', 'input');
    const detailsInputPhone = <HTMLInputElement>createEl('details__input details__input_phone checked', 'input');
    const detailsInputAddress = <HTMLInputElement>createEl('details__input details__input_address checked', 'input');
    const detailsInputEmail = <HTMLInputElement>createEl('details__input details__input_email checked', 'input');
    const detailsSubtitle = createEl('details__subtitle', 'p');
    const detailsCardBox = createEl('details__card_box', 'div');
    const detailsCard = createEl('details__card', 'div');
    const detailsCardImg = <HTMLImageElement>createEl('details__card_img', 'img');
    const detailsCardNumber = <HTMLInputElement>createEl('details__card_number input checked', 'input');
    const detailsValid = createEl('details__valid', 'div');
    const detailsValidTitleVal = createEl('details__valid_title', 'p');
    const detailsDate = <HTMLInputElement>createEl('details__date input checked', 'input');
    const detailsValidTitleCVV = createEl('details__valid_title', 'p');
    const detailsCVV = <HTMLInputElement>createEl('details__cvv input checked', 'input');
    const btnConfirm = <HTMLButtonElement>createEl('btn-confirm', 'button');

    appendEl(main, sectionDetails);
    appendEl(sectionDetails, bgLayer);
    appendEl(sectionDetails, detailsWrapper);
    appendEl(detailsWrapper, details);
    appendEl(details, detailsTitle);
    appendEl(details, detailsInputName);
    appendEl(details, detailsInputPhone);
    appendEl(details, detailsInputAddress);
    appendEl(details, detailsInputEmail);
    appendEl(details, detailsSubtitle);
    appendEl(details, detailsCardBox);
    appendEl(detailsCardBox, detailsCard);
    appendEl(detailsCard, detailsCardImg);
    appendEl(detailsCard, detailsCardNumber);
    appendEl(detailsCardBox, detailsValid);
    appendEl(detailsValid, detailsValidTitleVal);
    appendEl(detailsValid, detailsDate);
    appendEl(detailsValid, detailsValidTitleCVV);
    appendEl(detailsValid, detailsCVV);
    appendEl(details, btnConfirm);

    detailsTitle.textContent = 'Personal details';
    detailsInputName.type = 'text';
    detailsInputName.placeholder = 'Name';
    detailsInputPhone.type = 'tel';
    detailsInputPhone.placeholder = 'Phone number';
    detailsInputAddress.type = 'text';
    detailsInputAddress.placeholder = 'Delivery address';
    detailsInputEmail.type = 'email';
    detailsInputEmail.placeholder = 'E-mail';
    detailsSubtitle.textContent = 'Credit card details';
    detailsCardImg.style.backgroundImage = 'url(../../../assets/card-demo.png)';
    detailsCardImg.style.backgroundSize = 'cover';
    detailsCardImg.style.backgroundPosition = 'center';
    detailsCardImg.style.backgroundRepeat = 'no-repeat';
    detailsCardNumber.type = 'text';
    detailsCardNumber.placeholder = 'Card number';
    detailsValidTitleVal.textContent = 'Valid:';
    detailsDate.type = 'text';
    detailsDate.placeholder = 'MM/YY';
    detailsValidTitleCVV.textContent = 'CVV:';
    detailsCVV.type = 'text';
    detailsCVV.placeholder = '123';
    btnConfirm.type = 'button';
    btnConfirm.textContent = 'Confirm';
    btnConfirm.disabled = true;

    const regexName = /^[A-Z]{1}[a-z]{2,10}\s[A-Z]{1}[a-z]{2,10}$/gm;
    const regexPhone = /^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)\+[0-9]{11}$/gm;
    const regexAddress = /^[A-Z,a-z,0-9]{5,10} [A-Z,a-z,0-9]{5,10} [A-Z,a-z,0-9]{5,10}$/gm;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const regexCardNumber = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/gm;
    const regexDate = /^[0-9]{2}\/[0-9]{2}$/gm;
    const regexCVV = /^[0-9]+$/;

    detailsInputName.addEventListener('input', () => {
        activateLock(detailsInputName, details, btnConfirm);
        if (detailsInputName.value.match(regexName) === null) {
            activateLock(detailsInputName, details, btnConfirm);
        }

        if (regexName.test(detailsInputName.value)) {
            deactivateLock(detailsInputName, details, btnConfirm);
        }
    });

    detailsInputPhone.addEventListener('input', () => {
        detailsInputPhone.value = detailsInputPhone.value.slice(0, 12);
        if (detailsInputPhone.value[0] !== '+' && detailsInputPhone.value)
            detailsInputPhone.value = '+' + `${+detailsInputPhone.value[0] - 1}` + detailsInputPhone.value.slice(1);
        detailsInputPhone.value = detailsInputPhone.value.replace(/[^\d,+]/g, '');
        activateLock(detailsInputPhone, details, btnConfirm);

        if (detailsInputPhone.value.match(regexPhone) === null) {
            activateLock(detailsInputPhone, details, btnConfirm);
        } else {
            deactivateLock(detailsInputPhone, details, btnConfirm);
        }
    });
    detailsInputAddress.addEventListener('input', () => {
        activateLock(detailsInputAddress, details, btnConfirm);
        if (detailsInputAddress.value.match(regexAddress) === null) {
            activateLock(detailsInputAddress, details, btnConfirm);
        }

        if (regexAddress.test(detailsInputAddress.value)) {
            deactivateLock(detailsInputAddress, details, btnConfirm);
        }
    });
    detailsInputEmail.addEventListener('input', () => {
        activateLock(detailsInputEmail, details, btnConfirm);
        if (detailsInputEmail.value.match(regexEmail) === null) {
            activateLock(detailsInputEmail, details, btnConfirm);
        } else {
            deactivateLock(detailsInputEmail, details, btnConfirm);
        }
    });

    detailsCardNumber.addEventListener('input', () => {
        const cardCode = detailsCardNumber.value.replace(/[^\d]/g, '').substring(0, 16);

        detailsCardNumber.value =
            detailsCardNumber.value.length < 19
                ? matcher(cardCode, /.{1,4}/g, ' ')
                : matcher(cardCode, /.{1,4}/g, ' ').substring(0, 19);

        if (detailsCardNumber.value.length < 19) {
            activateLock(detailsCardNumber, details, btnConfirm);
        }

        if (regexCardNumber.test(detailsCardNumber.value)) {
            deactivateLock(detailsCardNumber, details, btnConfirm);
        }
        switch (detailsCardNumber.value[0]) {
            case '4':
                detailsCardImg.style.backgroundImage = 'url(../../../assets/visa.png)';
                break;
            case '5':
                detailsCardImg.style.backgroundImage = 'url(../../../assets/master-card.png)';
                break;
            case '6':
                detailsCardImg.style.backgroundImage = 'url(../../../assets/union-pay.png)';
                break;
            default:
                detailsCardImg.style.backgroundImage = 'url(../../../assets/card-demo.png)';
                break;
        }
    });
    detailsDate.addEventListener('input', () => {
        const validDate = detailsDate.value.replace(/[^\d]/g, '').substring(0, 4);

        detailsDate.value =
            detailsDate.value.length < 5
                ? matcher(validDate, /.{1,2}/g, '/')
                : matcher(validDate, /.{1,2}/g, '/').substring(0, 5);

        if (detailsDate.value.length < 5) {
            activateLock(detailsDate, details, btnConfirm);
        }

        if (detailsDate.value.length === 5) {
            const dateArr = detailsDate.value.split('/');
            const date = new Date();

            if (
                +dateArr[1] >= +date.getFullYear().toString().slice(2) &&
                +dateArr[0] >= date.getMonth() + 1 &&
                detailsDate.value.match(regexDate) !== null &&
                detailsDate.value.slice(0, 2) <= '12'
            ) {
                deactivateLock(detailsDate, details, btnConfirm);
            } else {
                activateLock(detailsDate, details, btnConfirm);
            }
        }
    });
    detailsCVV.addEventListener('input', () => {
        detailsCVV.value = detailsCVV.value.replace(/[^\d]/g, '');
        activateLock(detailsCVV, details, btnConfirm);

        if (detailsCVV.value.length > 3) {
            detailsCVV.value = detailsCVV.value.slice(0, 3);
        }

        if (regexCVV.test(detailsCVV.value) === true && detailsCVV.value.length === 3) {
            deactivateLock(detailsCVV, details, btnConfirm);
        }
    });

    btnConfirm.addEventListener('click', () => {
        clearCart(cartState, promoState);
        drawCart(state, cartState, promoState, queryState);
        countCartProducts(cartState);
        countCartTotal(cartState);

        const sectionOrder = createEl('section__order', 'div');
        const orderLayer = createEl('order_layer', 'div');
        const orderWrapper = createEl('order-wrapper', 'div');
        const order = createEl('order', 'p');
        const orderTitle = createEl('order__title', 'h2');

        appendEl(main, sectionOrder);
        appendEl(sectionOrder, orderLayer);
        appendEl(sectionOrder, orderWrapper);
        appendEl(orderWrapper, order);
        appendEl(order, orderTitle);

        orderTitle.style.fontSize = '2rem';
        orderTitle.style.color = '#112D4E';
        orderTitle.textContent = 'Thank you for order!';

        sectionDetails.remove();

        setTimeout(() => {
            sectionOrder.remove();
            goTo(`/${resetFilters(queryState)}`);
        }, 3000);
    });

    document.addEventListener('click', (e) => {
        const targetDocument = <HTMLDivElement>e.target;
        const its_details = targetDocument == details || details.contains(targetDocument);
        const its_button = targetDocument == button;
        const details_is_active = details.classList.contains('details');
        if (!its_details && !its_button && details_is_active) {
            details.classList.add('close');
            setTimeout(() => {
                bgLayer.classList.add('close');
            }, 500);
            setTimeout(() => {
                sectionDetails.remove();
            }, 1000);
        }
    });
}

/* function to check is popup fields are valid ------------------------------------------------- */

function isFormDetailsSelected(form: HTMLElement, btn: HTMLButtonElement): void {
    const arrInputs = Array.from(form.querySelectorAll('.checked'));
    if (arrInputs.every((item) => item.classList.contains('check'))) {
        btn.disabled = false;
    }
    if (!arrInputs.every((item) => item.classList.contains('check'))) {
        btn.disabled = true;
    }
}

/* function to check matching when null is possible ------------------------------------------------- */

function matcher(string: string, regexp: RegExp, joiner: string): string {
    const stringMatches: string[] | null = string.match(regexp);

    if (stringMatches) {
        return stringMatches.join(joiner);
    } else {
        return '';
    }
}

/* function to activate lock of element ------------------------------------------------- */

function activateLock(el: HTMLElement, form: HTMLElement, button: HTMLButtonElement): void {
    el.classList.add('error');
    el.classList.remove('check');
    isFormDetailsSelected(form, button);
}

/* function to deactivate lock of element ------------------------------------------------- */

function deactivateLock(el: HTMLElement, form: HTMLElement, button: HTMLButtonElement): void {
    el.classList.add('check');
    el.classList.remove('error');
    isFormDetailsSelected(form, button);
}
