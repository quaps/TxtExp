var words;
var ngrams = {}
var order = 2;
var txt = "";
var a = 0.1;
var target = 255;

function setup() {
  createCanvas(600, 600);

  words = source.split(" ");

  for (var i = 0; i < words.length - order; i++){
  	gram_temp = [];
  	for (var j = 0; j < order; j++){
	gram_temp.push(words[i + j]);
      }
      gram = join(gram_temp," ");
	if (!ngrams[gram]){
	 ngrams[gram] = [];
	}
	if (i < words.length - order){
	ngrams[gram].push(words[i + order])	
  }
}
  markovIt(ngrams);
  txt = spText(txt);
}

function draw() {
	background(255);
	a += (target - a) * 0.1;
	
	 textSize(12);
     fill(0, a);
	 textDisplay(txt);
	 if (a  < 0.099 ){
	 	restart();
	 }
}

function restart(){
	markovIt(ngrams);
	txt = spText(txt);
	a = 0;
	target = 255;
}


function textDisplay(ttext){
	textAlign(CENTER);

	text(ttext, 100, 60, width - 100, height - 60);
}

function spText(txt){
	return txt.split(".");
}

function mousePressed(){
   target = 0;
}

function markovIt(ngrams) {
	var index = int(random(0, words.length - order + 1));
	curr_temp = [];
	for (var j = 0; j < order; j++){
	 curr_temp.push(words[index + j]);
      }
      current = join(curr_temp, " ");
      console.log(current);
	result = current;
	if (!ngrams[current]){
	    return null;
	}
	var range = int(random(30, 500));
	for (var i = 0; i < range; i++){
		if (!ngrams[current]){
	    break;
	      }
		possibilities = ngrams[current];
		if (possibilities.length == 0){
		  break;
		}
		next = possibilities[int(random(0, possibilities.length))];
		result = result + " " + next;
		tokens = result.split(" ");
		curr_temp = [];
		for (var j = order; j > 0; j--){
		curr_temp.push(tokens[tokens.length - j]);
	}
	     current = join(curr_temp, " ");
		 }
		 console.log(current);
		 textSize(12);
		 fill(0, 255);
	txt = result;
	
}