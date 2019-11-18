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

function parseString(str) {
    var arr = str.toLowerCase().split('');

    arr = arr.map(x => dict[x]);

    return arr;

  }


VF = Vex.Flow;

 // Create an SVG renderer and attach it to the DIV element named "boo".
 var div = document.getElementById("boo")
 var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

 // Configure the rendering context.
 renderer.resize(500, 500);
 var context = renderer.getContext();
 context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

 // Create a stave of width 400 at position 10, 40 on the canvas.
 var stave = new VF.Stave(10, 40, 400);

 // Add a clef and time signature.
 stave.addClef("treble").addTimeSignature("4/4");


 // Connect it to the rendering context and draw!
 stave.setContext(context).draw();


//  var notes = [
//     // A quarter-note C.
//     new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
  
//     // A quarter-note D.
//     new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  
//     // A quarter-note rest. Note that the key (b/4) specifies the vertical
//     // position of the rest.
//     new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  
//     // A C-Major chord.
//     new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
//   ];
  
  // Create a voice in 4/4 and add above notes
  var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  voice.addTickables(notes);
  
  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);


// Render voice
voice.draw(context, stave);