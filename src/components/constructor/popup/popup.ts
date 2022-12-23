import { createEl, appendEl } from '../elements/elements';
import { checkedQuerySelector } from '../../../types/exports';
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
    appendEl(detailsCardBox, detailsCardNumber);
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
    // detailsInputPhone.setAttribute('pattern', '(\+)[0-9]{13}');
    detailsInputPhone.placeholder = 'Phone number';
    detailsInputAddress.type = 'text';
    detailsInputAddress.placeholder = 'Delivery address';
    detailsInputEmail.type = 'email';
    detailsInputEmail.placeholder = 'E-mail';
    detailsSubtitle.textContent = 'Credit card details';
    detailsCardNumber.type = 'number';
    // detailsCardNumber.setAttribute('pattern', '^\d+$');
    detailsCardNumber.placeholder = 'Card number';
    detailsValidTitleVal.textContent = 'Valid:';
    detailsDate.type = 'number';
    // detailsDate.setAttribute('pattern', '^[0-9]+$');
    detailsDate.placeholder = 'Valid Thru';
    detailsValidTitleCVV.textContent = 'CVV:';
    detailsCVV.type = 'number';
    // detailsCVV.setAttribute('pattern', '^[0-9]+$');
    detailsCVV.placeholder = 'Code';
    btnConfirm.type = 'buton';
    btnConfirm.textContent = 'Confirm';

    btnConfirm.addEventListener('click', () => {
        detailsTitle.remove();
        detailsInputName.remove();
        detailsInputPhone.remove();
        detailsInputAddress.remove();
        detailsInputEmail.remove();
        detailsSubtitle.remove();
        detailsCardNumber.remove();
        detailsValidTitleVal.remove();
        detailsDate.remove();
        detailsValidTitleCVV.remove();
        detailsCVV.remove();
        btnConfirm.remove();
        detailsCardBox.remove();
        const order = createEl('order', 'p');
        appendEl(details, order);
        order.style.fontSize = '2rem';
        order.style.color = '#112D4E';
        order.textContent = 'Thank you for order!';
        setTimeout(() => {
            details.classList.add('close');
            bgLayer.classList.add('close');
        }, 2000);
        setTimeout(() => {
            window.location.href = 'http://localhost:8080';
        }, 1500);
        setTimeout(() => {
            sectionDetails.remove();
        }, 3000);
    });
    // detailsInputPhone.addEventListener('input', () => {
    //   if (detailsInputPhone.value[0] != '+' && detailsInputPhone.value.length < 9) {
    //     detailsInputPhone.classList.add('error');
    //   }
    //   if (detailsInputPhone.value.length >= 9 && detailsInputPhone.value[0] === '+') {
    //     detailsInputPhone.classList.remove('error');
    //   }
    //   if(detailsInputPhone.value.length > 13) {
    //     detailsInputPhone.value = detailsInputPhone.value.slice(0, 13);
    //   }
    // });
    // detailsCVV.addEventListener('input', () => {
    //   if (detailsCVV.value.length < 3) {
    //     detailsCVV.classList.add('error');
    //   }
    //   if (detailsCVV.value.length === 3) {
    //     detailsCVV.classList.remove('error');
    //   }
    //   if(detailsCVV.value.length > 3) {
    //     detailsCVV.value = detailsCVV.value.slice(0, 3);
    //   }
    // });

    document.addEventListener('click', (e) => {
      const targetDocument = <HTMLDivElement>e.target;
      const its_details = targetDocument == details || details.contains(targetDocument);
      const its_button = targetDocument == button;
      const details_is_active = details.classList.contains('details');
        if (!its_details && !its_button && details_is_active) {
            details.classList.add('close');
            // setTimeout(() => {
              bgLayer.classList.add('close');
            // }, 500);
            // setTimeout(() => {
              sectionDetails.remove();
            // }, 1000);
        }
    });
}
