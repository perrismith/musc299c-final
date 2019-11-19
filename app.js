
/*
|--------------------------------------------------------------------------
| CONSTANTS
|--------------------------------------------------------------------------
*/

VF = Vex.Flow;
var notes = [];
var bassNotes = [];

var dict = {
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd',
    'e': 'e',
    'f': 'f',
    'g': 'g',
    'h': 'a',
    'i': 'b', 
    'j': 'c',
    'k': 'd',
    'l': 'e',
    'm': 'f',
    'n': 'g',
    'o': 'a',
    'p': 'b',
    'q': 'c',
    'r': 'd',
    's': 'e',
    't': 'f',
    'u': 'g',
    'v': 'a',
    'w': 'b',
    'x': 'c', 
    'y': 'd',
    'z': 'e',
    ' ': 'b' //for spaces, the note only dictates the postion of the rest on the stave 

  };

  var durations = {
    1: ['1'],
    2: ['2','2'],
    3: ['4','4','2'],
    4: ['4','4','4','4'],
    5: ['4','4','4','8','8'],
    6: ['8','8','4','8','8','4'],
    7: ['8','8','8','8','8','8','4'],
    8: ['8','8','8','8','8','8','8', '8'],
  };

/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/

function shuffle(arra1) {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
// Pick a random index
      index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
      ctr--;
// And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
  }
  return arra1;
}


//maps our chars to music note letters
function parseString(str) {
    var arr = str.toLowerCase().split('');

    arr = arr.map(x => dict[x]);

    return arr;

  }

//puts all of our notes into an array and generates
function create(str){
  notes = [];
  bassNotes= [];
  

  var arr = parseString(str);
  var index = 0;
  arr.forEach(function(note){

    var duration = durations[str.length];
    duration = shuffle(duration);

    var note = note.concat("/4");    

    notes.push(new VF.StaveNote({clef: "treble", keys: [note], duration: duration[index++]}))
  });   

  generateMusic();
}

//button handler
$("#submit_button").on("click", function(){        
    var STRING = document.getElementById('input_field').value;
    create(STRING);

});

//starting music notes
function startUp(){
  create('Maryland');
}

function clearStaffs(){
  const staff = document.getElementById('boo');
  while (staff.hasChildNodes()) {
    staff.removeChild(staff.lastChild);
  }

}

/*
|--------------------------------------------------------------------------
| GENERATE MUSIC
|--------------------------------------------------------------------------
*/



function generateMusic(){

  clearStaffs();

  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.getElementById("boo")
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(700, 400);
  var context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  //Treble Clef
  var trebleBar = new Vex.Flow.Stave(20, 50, 600);
  trebleBar.setEndBarType(Vex.Flow.Barline.type.END);
  trebleBar.addClef("treble").addTimeSignature("4/4").setContext(context).draw();


  var trebleNotes = notes;
  var beams = VF.Beam.generateBeams(trebleNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, trebleBar, trebleNotes);
  beams.forEach(function(b) {b.setContext(context).draw()});

  //Bass Clef
  var bassBar = new Vex.Flow.Stave(20, 200, 600);
  bassBar.setEndBarType(Vex.Flow.Barline.type.END);

  bassBar.addClef("bass").addTimeSignature("4/4").setContext(context).draw();
  
  var bassNotes = [
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "2" }),
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "2" }),
  ]

  var beams = VF.Beam.generateBeams(trebleNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, bassBar, bassNotes);
  beams.forEach(function(b) {b.setContext(context).draw()});

}

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

startUp();


// var trebleNotes = [
//   new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
//   new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
//   new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
//   new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
//   new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
//   new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
//   new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
//   new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
// ];