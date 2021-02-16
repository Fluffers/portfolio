// theme handling

let theme = localStorage.getItem('theme')

if (theme == null) {
    setTheme('light')
} else {
    setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for (var i = 0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.id.split("-")[0]
        setTheme(mode)
    })
}

function setTheme(mode) {
    if (mode == "light") {
        document.getElementById('theme-style').href = 'css/style.css'
    } else if (mode == "blue") {
        document.getElementById('theme-style').href = 'css/blue.css'
    } else if (mode == "green") {
        document.getElementById('theme-style').href = 'css/green.css'
    } else if (mode == "purple") {
        document.getElementById('theme-style').href = 'css/purple.css'
    } else if (mode == "yellow") {
        document.getElementById('theme-style').href = 'css/yellow.css'
    }

    localStorage.setItem('theme', mode)
}


// notification handling  
let params = window.location.search.substring(1);
if (params.length > 0) {
    params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    let notification = document.getElementById('notification-bar')
 
    if (params["sent"] == 1) {
        notification.children[0].innerHTML = "Message has been sent!"
    }else if(params["sent"] == 0 ){
        notification.children[0].innerHTML = "Whoops! Message could not be sent!"
    }else{
        notification.children[0].innerHTML = "Unknown parameters!"
    }
        if (notification.children[0].innerHTML != "") {
            notification.style.height = "initial";
            notification.style.visibility = "visible";
        }
}