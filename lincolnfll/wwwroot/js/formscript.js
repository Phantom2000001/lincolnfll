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

