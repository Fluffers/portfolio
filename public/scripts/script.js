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
        document.getElementById('theme-style').href = 'public/css/style.css'
    } else if (mode == "blue") {
        document.getElementById('theme-style').href = 'public/css/blue.css'
    } else if (mode == "green") {
        document.getElementById('theme-style').href = 'public/css/green.css'
    } else if (mode == "purple") {
        document.getElementById('theme-style').href = 'public/css/purple.css'
    }else if (mode == "yellow") {
        document.getElementById('theme-style').href = 'public/css/yellow.css'
    }

    localStorage.setItem('theme', mode)
}


// notification handling  

let notification = document.getElementById('notification-bar')
console.log(notification)
if(notification.children[0].innerHTML != ""){
    notification.style.height="initial"; 
    notification.style.visibility="visible"; 
}
