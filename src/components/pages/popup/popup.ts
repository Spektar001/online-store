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
    const regexPhone = /^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)\+[0-9]{13}$/gm;
    const regexAddress = /^[A-Z,a-z,0-9]{5,10} [A-Z,a-z,0-9]{5,10} [A-Z,a-z,0-9]{5,10}$/gm;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const regexCardNumber = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/gm;
    const regexDate = /^[0-9]{2}\/[0-9]{2}$/gm;
    const regexCVV = /^[0-9]+$/;

    detailsInputName.addEventListener('input', () => {
        detailsInputName.classList.add('error');
        detailsInputName.classList.remove('check');
        isFormDetailsSelected(details, btnConfirm);

        if (detailsInputName.value.match(regexName) === null) {
            isFormDetailsSelected(details, btnConfirm);
            detailsInputName.classList.add('error');
            detailsInputName.classList.remove('check');
        }
        if (regexName.test(detailsInputName.value)) {
            detailsInputName.classList.remove('error');
            detailsInputName.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
        }
    });

    detailsInputPhone.addEventListener('input', () => {
        detailsInputPhone.value = detailsInputPhone.value.replace(/[^\d,+]/g, '');
        detailsInputPhone.classList.add('error');
        detailsInputPhone.classList.remove('check');
        isFormDetailsSelected(details, btnConfirm);

        if (regexPhone.test(detailsInputPhone.value)) {
            detailsInputPhone.classList.remove('error');
            detailsInputPhone.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
        }
    });
    detailsInputAddress.addEventListener('input', () => {
        detailsInputAddress.classList.add('error');
        detailsInputAddress.classList.remove('check');
        isFormDetailsSelected(details, btnConfirm);

        if (detailsInputAddress.value.match(regexAddress) === null) {
            isFormDetailsSelected(details, btnConfirm);
            detailsInputAddress.classList.add('error');
            detailsInputAddress.classList.remove('check');
        }
        if (regexAddress.test(detailsInputAddress.value)) {
            detailsInputAddress.classList.remove('error');
            detailsInputAddress.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
        }
    });
    detailsInputEmail.addEventListener('input', () => {
        detailsInputEmail.classList.add('error');
        detailsInputEmail.classList.remove('check');
        isFormDetailsSelected(details, btnConfirm);

        if (regexEmail.test(detailsInputEmail.value)) {
            detailsInputEmail.classList.remove('error');
            detailsInputEmail.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
        }
    });

    detailsCardNumber.addEventListener('input', () => {
        const cardCode = detailsCardNumber.value.replace(/[^\d]/g, '').substring(0, 16);

        detailsCardNumber.value =
            detailsCardNumber.value.length < 19
                ? matcher(cardCode, /.{1,4}/g, ' ')
                : matcher(cardCode, /.{1,4}/g, ' ').substring(0, 19);

        if (detailsCardNumber.value.length < 19) {
            detailsCardNumber.classList.add('error');
            detailsCardNumber.classList.remove('check');
            isFormDetailsSelected(details, btnConfirm);
        }
        if (regexCardNumber.test(detailsCardNumber.value)) {
            detailsCardNumber.classList.remove('error');
            detailsCardNumber.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
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
            detailsDate.classList.add('error');
            detailsDate.classList.remove('check');
            isFormDetailsSelected(details, btnConfirm);
        }
        if (
            regexDate.test(detailsDate.value) &&
            detailsDate.value.slice(0, 2) <= '12' &&
            detailsDate.value.slice(-2) <= '31'
        ) {
            detailsDate.classList.remove('error');
            detailsDate.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
        }
    });
    detailsCVV.addEventListener('input', () => {
        detailsCVV.value = detailsCVV.value.replace(/[^\d]/g, '');
        detailsCVV.classList.add('error');
        detailsCVV.classList.remove('check');
        isFormDetailsSelected(details, btnConfirm);

        if (detailsCVV.value.length > 3) {
            detailsCVV.value = detailsCVV.value.slice(0, 3);
        }
        if (regexCVV.test(detailsCVV.value) === true && detailsCVV.value.length === 3) {
            detailsCVV.classList.remove('error');
            detailsCVV.classList.add('check');
            isFormDetailsSelected(details, btnConfirm);
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

function isFormDetailsSelected(form: HTMLElement, btn: HTMLButtonElement): void {
    const arrInputs = Array.from(form.querySelectorAll('.checked'));
    if (arrInputs.every((item) => item.classList.contains('check'))) {
        btn.disabled = false;
    }
    if (!arrInputs.every((item) => item.classList.contains('check'))) {
        btn.disabled = true;
    }
}

function matcher(string: string, regexp: RegExp, joiner: string): string {
    const stringMatches: string[] | null = string.match(regexp);

    if (stringMatches) {
        return stringMatches.join(joiner);
    } else {
        return '';
    }
}
