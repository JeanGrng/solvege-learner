function draw(note) {
	drawPiano(note);
	drawSolvegeSheet()
}

function drawPiano(note) {
	let canvas = document.getElementById('piano');
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		var k = window.innerWidth/1127;
		canvas.height = 138*k
		let n = -1;
		ctx.strokeStyle = 'rgb(0, 0, 0)';

		for (let i = 0; i < 49; i++) {

			if (i % 7 === 3 || i % 7 === 0) {n++;}
			else {n+=2;}

			ctx.fillStyle = 'rgb(248, 248, 248)';
			if (note.includes(n)) {ctx.fillStyle = 'rgb(0, 174, 226)';}

			ctx.fillRect(23*k*i, 0, 23*k, 138*k);
			ctx.strokeRect(23*k*i, 0, 23*k, 138*k)


			if (i % 7 !== 0 && i % 7 !== 3) {
				n-=1;

				ctx.fillStyle = 'rgb(0, 0, 0)';
				if (note.includes(n)) {ctx.fillStyle = 'rgb(0, 174, 226)';}
				ctx.fillRect((23*i-7)*k,0,12*k,85*k);
				ctx.strokeRect((23*i-7)*k,0,12*k,85*k);

				n+=1;
			}
		}
  	}
}

function drawSolvegeSheet() {
	let canvas = document.getElementById('solfege');

  	if (canvas.getContext) {
	    let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

	    let clefForm = document.getElementsByName('clefEx');
		let clef = new Image();

		if(clefForm[0].checked) {
			clef.src = "image/sol.png";

			clef.addEventListener('load', function() {
				ctx.drawImage(clef, 30, 50, 50, 140);
			}, false);
		}   
		else {
			clef.src = "image/fa.png";

			clef.addEventListener('load', function() {
				ctx.drawImage(clef, 30, 80, 51, 60);
			}, false);
		}

	    ctx.lineWidth = 2;
	    for (let i = 4; i < 9; i++) {
	    	ctx.beginPath();
		    ctx.moveTo(25, 20*i);
		    ctx.lineTo(700, 20*i);
		    ctx.stroke();
	    }
	}
}

function drawSolvege(noteX) {
	let canvas = document.getElementById('solfege');

  	if (canvas.getContext) {
	    let ctx = canvas.getContext('2d');
		let note = noteBecarre(copyTab(noteX));
	    let level = document.getElementsByName('levelEx');
		let value;
		var timeoutId;
        let id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
		for(let i = 0; i < level.length; i++){
			if(level[i].checked){
				value = level[i].value;
			}
		}	    

		let anim = 0;

		let clefForm = document.getElementsByName('clefEx');

		if(clefForm[0].checked) {
			for (var i = 0; i < note.length; i++) {
				note[i] = (11-note[i])+7*value;
			}
		}   
		else {
			for (var i = 0; i < note.length; i++) {
				note[i] = (6-note[i])+7*value;
			}
		}

		for (let j = 130; j > -1; j--) {
	    	timeoutID = window.setTimeout(function() {
				ctx.clearRect(120, 0, canvas.width-120, 79);
				for (let i = 4; i < 9; i++) {
					ctx.clearRect(120, 20*i+1, canvas.width-120, 18);
				}
				ctx.clearRect(120, 161, canvas.width-120, 79);

			    for (let i = 0; i < note.length; i++) {
			    	if (value === "5") {
			    		value = Math.floor(4*Math.random())-1;
			    		anim += (-0.000355*(j*j-130*j))/5;
			    		drawNote(i+1, note[i], 130-anim);
			    	}
			    	else {
			    		anim += (-0.000355*(j*j-130*j))/5;
			    		drawNote(i+1, note[i], 130-anim);
			    	}
			    }
	    	}, 5*(130-j));
	    }
	}
}

function drawNote(order, note, anim) {
	let canvas = document.getElementById('solfege');
	ctx = canvas.getContext('2d');

	if (note > 22) {note -= 7;}
	else if (note < 2) {note += 7;}

	ctx.beginPath();
	ctx.ellipse(130*order+14+anim, 10*note, 14, 10, 150 * Math.PI/180, 0, 2 * Math.PI);
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.lineCap = "round";

	if (note < 13) {
		ctx.beginPath();
		ctx.moveTo(130*order+3+anim, 10*note+3);
		ctx.lineTo(130*order+3+anim, 10*note+79);
		ctx.stroke();
	}
	else {
		ctx.beginPath();
		ctx.moveTo(130*order+25+anim, 10*note+1);
		ctx.lineTo(130*order+25+anim, 10*note-75);
		ctx.stroke();
	}

	if (note < 7) {	
		ctx.lineWidth = 4;
		ctx.lineCap = "bout";
		ctx.beginPath();
		for (var i = 6; note <= i; i-=2) {
			ctx.moveTo(130*order-6+anim, 10*i);
			ctx.lineTo(130*order+38+anim, 10*i);
		}
		ctx.stroke();
	}
	else if (note > 16) {	
		ctx.lineWidth = 4;
		ctx.lineCap = "bout";
		ctx.beginPath();
		for (var i = 18; note >= i; i+=2) {
			ctx.moveTo(130*order-6+anim, 10*i);
			ctx.lineTo(130*order+38+anim, 10*i);
		}
		ctx.stroke();
	}
}

function noteBecarre(note){
	for (var i = 0; i < note.length; i++) {
		note[i] = Math.round(note[i]/2);
	}
	return note;
}