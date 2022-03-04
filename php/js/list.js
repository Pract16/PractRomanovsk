function go_test()
{	 const name = document.getElementsByTagName('input')[0];
	 window.open("startpage.php?param="+name.value);
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



function main()
{
	var btn = document.getElementById('select');
	var btn2 = document.getElementById('test');
	btn.addEventListener('click',do_stuff,false);
	btn2.addEventListener('click',go_test,false);
	document.getElementById('table').style.display = 'none';
}


window.addEventListener('load', main, false);