if (window.localStorage.getItem("Logged In") == "true") {
    document.getElementById("row").innerHTML += "<th><a href='EditNews'><button class='menu'>Add News</button></a></th>";
    document.getElementById("switchable").children[0].textContent = "Members";
    document.getElementById("switchable").href = "Members";
    document.getElementById("switchable2").textContent = "Log Out";
    document.getElementById("switchable2").addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    });
} else {
    var login = confirm("Log In?");

    switch (login) {
        case true:
            var pw = prompt("Password");
            if (pw.toLowerCase() == "admin") {
                location.reload();
                window.localStorage.setItem("Logged In", true);
            }
            break;
        case false:
            break;
    }
}


var base = "https://lincolnfll.web.app/";
//var json;
var n = [];
var nh = [];
//nh.length = 6;
var u = 6;
var start = 0;
var speed = 2500;
var h = [[document.getElementById('one'), document.getElementById('oneh')], [document.getElementById('two'), document.getElementById('twoh')], [document.getElementById('three'), document.getElementById('threeh')]];
var orig_res = [1536, 746];

function check_res() {
    var res = [window.innerWidth, window.innerHeight];
    console.log(res[0]);
    if(res[0] < orig_res[0]) {
        document.body.style.overflowX = 'scroll';
    } else {
        document.body.style.overflowX = 'hidden';
    }
}

window.onload = check_res;
window.onresize = check_res;

function begin(o) {
    $.getJSON(`News/${o-1}.json`, function(json) {
        nh[o-1] = json;
        if(o-2 >= 0) {
            o--;
            begin(o);
        }
        else {
            return 1;
        }
    });
}

function check(r)
{
    if(nh[r].type == 0) {
        return "News";
    } else {
        return "Event";
    }
}

function klick(id) {
    var win = window.open(); 
    win.document.write(document.getElementById(id).href.split(',')[1]);
}

function display() {
    for (var r = start; r < start + 3; r++) {
        if (nh.length > r) {
            var d = h[r - start][0];
            var t = check(r);
            d.innerHTML = `<div id="${r}0" style="background-color: green; color: white; font-weight: bold;">${t}</div>` + `<br><h1 style="color: black;">${nh[r].name}</h1><br><h3>${nh[r].description}</h3><br><h4>${new Date(nh[r].date).toLocaleDateString()}  ${new Date(nh[r].date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</h4>`;

            if (document.getElementById(`${r}0`).innerHTML == "News") {
                document.getElementById(`${r}0`).style.backgroundColor = "orange";
            }
            var doc = document.implementation.createHTMLDocument(nh[r].name);
            var e = [doc.createElement('h1'),
            doc.createElement('br'),
            doc.createElement('h3'),
            doc.createElement('link')];
            e[0].innerHTML = nh[r].name;
            e[0].setAttribute("class", "black");
            nh[r].body = nh[r].body.replaceAll(",", "");
            e[2].innerHTML = nh[r].body;
            e[3].setAttribute("rel", "stylesheet");
            e[3].setAttribute("href", base + "css/style.css");
            doc.body.append(e[0]);
            doc.body.append(e[1]);
            doc.body.append(e[2]);
            doc.body.append(e[3]);
            h[r - start][1].href = "data:text/html, " + doc.documentElement.innerHTML;
        }
        else {
            var d = h[r - start][0];
            d.innerHTML = "";
        }
    }
    if(nh.length < start + 4) {
        document.getElementById("fwd").children[0].setAttribute("disabled", "");
        document.getElementById("fwd").children[0].setAttribute("class", "notcircle");
    }
}


function displaypre() {
    if(nh.length < start + 4) {
        document.getElementById("fwd").children[0].setAttribute("disabled", "");
        document.getElementById("fwd").children[0].setAttribute("class", "notcircle");
    }
    else {
        start+=3;
    }
    
    if(start - 3 >= 0) {
        if(document.getElementById("bwd").children[0].getAttribute("disabled") != null) {
            document.getElementById("bwd").children[0].removeAttribute("disabled");
        }
        document.getElementById("bwd").children[0].setAttribute("class", "circle");
    }
}



function display2pre() {
    if(start - 3 < 0) {
        document.getElementById("bwd").children[0].setAttribute("disabled", "");
        document.getElementById("bwd").children[0].setAttribute("class", "notcircle");
    }
    else {
        start-=3;
    }
    
    if(nh.length > start + 1) {
        if(document.getElementById("fwd").children[0].getAttribute("disabled") != null) {
            document.getElementById("fwd").children[0].removeAttribute("disabled");
        }
        document.getElementById("fwd").children[0].setAttribute("class", "circle");
    }
}


