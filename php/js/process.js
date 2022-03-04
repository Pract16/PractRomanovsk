function quest()
{
	let questlabel = document.getElementById('quest');
	let question = get_next_quest();
	var textToAdd = document.createTextNode(question);
	questlabel.appendChild(textToAdd);
	
}
function get_next_quest()
{
	let input = parseGetParams().test;
	let question = request('database/quest.php?param='+input);
	let questionJSON = JSON.parse(question);
	return questionJSON[0].textq;
}
function answersList()
{
	let input = parseGetParams().param;
	let test = request('database/answerlist.php?param='+input);
	let testJSON = JSON.parse(test);
	//for
	return testJSON[0].id_test;
}
function answer()
{
	let input = parseGetParams().param;
	let test = request('database/answer.php?param='+input);

}
function request(url)
{
	let r = new XMLHttpRequest();
	r.open('GET', url, false);
	r.send();
	return r.responseText;
}
function do_stuff()
{
	let blk = document.getElementById('tests');
	let table = document.getElementById('table');
	table.style.display = "table";
	
	let res = request('database/list.php');
	
	if(res != null && res.length != 0)
	{
		blk.innerHTML = "";
	
		let test = JSON.parse(res); // now you can easily transport complex data structured
		for (let i = 0; i < test.length; i++)
		{
			let tr = document.createElement('tr');

			let td1 = document.createElement('td');
			td1.append(test[i].id);
			tr.appendChild(td1);			

			let td2 = document.createElement('td');
			td2.append(test[i].name);
			tr.appendChild(td2);

			blk.appendChild(tr);

		}	
	}
	else
		blk.innerHTML = '<span class="note">Failed!</span>';
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
	btn.addEventListener('click',quest,false);
}


window.addEventListener('load', quest, false);
window.addEventListener('load', main, false);