'use strict';

function renderGallery() {
    const imgs = getImgs();
    let strHTML = imgs.map(img => `<img id=${img.id} src="${img.url}" onclick="onSetMeme(this.id)" />`).join('')
    document.querySelector('.gallery').innerHTML = strHTML;
}
function filterMemes(elTxt) {
    const imgs = getImgs();
    const filteredImgs = imgs.filter(img => {
        for (const keyword of img.keywords) {
            if (keyword.includes(elTxt)) return img
        }
    })
    
    let strHTML = filteredImgs.map(img => `<img id=${img.id} src="${img.url}" onclick="onSetMeme(this.id)" />`).join('')
    document.querySelector('.gallery').innerHTML = strHTML;

}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
