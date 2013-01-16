var alfa = "abcdefghijklmnopqrstuvwxyz";
var vid = "x0chehsfbc52kb32sbed38v3d3w2ujhsjuayb2enek";
var letterFreq = {
	a : 8.167,
	b : 1.492,	
	c : 2.782,	
	d : 4.253,	
	e : 12.702,
	f : 2.228,
	g : 2.015,
	h : 6.094,
	i : 6.966,
	j : 0.153,
	k : 0.772,
	l : 4.025,
	m : 2.406,
	n : 6.749,
	o : 7.507,
	p : 1.929,
	q : 0.095,
	r : 5.987,
	s : 6.327,
	t : 9.056,
	u : 2.758,
	v : 0.978,
	w : 2.360,
	x : 0.150,
	y : 1.974,
	z : 0.074,
}


$(function(){
	$("#start").click(refresh);
	$("#word").bind("input", refresh);
	$("#mode").change(refresh);

	function refresh() {

		clearCounter();

		$("#output").html("").removeAttr("class");
		var mode = $("#mode").val();
		$("#output").addClass(mode);

		words = $("#word").val().replace(/[\.,-\/#!$%\^&\*?;:{}=\-_`~()]/g,"").	// punctuation
								 replace(/\s{2,}/g," "). 						// trailing spaces		
								 replace(/(^\s+|\s+$)/g, ''). 					// extra spaces
								 split(' ');



		if (mode == "words") {
			var fullSents = shuffleWords(words);
			fullSents.sort(function() {return 0.5 - Math.random()});

			for (i = 0; i < fullSents.length; i++){
				$("#output").append("<div>"+fullSents[i]+"</div>");
			}
		}

		else if (mode == "letters") {
			for (j = 0; j < words.length; j++ ){
				chars = words[j].toLowerCase().split('');
				var fullWords = shuffleLetters(chars);
				fullWords.sort(function() {return 0.5 - Math.random()});

				for (i = 0; i < fullWords.length; i++){
					$("#output").append("<span>"+fullWords[i]+" </span>");
				}

				$("#output").append("<span class=\"divide\">–</span>");
			}
		}

		for (j = 0; j < words.length; j++ ){
			chars = words[j].split('');

			//$("#output").text(getFirst(chars).let);
			//console.log(chars.sort());

			var scrambledWords = new Array();

			// for (i = 0; i < chars.length; i++) {
			// 	var charsRemaining = chars.slice(0); // slice(0) copies!
			// 	var begin = chars[i];
			// 	removeA(charsRemaining, begin);
			// 	console.log(begin);
			// 	console.log(charsRemaining);

			// 	for (k = 0; k < charsRemaining.length; k++) {
			// 		var charsRemaining = charsRemaining.slice(0); // slice(0) copies!
			// 		var begin = charsRemaining[k];
			// 		removeA(charsRemaining, begin);
			// 		console.log(begin);
			// 		console.log(charsRemaining);
			// 	}
			// 	console.log("----");
			// }


			// Hooray! I wrote my dirst recursive thing!

			// // ----------------------
			// // ----------------------

			// for (iX[l] = 0; iX[l] < chars.length; iX[l]++) {
			// 	currLet = chars[iX[l]]
			// 	stubs[l] = currLet;
			// 	console.log(stubs[l]);
			// 	remainLetArr[l] = removeA(chars.slice(0), currLet);


			// 	// ---------
			// 	l++;
			// 	// ---------
			// 	for (iX[l] = 0; iX[l] < remainLetArr[l-1].length; iX[l]++) {
			// 		stubs[l] = stubs[l-1] + remainLetArr[l-1][iX[l]];
			// 		console.log(stubs[l]);
			// 		remainLetArr[l] = removeA(remainLetArr[l-1].slice(0), remainLetArr[l-1][iX[l]]);

			// 		// ---------
			// 		l++;
			// 		// ---------
			// 		for (iX[l] = 0; iX[l] < remainLetArr[l-1].length; iX[l]++) {
			// 			stubs[l] = stubs[l-1] + remainLetArr[l-1][iX[l]];
			// 			console.log(stubs[l]);
			// 			remainLetArr[l] = removeA(remainLetArr[l-1].slice(0), remainLetArr[l-1][iX[l]]);


			// 			// ---------
			// 			l++;
			// 			// ---------
			// 			for (iX[l] = 0; iX[l] < remainLetArr[l-1].length; iX[l]++) {
			// 				stubs[l] = stubs[l-1] + remainLetArr[l-1][iX[l]];
			// 				console.log(stubs[l]);
			// 				if ( l >= maxLevels) {
			// 					fullWords.push(stubs[l]);
			// 				}
			// 				else {
			// 					// keep going
			// 				}
			// 			}
			// 			// ---------
			// 			l--;
			// 			// ---------
			// 		}
			// 		// ---------
			// 		l--;
			// 		// ---------
			// 	}
			// 	// ---------
			// 	l--;
			// 	// ---------

			// 	console.log("-----");
			// }

			// var fullWords = shuffleLetters(chars);

			// for (i = 0; i < fullWords.length; i++){
			// 	$("#output").append(fullWords[i] + "</br>");
			// }
		}


	};

	function plusCounter() {
		counter++;
		$("#counter").text(counter);
	}

	function clearCounter() {
		counter = 0;
		$("#counter").text(counter);
	}

	function shuffleLetters(chars) {
		var maxLevels = chars.length;	// How many levels deep we go
		var l = 0; 						// current level
		var stubs = new Array();		// Array of partial words stubs
		var remainLetArr = new Array();	// Array of arrays of remaining l * letters
		var fullWords = new Array();	// What we're returning
		var iX = new Array(); 			// Index

		// ----------------------

		for (iX[l] = 0; iX[l] < chars.length; iX[l]++) {
			currLet = chars[iX[l]]
			stubs[l] = currLet;
			//console.log(stubs[l]);
			remainLetArr[l] = removeA(chars.slice(0), currLet);

			l++;
			doThing(l);
			l--;

			function doThing(l) {
				for (iX[l] = 0; iX[l] < remainLetArr[l-1].length; iX[l]++) {
			 		stubs[l] = stubs[l-1] + remainLetArr[l-1][iX[l]];
					//console.log(stubs[l]);
			 		remainLetArr[l] = removeA(remainLetArr[l-1].slice(0), remainLetArr[l-1][iX[l]]);
					if ( l >= maxLevels - 1) {
						fullWords.push(stubs[l]);
						plusCounter();
					}
					else {
						l++;
						// Recursion!
						doThing(l);
						l--;
					}
				}
			}
		}

		return fullWords;
	}

	function shuffleWords(words) {
		var maxLevels = words.length;	// How many levels deep we go
		var l = 0; 						// current level
		var stubs = new Array();		// Array of partial words stubs
		var remainLetArr = new Array();	// Array of arrays of remaining l * letters
		var fullWords = new Array();	// What we're returning
		var iX = new Array(); 			// Index

		// ----------------------

		for (iX[l] = 0; iX[l] < words.length; iX[l]++) {
			currLet = words[iX[l]]
			stubs[l] = currLet;
			//console.log(stubs[l]);
			remainLetArr[l] = removeA(words.slice(0), currLet);

			if (maxLevels > 1) {
				l++;
				doThing(l);
				l--;
			}
			else {
				return words;
			}

			function doThing(l) {
				for (iX[l] = 0; iX[l] < remainLetArr[l-1].length; iX[l]++) {
			 		stubs[l] = stubs[l-1] + " " + remainLetArr[l-1][iX[l]];
					//console.log(stubs[l]);
			 		remainLetArr[l] = removeA(remainLetArr[l-1].slice(0), remainLetArr[l-1][iX[l]]);
					if ( l >= maxLevels - 1) {
						fullWords.push(stubs[l]);
						plusCounter();
					}
					else {
						l++;
						// Recursion!
						doThing(l);
						l--;
					}
				}
			}
		}

		return fullWords;
	}

	function getFirst(charArray) {

		sorted = charArray.sort();
		return sorted[0];

		// var minIndex = 1000000;
		// var firstLetter = -1;

		// for (i = 0; i < charArray.length; i++) {
		// 	currLetter = charArray[i];
		// 	currIndex = alfa.indexOf(currLetter);
		// 	if (currIndex < minIndex) {
		// 		firstLetter = currLetter;
		// 		minIndex = currIndex;
		// 	}
		// }

		// var result = {
		// 	let: firstLetter,
		// 	index: minIndex
		// }

		// return result;
	}

	function removeA(array, item){
	    for(var i in array){
	        if(array[i]==item){
	            array.splice(i,1);
	            break;
	            }
	    }
	    return array;
	}


});