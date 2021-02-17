// theme handling
setTheme = (mode) => {
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

// notification handling  
let params = window.location.search.substring(1);
if (params.length > 0) {
    params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    let notification = document.getElementById('notification-bar')

    if (params["sent"] == 1) {
        notification.children[0].innerHTML = "Message has been sent!"
    } else if (params["sent"] == 0) {
        notification.children[0].innerHTML = "Whoops! Message could not be sent!"
    } else {
        notification.children[0].innerHTML = "Unknown parameters!"
    }
    if (notification.children[0].innerHTML != "") {
        notification.style.height = "initial";
        notification.style.visibility = "visible";
    }
}

// notification animation
const showNotification = (message) => {
    element = document.getElementById("notification-bar")
    element.parentElement.parentElement.style.visibility = 'visible';
    element.parentElement.parentElement.style.opacity = '1';
    element.children[0].innerHTML = message
}
const hideNotification = () => {
    element = document.getElementById("notification-bar")
    element.parentElement.parentElement.style.visibility = 'hidden';
    element.parentElement.parentElement.style.opacity = '0';
    element.children[0].innerHTML = '&nbsp'
}

// form functions
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// form post contact handling
document.getElementById("contactForm").addEventListener("submit", (event) => {
    showNotification("Sending...")
    event.preventDefault()
    let formData = new FormData(document.forms.contactForm);
    let obj = {}
    formData.forEach((val, key) => {
        obj[key] = val
    });

    if (obj.subject.length > 0 && obj.message.length > 0 && obj.name.length > 0) {
        if (validateEmail(obj.email)) {
            fetch('/send', {
                method: 'post',
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    showNotification(data['data'])
                })
                .catch((err) => {
                    showNotification("Unknown error!")
                    console.log(err)
                })
        } else {
            showNotification("Could not send the message due to wrong email!")
        }
    } else {
        showNotification("Could not send the message due to missing information!")
    }
});
