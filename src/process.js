var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var pitchElem = document.getElementById( "pitch" );
var noteElem = document.getElementById( "note" );

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}

function print(pitch){
    pitchElem.innerText = pitch > 0 ? pitch : '--';
    noteElem.innerText = pitch > 0 ? noteStrings[noteFromPitch(pitch)%12] : '--';
}

var source = Rx.Observable.fromEvent(document, 'pitchDetected');

var subscription = source
    .buffer(function() { return Rx.Observable.timer(250); })
    .filter(function(e) { return e.length > 0; })
    .subscribe(function(e) {
        var sum = 0;
        var avg = 0;
        for (i = 0; i < e.length; i++) { 
            sum += e[i].detail.pitch;
        }
        print(Math.round(sum/e.length));
    });

captureAudio();