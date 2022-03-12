function end()
{
	window.open("index.php");
}
function rightansw()
{
	let answright = document.getElementById('answ_right');
	answright.innerHTML = "";
	let info = parseGetParams();
	let testid = info.test;
	let userid = info.user;
	var rightanswers = request('database/right.php?user='+userid+'&test='+testid);
	let answerJSON = JSON.parse(rightanswers);
	
	for (var i = 0; i < answerJSON.length; i++) {
		
		console.log(i);
		
		if (answerJSON != null  && answerJSON.length != 0)
		{
			answright.innerHTML += '<p>' + (i+1) +'. Question: '+ answerJSON[i].questiontext+' Answer: ' + answerJSON[i].texta +'Score: '+answerJSON[i].result+'</p>';
		}
		else
		answerlabel.innerHTML = '<span class="note">Failed!</span>';
	}
	var culc = calculation(testid, userid);
}

function calculation(testid, userid)
{	
	let result = document.getElementById('result');
	result.innerHTML = 'Result: ';
	var precent = request('database/rightcalc.php?user='+userid+'&test='+testid);
	let precentJSON = JSON.parse(precent);
	var textToAdd = document.createTextNode(precentJSON[0].generalcalculate + " %");
	result.appendChild(textToAdd);
}

function parseGetParams() { 
   var $_GET = {}; 
   var __GET = window.location.search.substring(1).split("&"); 
   for(var i=0; i<__GET.length; i++) { 
      var getVar = __GET[i].split("="); 
      $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
   } 
   return $_GET; 
} 

function request(url)
{
	let r = new XMLHttpRequest();
	r.open('GET', url, false);
	r.send();
	return r.responseText;
}

function main()
{
	var btn = document.getElementById('end');
	btn.addEventListener('click',end,false);
}


window.addEventListener('load', rightansw, false);
window.addEventListener('load', main, false);