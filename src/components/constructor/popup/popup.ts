import { createEl, appendEl } from '../elements/elements';
import { checkedQuerySelector } from '../../../types/exports';
import { setProdouctsValues } from '../../../index';
import './popup.css';

export function showPopUp(button: HTMLElement) {
    const main = checkedQuerySelector(document, 'main');
    const sectionDetails = createEl('section__details', 'div');
    const bgLayer = createEl('bg_layer', 'div');
    const detailsWrapper = createEl('details-wrapper', 'div');
    const details = createEl('details', 'div');
    const detailsTitle = createEl('details__title', 'h2');
    const detailsInputName = <HTMLInputElement>createEl('details__input details__input_name', 'input');
    const detailsInputPhone = <HTMLInputElement>createEl('details__input details__input_phone', 'input');
    const detailsInputAddress = <HTMLInputElement>createEl('details__input details__input_address', 'input');
    const detailsInputEmail = <HTMLInputElement>createEl('details__input details__input_email', 'input');
    const detailsSubtitle = createEl('details__subtitle', 'p');
    const detailsCardBox = createEl('details__card_box', 'div');
    const detailsCard = createEl('details__card', 'div');
    const detailsCardImg = <HTMLImageElement>createEl('details__card_img', 'img');
    const detailsCardNumber = <HTMLInputElement>createEl('details__card_number input', 'input');
    const detailsValid = createEl('details__valid', 'div');
    const detailsValidTitleVal = createEl('details__valid_title', 'p');
    const detailsDate = <HTMLInputElement>createEl('details__date input', 'input');
    const detailsValidTitleCVV = createEl('details__valid_title', 'p');
    const detailsCVV = <HTMLInputElement>createEl('details__cvv input', 'input');
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
    detailsDate.placeholder = 'Valid Thru';
    detailsValidTitleCVV.textContent = 'CVV:';
    detailsCVV.type = 'text';
    detailsCVV.placeholder = 'Code';
    btnConfirm.type = 'button';
    btnConfirm.textContent = 'Confirm';

    btnConfirm.addEventListener('click', () => {
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
            main.children[0].innerHTML = '';
            sectionOrder.remove();
            setProdouctsValues();
        }, 1500);
        setTimeout(() => {
            main.children[0].remove();
        }, 1600);
    });

    const regexName = /^[A-Z]{1}[a-z]{2,10} [A-Z]{1}[a-z]{2,10}$/gm;
    const regexPhone = /^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)\+[0-9]{13}$/gm;
    const regexAddress = /^[A-Z,a-z]{5,10} [A-Z,a-z]{5,10} [A-Z,a-z]{5,10}$/gm;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const regexCardNumber = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/gm;
    const regexDate = /^[0-9]{2}\/[0-9]{2}$/gm;
    const regexCVV = /^[0-9]+$/;

    detailsInputName.addEventListener('input', () => {
        detailsInputName.classList.add('error');
        if (regexName.test(detailsInputName.value)) {
            detailsInputName.classList.remove('error');
        }
    });

    detailsInputPhone.addEventListener('input', () => {
        detailsInputPhone.value = detailsInputPhone.value.replace(/[^\d,+]/g, '');
        detailsInputPhone.classList.add('error');
        if (regexPhone.test(detailsInputPhone.value)) {
            detailsInputPhone.classList.remove('error');
        }
    });
    detailsInputAddress.addEventListener('input', () => {
        detailsInputAddress.classList.add('error');
        if (regexAddress.test(detailsInputAddress.value)) {
            detailsInputAddress.classList.remove('error');
        }
    });
    detailsInputEmail.addEventListener('input', () => {
        detailsInputEmail.classList.add('error');
        if (regexEmail.test(detailsInputEmail.value)) {
            detailsInputEmail.classList.remove('error');
        }
    });

    detailsCardNumber.addEventListener('input', () => {
        detailsCardNumber.value = detailsCardNumber.value.replace(/[^\d\s]/g, '');

        if (detailsCardNumber.value.length < 19) {
            detailsCardNumber.classList.add('error');
        }

        if (detailsCardNumber.value.length > 19) {
            detailsCardNumber.value = detailsCardNumber.value.slice(0, 19);
        }
        if (regexCardNumber.test(detailsCardNumber.value) && detailsCardNumber.value.length === 19) {
            detailsCardNumber.classList.remove('error');
        }
        if (detailsCardNumber.value[0] === '4') {
            detailsCardImg.style.backgroundImage = 'url(../../../assets/visa.png)';
        }
        if (detailsCardNumber.value[0] === '5') {
            detailsCardImg.style.backgroundImage = 'url(../../../assets/master-card.png)';
        }
        if (detailsCardNumber.value[0] === '6') {
            detailsCardImg.style.backgroundImage = 'url(../../../assets/union-pay.png)';
        }
        if (detailsCardNumber.value.length === 0) {
            detailsCardImg.style.backgroundImage = 'url(../../../assets/card-demo.png)';
        }
    });
    detailsDate.addEventListener('input', () => {
        detailsDate.value = detailsDate.value.replace(/[^\d]/g, '');
        detailsDate.classList.add('error');

        // if (detailsDate.value.length < 5) {
        //   detailsDate.classList.add('error');
        // }
        // if (detailsDate.value[2] != '/' ) {
        //   detailsDate.classList.add('error');
        //   console.log(detailsDate.value[2]);
        // }
        // if(detailsDate.value.length > 5) {
        //   detailsDate.value = detailsDate.value.slice(0, 5);
        // }
    });
    detailsCVV.addEventListener('input', () => {
        detailsCVV.value = detailsCVV.value.replace(/[^\d]/g, '');
        detailsCVV.classList.add('error');

        if (detailsCVV.value.length > 3) {
            detailsCVV.value = detailsCVV.value.slice(0, 3);
        }
        if (regexCVV.test(detailsCVV.value) === true && detailsCVV.value.length === 3) {
            detailsCVV.classList.remove('error');
        }
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
