/* imports ------------------------------------------------- */

import { createEl, appendEl } from '../types/types';

/* function convert images into base64 string and find similar images addimg to images container only unics ------------------------------------------------- */

export function checkImagesForDulicatesByUrl(
    imagesUrls: string[],
    mainImage: HTMLElement,
    imagesContainer: HTMLElement
) {
    const canvasUrl: string[] = [];

    for (let i = 0; i < imagesUrls.length; i++) {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imagesUrls[i];

        img.onload = () => {
            if (!canvasUrl.length) {
                canvasUrl.push(getBase64Image(img));

                const productImage = createEl('product-page__image', 'div');
                productImage.style.backgroundImage = `url(${imagesUrls[i]})`;

                productImage.addEventListener('click', () => {
                    mainImage.style.backgroundImage = productImage.style.backgroundImage;
                });

                appendEl(imagesContainer, productImage);
            } else {
                const base = getBase64Image(img);
                if (canvasUrl.every((url) => url !== base)) {
                    canvasUrl.push(base);

                    const productImage = createEl('product-page__image', 'div');
                    productImage.style.backgroundImage = `url(${imagesUrls[i]})`;

                    productImage.addEventListener('click', () => {
                        mainImage.style.backgroundImage = productImage.style.backgroundImage;
                    });

                    appendEl(imagesContainer, productImage);
                }
            }
        };
    }
}

/* function to convert image to base64 format ------------------------------------------------- */

function getBase64Image(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx !== null ? ctx.drawImage(img, 0, 0) : console.error('No image data!');

    const dataURL = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}
