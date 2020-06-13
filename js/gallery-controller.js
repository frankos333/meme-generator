'use strict';

function renderGallery() {
    const imgs = getImgs();
    let strHTML = imgs.map(img => `<img id=${img.id} src="${img.url}" onclick="onSetMeme(this.id)" />`).join('')
    document.querySelector('.gallery').innerHTML = strHTML;
}

