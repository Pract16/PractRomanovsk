function start_t()
{
	const test =  get_first_test();
	const user = get_id_user();
    window.open("test.php?test="+test+"&user="+user);
}
function get_first_test()
{
	let input = parseGetParams().param;
	let test = request('database/firstest.php?param='+input);
	let testJSON = JSON.parse(test);
	return testJSON[0].id_test;
}
function get_id_user()
{
	let input = parseGetParams().param;
	let user = request('database/id.php?param='+input);
	let userJSON = JSON.parse(user);
	return userJSON[0].id;
}
function go_test()
{
	
	let blk = document.getElementById('counter');
	let input = parseGetParams().param;
	let count = request('database/checkex.php?param='+input);
	let countJSON = JSON.parse(count); 
	
	if (countJSON != null  && countJSON.length != 0)
	{
		blk.innerHTML = '<p>Count tests ='+ countJSON[0].ccc +'</p>';
	
	}
	else
	{
		blk.innerHTML = '<p>FAILE</p>';
		
	}
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
	var btn = document.getElementById('start');
	btn.addEventListener('click',start_t,false);
}

window.addEventListener('load', main, false);
window.addEventListener('load', go_test, false);