'use strict';

var gElCanvas;
var gCtx;

function onInit() {
    gSavedMemes = loadFromStorage(SAVED_MEMES);
    if (!gSavedMemes) gSavedMemes = [];
    _createImgs();
    renderGallery();
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas(); // sets canvas size >>>> according to the container
    resetMeme(); // sets the lines back to default settings
    renderMeme(); // draws the selected meme
    document.querySelector('.meme-editor').classList.add('hide');
    document.querySelector('.memes').classList.add('hide');
}

function renderMeme() {
    drawMeme(getMeme().selectedImgId);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function drawMeme(imgId) {
    const meme = getMeme();
    var img = new Image()
    img.src = `./imgs-square/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        meme.lines.forEach((line) => {
            gCtx.strokeStyle = line.strokeColor;
            gCtx.fillStyle = line.color;
            gCtx.font = line.size + 'px ' + line.font;
            gCtx.textAlign = line.align;
            gCtx.fillText(line.txt.toUpperCase(), line.x, line.y);
            gCtx.strokeText(line.txt.toUpperCase(), line.x, line.y);
        })
    }
}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onSetLineText(lineText) {
    setLineText(lineText);
    renderMeme();
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily);
    renderMeme();
    document.querySelector('[name="fontFamily"]').style.fontFamily = document.querySelector('[name="fontFamily"]').value;
}

function onSetMeme(imgId) {
    setMeme(imgId);
    renderMeme()
    setInputText();
    document.querySelector('.meme-editor').classList.remove('hide');
    document.querySelector('.meme-gallery').classList.add('hide');
    document.querySelector('.memes').classList.add('hide');
}

function openGallery() {
    document.querySelector('.meme-gallery').classList.remove('hide');
    document.querySelector('.meme-editor').classList.add('hide');
    document.querySelector('.memes').classList.add('hide');
}

function openSavedMemes() {
    document.querySelector('.meme-gallery').classList.add('hide');
    document.querySelector('.meme-editor').classList.add('hide');
    document.querySelector('.memes').classList.remove('hide');
    renderSavedMemes();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderMeme()
}

function onChangeLineHeight(diff) {
    changeLineHeight(diff);
    const meme = getMeme();
    drawMeme(meme.selectedImgId)
}

function onSetFontColor(color) {
    setFontColor(color);
    renderMeme();
    document.querySelector('[for="fontColor"]').style.color = color;
}
function onSetStrokeColor(color) {
    setStrokeColor(color);
    renderMeme();
    document.querySelector('[for="strokeColor"]').style.color = color;
}


function onSetAlignText(elAlignBtn) {
    setAlignText(elAlignBtn.id);
    renderMeme()
    setBtnMode(elAlignBtn)
}

function onSwitchLine() {
    switchLine()
    setInputText()
    drawMeme();
}

function setInputText() {
    let elLineInput = document.querySelector('[name="lineText"]');
    elLineInput.value = getMeme().lines[getMeme().selectedLineIdx].txt;
    elLineInput.focus()
}
function setBtnMode(elAlignBtn) {
    document.querySelectorAll('.align-text button').forEach(btn => btn.classList.remove('mode'));
    elAlignBtn.classList.add('mode');
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'New_Meme';
}

function onSaveMeme() {
    var savedPic = gElCanvas.toDataURL("image/png");
    saveMeme(savedPic);
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes();
    var strHTML;
    if (!savedMemes || savedMemes.length === 0) strHTML = 'There are no saved memes yet!'
    else strHTML = savedMemes.map(meme => {
        return `<img src="${meme}" />`;
    }).join('')
    document.querySelector('.saved-memes-container').innerHTML = strHTML;
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onRemoveLine() {
    removeLine();
    renderMeme();
}

