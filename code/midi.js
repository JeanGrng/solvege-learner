function suprTab(tab, arg) {
    let index = tab.indexOf(arg);
    let newTab = []
    for (var i = 0; i < tab.length; i++) {
        if (i !== index) {newTab.push(tab[i]);}
    }
    return newTab
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}
function onMIDISuccess(midiAccess) {
    for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}
function getMIDIMessage(message) {
    let command = message.data[0];
    let note = message.data[1]-24;
    let velocity = (message.data.length > 2) ? message.data[2] : 0;0
    if (command === 254) {command = 248;}
    
    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {
    			pushedNote.push(note);
            	drawPiano(pushedNote);
                notePush(pushedNote);
            } 
            else {
    			pushedNote = suprTab(pushedNote, note);
            	drawPiano(pushedNote);
            }
            break;
        case 128: 
            break;
    }
}

var pushedNote = [];

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} 
else {
    console.log('WebMIDI is not supported in this browser.');
}
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);