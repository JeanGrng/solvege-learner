function editNode(newText, newID, oldID, parentID) {
    let Elt = document.createElement("p");
    Elt.id = newID;
    Elt.textContent = newText;
    if (!document.getElementById("formNote").checked){
        Elt.style.display = "none";
    }
    document.getElementById(parentID).replaceChild(Elt, document.getElementById(oldID));
}

function copyTab(oldTab){
    let newTab = [];
    for (var i = 0; i < oldTab.length; i++) {
        newTab.push(oldTab[i]);
    }
    return newTab;
} 

function randomNote() {
    let noteTab = ["Do","Do#","Réb","Ré","Ré#","Mib","Mi","Fa","Fa#","Solb","Sol","Sol#","Lab","La","La#","Sib","Si"]
    return noteTab[Math.floor(17*Math.random())];
}

function noteTranslate(stringToNote, note){
    let noteTab = ["Do",0,"Ré",0,"Mi","Fa",0,"Sol",0,"La",0,"Si"]
    if (stringToNote) {
        if (!noteTab[note]) {
        	return noteTab[note-1]+"#";
        }
        else {
        	return noteTab[note];
        }
    }
    else {
        if (note.includes("b")) {
            return noteTab.indexOf(note.slice(0, note.length-1))-1;
        }
        else if (note.includes("#")){
            return noteTab.indexOf(note.slice(0, note.length-1))+1;
        }
        else{
            return noteTab.indexOf(note);
        }
    }
}

function timer(id, i) {
    let timerElt = document.getElementById(id);
    let timer = parseInt(timerElt.textContent)+i;
    if (timer<0 && i<0) {timer -= i;}
    timerElt.textContent = timer;
}

function notePush(pushedNote){
    let note = copyTab(pushedNote);
    for (var i = 0; i < note.length; i++) {
        note[i] %= 12;
    }
    if (note.includes(noteX[0])){
        timer("score", 1);
        noteX.shift();
        noteX.push(Math.floor(12*Math.random()))
        if (document.getElementById("formSolfege").checked) {
            for (var j = 0; j < noteX.length; j++) {
                while ([1,3,6,8,10].includes(noteX[j])) {
                    noteX[j] = Math.floor(12*Math.random())
                }
            }
        }
        let id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        editNode(noteTranslate(1, noteX[0]), "note", "note", "content");
        drawSolvege(noteX);
    }
    else {
        timer("score", -1);
    }
}

var noteX = [];

for (var i = 0; i < 5; i++) {
    noteX.push(Math.floor(12*Math.random()))
    if (document.getElementById("formSolfege").checked) {
        do {
            noteX[i] = Math.floor(12*Math.random())
        } while ([1,3,6,8,10].includes(noteX[i]));
    }
}

editNode(noteTranslate(1, noteX[0]), "note", "note", "content");

let formNote = document.getElementById("formNote");
let formSolfege = document.getElementById("formSolfege");
var formClef = document.getElementsByName("clefEx");
let formLevel = document.getElementsByName('levelEx');
let baliseNote = document.getElementById("note");
let baliseSolfege = document.getElementById("solfege");
let BaliseFormSolvege = document.getElementById("BaliseFormSolvege");

formNote.checked = true;
formSolfege.checked = true;
formClef[0].checked = true;
formLevel[0].checked = true;
baliseNote.style.display = "block";

formNote.addEventListener("change", function (e) {
    baliseNote = document.getElementById("note");
    if (e.target.checked){
        baliseNote.style.display = "block";
    }
    else {
        baliseNote.style.display = "none";
    }
});

formSolfege.addEventListener("change", function (e) {
    if (e.target.checked) {
        baliseSolfege.style.display = "block";
        BaliseFormSolvege.style.display = "block";
    }
    else {
        baliseSolfege.style.display = "none";
        BaliseFormSolvege.style.display = "none";
    }
});

for (var i = 0; i < formClef.length; i++) {
    formClef[i].addEventListener("change", function (e) {
        drawSolvegeSheet()
        drawSolvege(noteX)
    });
}

for (var i = 0; i < formLevel.length; i++) {
    formLevel[i].addEventListener("change", function (e) {
        drawSolvege(noteX)
    });
}

drawSolvege(noteX);
