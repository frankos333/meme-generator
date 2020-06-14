'use strict';

const SAVED_MEMES = 'savedMemes'

var gSavedMemes;
var gElCanvas = document.getElementById('canvas');
var gBgcs = [
    { name: 'default', url: 'img-cover/default.jpg'},
    { name: 'cats', url: 'img-cover/meme2.jpg'},
    { name: 'dogs', url: 'img-cover/default.jpg'},
    { name: 'vip', url: 'img-cover/meme3.jpg'},
    { name: 'anime', url: 'img-cover/meme6.jpg' },
    { name: 'babies', url: 'img-cover/meme10.jpeg'},
];
var gKeywords;

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




function getMeme() {
    return gMeme;
}



function getSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEMES);
    if (!gSavedMemes) gSavedMemes = [];
    return gSavedMemes;
}
function getCurrLine(){
    return getMeme().lines[getMeme().selectedLineIdx];
}
function moveLine(xPos,yPos){
        const line = getCurrLine();
        line.x = xPos;
        line.y = yPos;
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