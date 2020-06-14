'use strict';

var gElCanvas;
var gCtx;
var gIsDraggable = false;



function onInit() {
    getSavedMemes();
    createImgs();
    renderGallery();
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    setTouchListeners();//supporting Mobline
    resizeCanvas(); // sets canvas size >>>> according to the container
    resetMeme(); // sets the lines back to default settings
    drawMeme(); // draws the selected meme
    document.querySelector('.meme-editor').classList.add('hide');
    document.querySelector('.memes').classList.add('hide');
    gElCanvas.onmousedown = canvasClicked; // function
    gElCanvas.onmouseup = mouseUp; // function
    gElCanvas.onmousemove = onMoveLine; // function 
}

function openBgcs() {
    document.querySelector('.backgrounds').classList.toggle('hide');
}

function closeBgcsBar() {
    document.querySelector('.backgrounds').classList.add('hide');
}
function onSetBgc(elBgcBtn) {
    var bgcName = elBgcBtn.id;
    var bgc = gBgcs.find(bgc => bgc.name === bgcName);
    document.body.style.backgroundImage = `url('${bgc.url}')`;

}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function drawMeme() {
    const meme = getMeme();
    var img = new Image()
    img.src = `./imgs-square/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        meme.lines.forEach((line, idx) => {

            if (meme.selectedLineIdx === idx) {
                gCtx.fillStyle = 'rgba(255,255,255,0.5) ';
                gCtx.fillRect(0, line.y - line.size, gElCanvas.width, line.size);
            }
            gCtx.strokeStyle = line.strokeColor;
            gCtx.fillStyle = line.color;
            gCtx.font = line.size + 'pt ' + line.font;
            gCtx.textAlign = line.align;
            gCtx.fillText(line.txt.toUpperCase(), line.x, line.y);
            gCtx.strokeText(line.txt.toUpperCase(), line.x, line.y);
        })
    }
}

function onEdit(ev) {
    if (document.querySelector('.meme-editor').classList.contains('hide')) return;
    const line = getCurrLine();
    if (ev.key === 'Backspace') {
        line.txt = line.txt.slice(0, -1)
        drawMeme();
        return;
    }
    else if (ev.key.length > 1) return;
    line.txt += ev.key;
    drawMeme();
}
function setTouchListeners() {
    gElCanvas.addEventListener('touchstart', (ev) => {
        ev.preventDefault()
        canvasClicked(event)
    })
    gElCanvas.addEventListener('touchend', (ev) => {
        ev.preventDefault()
        gIsDraggable = false;
    })
    gElCanvas.addEventListener('touchmove', (ev) => {
        onMoveLine(ev)
    })
}
function getTouchPos(canvas, mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: mouseEvent.touches[0].clientX - rect.left,
        y: mouseEvent.touches[0].clientY - rect.top
    };
}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onSetLineText(lineText) {
    setLineText(lineText);
    drawMeme();
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily);
    drawMeme();
    document.querySelector('[name="fontFamily"]').style.fontFamily = document.querySelector('[name="fontFamily"]').value;
}

function onSetMeme(imgId) {
    setMeme(imgId);
    drawMeme()
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
    drawMeme()
}

function onChangeLineHeight(diff) {
    changeLineHeight(diff);
    const meme = getMeme();
    drawMeme(meme.selectedImgId)
}

function onSetFontColor(color) {
    setFontColor(color);
    drawMeme();
    document.querySelector('[for="fontColor"]').style.color = color;
}
function onSetStrokeColor(color) {
    setStrokeColor(color);
    drawMeme();
    document.querySelector('[for="fontStroke"]').style.color = color;
}


function onSetAlignText(elAlignBtn) {
    setAlignText(elAlignBtn.id);
    drawMeme()
    setBtnMode(elAlignBtn)
}

function onSwitchLine() {
    switchLine();
    setInputText();
    drawMeme();
}

function setInputText() {
    let elLineInput = document.querySelector('[name="lineText"]');
    elLineInput.value = getCurrLine().txt;
    elLineInput.focus()
}
function setBtnMode(elAlignBtn) {
    document.querySelectorAll('.font-edit button').forEach(btn => btn.classList.remove('mode'));
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
    drawMeme()
}
function onRemoveLine() {
    removeLine();
    drawMeme();
}


function canvasClicked(ev) {
    if (ev.type === 'click' || ev.type === 'keydown') {
        switchLine();
        setInputText();
        drawMeme();
    }
    const meme = getMeme();
    if (ev.type === 'touchstart') ev.offsetY = getTouchPos(gElCanvas, ev).y
    meme.lines.forEach((line, idx) => {
        if (meme.selectedLineIdx === idx) gIsDraggable = true;
        else if (ev.offsetY <= line.y && ev.offsetY >= line.y - line.size) {
            meme.selectedLineIdx = idx;
            drawMeme();
            gIsDraggable = true;
        }
    })
}


function mouseUp() {
    gElCanvas.style.cursor = 'default';
    gIsDraggable = false;
}
function onMoveLine(ev) {
    ev.preventDefault();
    if (!gIsDraggable) return;
    gElCanvas.style.cursor = 'all-scroll';
    ev.preventDefault();
    if (ev.type === 'touchmove') {
        var touchPos = getTouchPos(gElCanvas, ev);
        moveLine(touchPos.x, touchPos.y)

    } else {
        moveLine(ev.offsetX, ev.offsetY)
    }
    drawMeme()
}