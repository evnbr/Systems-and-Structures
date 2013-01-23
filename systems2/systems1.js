var alfa = "abcdefghijklmnopqrstuvwxyz";

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