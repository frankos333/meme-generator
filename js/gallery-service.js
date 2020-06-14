'use strict'
var gImgs = [];

function createImgs() {
    gImgs.push(_createImg(1, `imgs-square/1.jpg`, ['angry', 'popular']));
    gImgs.push(_createImg(2, `imgs-square/2.jpg`, ['love', 'puppy', 'dogs']));
    gImgs.push(_createImg(3, `imgs-square/3.jpg`, ['baby', 'sleep', 'dogs']));
    gImgs.push(_createImg(4, `imgs-square/4.jpg`, ['cats']));
    gImgs.push(_createImg(5, `imgs-square/5.jpg`, ['success', 'baby']));
    gImgs.push(_createImg(6, `imgs-square/6.jpg`, ['wonder']));
    gImgs.push(_createImg(7, `imgs-square/7.jpg`, ['baby', 'shocked']));
    gImgs.push(_createImg(8, `imgs-square/8.jpg`, ['wonder', 'smile']));
    gImgs.push(_createImg(9, `imgs-square/9.jpg`, ['laugh', 'popular']));
    gImgs.push(_createImg(10, `imgs-square/10.jpg`, ['laugh','smirk']));
    gImgs.push(_createImg(11, `imgs-square/11.jpg`, ['kiss']));
    gImgs.push(_createImg(12, `imgs-square/12.jpg`, ['pointer']));
    gImgs.push(_createImg(13, `imgs-square/13.jpg`, ['cheers', 'smirk']));
    gImgs.push(_createImg(14, `imgs-square/14.jpg`, ['shocked', 'popular']));
    gImgs.push(_createImg(15, `imgs-square/15.jpg`, ['popular', 'lotd']));
    gImgs.push(_createImg(16, `imgs-square/16.jpg`, ['smirk']));
    gImgs.push(_createImg(17, `imgs-square/17.jpg`, ['pointer']));
    gImgs.push(_createImg(18, `imgs-square/18.jpg`, ['movie', 'pointer', 'popular']));
}


function _createImg(id, url, keywords) {
    return { id, url, keywords }
}

function getImgs() {   
    return gImgs;
}
