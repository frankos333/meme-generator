'use strict';

const SAVED_MEMES = 'savedMemes'
var gImgs = [];
var gSavedMemes;
var gElCanvas = document.getElementById('canvas');


var gMeme = {
    selectedImgId: 1
}
function resetMeme() {
    gMeme.selectedLineIdx = 0;
    gMeme.lines = [
        {
            txt: 'insert text here',
            font: 'impact',
            size: 35,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: 50,
            x: gElCanvas.width / 2
        },
        {
            txt: 'insert text here',
            font: 'impact',
            size: 35,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: gElCanvas.height - 50,
            x: gElCanvas.width / 2
        }
    ]
}

function _createImgs() {
    gImgs.push(_createImg(1, `imgs-square/1.jpg`, ['angry', 'popular']));
    gImgs.push(_createImg(2, `imgs-square/2.jpg`, ['love', 'puppy', 'dogs']));
    gImgs.push(_createImg(3, `imgs-square/3.jpg`, ['baby', 'sleep', 'dogs']));
    gImgs.push(_createImg(4, `imgs-square/4.jpg`, ['cats']));
    gImgs.push(_createImg(5, `imgs-square/5.jpg`, ['success', 'baby']));
    gImgs.push(_createImg(6, `imgs-square/6.jpg`, ['wonder']));
    gImgs.push(_createImg(7, `imgs-square/7.jpg`, ['baby', 'shocked']));
    gImgs.push(_createImg(8, `imgs-square/8.jpg`, ['wonder', 'smile']));
    gImgs.push(_createImg(9, `imgs-square/9.jpg`, ['laugh', 'popular']));
    gImgs.push(_createImg(10, `imgs-square/10.jpg`, ['laugh', 'baby', 'smirk']));
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


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getSavedMemes() {
    return gSavedMemes;
}


function setLineText(lineText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = lineText;
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}
function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function setFontSize(fontSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize;
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily;
}

function setAlignText(alignDir) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignDir;
}

function setMeme(imgId) {
    // gMeme.lines.forEach(line => line.txt = 'insert text here')
    resetMeme();
    gMeme.selectedImgId = imgId;
}

function changeFontSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 5 && diff < 0) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changeLineHeight(diff) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.y += diff;
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function saveMeme(savedMeme) {
    gSavedMemes.push(savedMeme)
    saveToStorage(SAVED_MEMES, gSavedMemes)
}
function addLine() {
    gMeme.lines.push({
        txt: 'insert text here',
        font: 'impact',
        size: 35,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        y: gElCanvas.height / 2,
        x: gElCanvas.width / 2
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}