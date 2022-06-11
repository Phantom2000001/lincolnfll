var i = 0;
var delay = 2500;

function changeimage()
{
    if(i > 63)
    {
        i = 0;
    }
    document.getElementById('bg').style.backgroundImage = `url(Images/${i}.png)`;
    i++;
}
window.onload = changeimage();
setInterval(function(){changeimage();}, delay);

function submit2()
{
    var formattedbody = {
        name: document.getElementById("First").value + " " + document.getElementById("Last").value,
        Emails: document.getElementById("Email").value + ", " + document.getElementById("PEmail").value,
        Grade: document.getElementById("Grade").value,
        Team: $("#Team :selected").text()
    };
    Email.send({
	SecureToken : "9d574e61-a590-4e40-8d97-b1948ac6b0c3",
    To : 'tejachitta6@gmail.com',
    From : "scottr2@gcsnc.com",
    Subject : "New Team Member",
    Body : JSON.stringify(formattedbody)
	}).then(
        message => alert(message)
    );
    window.open('main.html');
}
