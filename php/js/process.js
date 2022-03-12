function uanswer()
{
	let input1 = parseGetParams().test;
	let input2 = parseGetParams().user;
	const answeridhh = document.getElementsByTagName('input')[0];
	let question = get_next_quest()[0].id;
	if(question == -1)
	{
		window.open("http://php/result.php?test="+input1+"&user="+input2);
	}
	let user = parseGetParams().user;
	let unswers = returnListAnswers();
	let idanswer = unswers[answeridhh.value-1].id;
	let testid = parseGetParams().test;
	const uanswered = request('database/uanswer.php?question='+question+'&user='+user+'&answ='+idanswer+'&test='+testid);
	var start = quest();
	
}

function quest()
{
	
	let counter = document.getElementById('counter');
	let questlabel = document.getElementById('quest');
	
	questlabel.innerHTML = 'Question: ';
	
	let question = get_next_quest();
	
	var textToAdd = document.createTextNode(question[0].textq);
	questlabel.appendChild(textToAdd);
	counter.innerHTML = 'Questions: '+ question.length;
	
	
	let answerlabel = document.getElementById('answ');
	answerlabel.innerHTML = 'Answers: ';
	
	let answers = answersList(question[0].id);
	for (var i = 0; i < 4; i++) {
		
		console.log(i);
		
		if (answers != null  && answers.length != 0)
		{
			answerlabel.innerHTML += '<p>' + (i+1) +'. '+ answers[i].texta +'</p>';
		}
		else
		answerlabel.innerHTML = '<span class="note">Failed!</span>';
	}
	
	
}
function returnListAnswers()
{
	let question = get_next_quest();
	let answers = answersList(question[0].id);
	return answers;
}
function get_next_quest()
{
	let input1 = parseGetParams().test;
	let input2 = parseGetParams().user;
	let question = request('database/quest.php?test='+input1+'&user='+input2);
	if(question.length == "")
	{
		window.open("http://php/result.php?test="+input1+"&user="+input2);
	}
	else
	{
		let questionJSON = JSON.parse(question);
		return questionJSON;
	}
	return -1;
}
function answersList(id_quest)
{
	
	let answer = request('database/answerlist.php?quest='+id_quest);
	let answerJSON = JSON.parse(answer);
	return answerJSON;
}

function request(url)
{
	let r = new XMLHttpRequest();
	r.open('GET', url, false);
	r.send();
	return r.responseText;
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

function main()
{
	var btn = document.getElementById('next');
	btn.addEventListener('click',uanswer,false);
}


window.addEventListener('load', quest, false);
window.addEventListener('load', main, false);