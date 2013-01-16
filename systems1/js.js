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

	function refresh() {


		$("#output").html("").removeAttr("class");
		var mode = $("#mode").val();
		$("#output").addClass(mode);
		console.log(mode);


		words = $("#word").val().split(' ');

		for (j = 0; j < words.length; j++ ){
			chars = words[j].split('');
			console.log(chars);
			var html = "";
			for ( i = 0; i < chars.length; i++ ){
				chars[i] = chars[i].toLowerCase();
				html += "<span data-index=\""+alfa.indexOf(chars[i])+"\">";
				html += chars[i];
				html += "</span>";
			}

			html = "<div class=\"word\" data-word-index=\""+j+"\">"+html+"</div>";

			$("#output").append(html);

			if ( mode = "radial" ) {
				charDivs = $("[data-word-index = "+j+"] > span");
				rotateStep = 360 / chars.length;

				for ( i = 0; i < chars.length; i++ ){
					if (alfa.indexOf(chars[i]) > -1) {
						c = $(charDivs[i]);
						//pos = c.attr("data-index");

						angle = i*rotateStep;

						freq_str = "letterFreq."+chars[i];
						freq = 50 * 1/eval(freq_str);
						shift_str = freq+"px";
						rotate_str = "rotate("+angle+"deg)";

						//transform_str = translate_str +" "+ rotate_str;
						console.log(shift_str);

						c.css({
							"-webkit-transform": rotate_str,
							"padding-bottom": shift_str,
						});
					}
				}
			}
			else if (mode = "linear") {
			}
		}
		
		//var ajax_url = "http://api-pub.dictionary.com/v001?vid="+vid+"&q=hello&type=define";
		var ajax_url = "http://api-pub.dictionary.com/v001?vid=x0chehsfbc52kb32sbed38v3d3w2ujhsjuayb2enek&q=hello&type=define";
		
		// $.ajax(ajax_url).done(function ( data ) {
		// 	console.log(data);
		// }).error( function(xhr, textStatus, errorThrown) {
		// 	console.log(xhr);
		// 	console.log(textStatus);
		// 	console.log(errorThrown);
		// });

	};
});