function display2() {
    for (var r = start; r < start + 3; r++) {
        var d = h[r-start][0];
        var t = check(r);
        d.innerHTML = `<div id="${r}0" style="background-color: green; color: white; font-weight: bold;">${t}</div>` + `<br><h1 style="color: black;">${nh[r].name}</h1><br><h3>${nh[r].description}</h3><br><h4>${new Date(nh[r].date).toLocaleDateString()}  ${new Date(nh[r].date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})}</h4>`;
        
        if(document.getElementById(`${r}0`).innerHTML == "News") {
            document.getElementById(`${r}0`).style.backgroundColor = "orange";
        }
        var doc = document.implementation.createHTMLDocument(nh[r].name);
        var e = [doc.createElement('h1'),
                 doc.createElement('br'),
                 doc.createElement('h3'),
                 doc.createElement('link')];
        e[0].innerHTML = nh[r].name;
        e[0].setAttribute("class", "black");
        nh[r].body = nh[r].body.replaceAll(",", "");
        e[2].innerHTML = nh[r].body;
        e[3].setAttribute("rel", "stylesheet");
        e[3].setAttribute("href", base + "css/style.css");
        doc.body.append(e[0]);
        doc.body.append(e[1]);
        doc.body.append(e[2]);
        doc.body.append(e[3]);
        h[r-start][1].href = "data:text/html, " + doc.documentElement.innerHTML;
    }
    
    if(start - 3 < 0) {
        document.getElementById("bwd").children[0].setAttribute("disabled", "");
        document.getElementById("bwd").children[0].setAttribute("class", "notcircle");
    }
}

var i = -1;

function changeimage()
{
    i++;
    var img = document.getElementById("slide");
    var img1 = document.getElementById("slide1");
    var img2 = document.getElementById("slide2");
    switch(i) {
        case 64:
            i = 0;
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(63)+".png";
            img2.src ="Images/"+(i+1)+".png";
            break;
        case 63:
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(i-1)+".png";
            img2.src ="Images/"+(0)+".png";
            break;
        case 0:
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(63)+".png";
            img2.src ="Images/"+(i+1)+".png";
            break;
        default:
            img.src="Images/"+i+".png";
            img1.src ="Images/"+(i-1)+".png";
            img2.src ="Images/"+(i+1)+".png";
            break;
    }
    
}

function changeimage2()
{
    i--;
    var img = document.getElementById("slide");
    var img1 = document.getElementById("slide1");
    var img2 = document.getElementById("slide2");
    switch(i) {
        case -1:
            i = 63;
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(i-1)+".png";
            img2.src ="Images/"+(0)+".png";
            break;
        case 0:
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(63)+".png";
            img2.src ="Images/"+(i+1)+".png";
            break;
        default:
            img.src ="Images/"+i+".png";
            img1.src ="Images/"+(i-1)+".png";
            img2.src ="Images/"+(i+1)+".png";
            break;
    }
}

var interval = setInterval(function(){changeimage();}, speed);

function pause(id) {
    switch(document.getElementById(id).innerHTML) {
        case '||':
            clearInterval(interval);
            speed = Math.pow(100, 10);
            interval = setInterval(function(){changeimage();}, speed);
            document.getElementById(id).textContent = '▶';
            break;
        case '▶':
            clearInterval(interval);
            speed = 2500;
            interval = setInterval(function(){changeimage();}, speed);
            document.getElementById(id).textContent = '||';
            break;
        default:
            break;
    }
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function notifpermission() {
    Notification.requestPermission();
    var notif = Notification.permission;
    
    if(notif == 'granted') {
        nh.forEach(function(item){
            if(new Date(Date.now()).getMinutes() == new Date(item.date).getMinutes() && new Date(Date.now()).getHours() == new Date(item.date).getHours() && new Date(Date.now()).getDate() == new Date(item.date).getDate() && new Date(Date.now()).getMonth() == new Date(item.date).getMonth() && new Date(Date.now()).getYear() == new Date(item.date).getYear() && item.type == 1) {
                new Notification(item.name, { body: item.body, icon: null });
            }
        });
    }
}

setTimeout(display, 3000);
setInterval(function(){notifpermission();}, 0);