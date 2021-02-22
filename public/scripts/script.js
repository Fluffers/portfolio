// theme handling
const setTheme = (mode) => {
    switch (mode) {
        case "light":
            document.getElementById('theme-style').href = 'css/style.css'
            break;
        case "blue":
            document.getElementById('theme-style').href = 'css/blue.css'
            break;
        case "green":
            document.getElementById('theme-style').href = 'css/green.css'
            break;
        case "purple":
            document.getElementById('theme-style').href = 'css/purple.css'
            break;
        case "yellow":
            document.getElementById('theme-style').href = 'css/yellow.css'
            break;
        default:
            console.log("you don't have a style like " + mode + " prepared")
            break;
    }

    localStorage.setItem('theme', mode)
}

const theme = localStorage.getItem('theme')
setTheme(theme ?? 'light')

const themeDots = document.getElementsByClassName('theme-dot')
Array.from(themeDots).forEach(dot => {
    dot.addEventListener('click', (e) => {
        setTheme(e.target.dataset.theme)
    })
});

// notification handling  
const params = window.location.search.substring(1);
if (params.length > 0) {
    params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    const notification = document.getElementById('notification-bar')

    if (params["sent"] == 1) {
        notification.children[0].textContent = "Message has been sent!"
    } else if (params["sent"] == 0) {
        notification.children[0].textContent = "Whoops! Message could not be sent!"
    } else {
        notification.children[0].textContent = "Unknown parameters!"
    }
    if (notification.children[0].textContent != "") {
        notification.style.height = "initial";
        notification.style.visibility = "visible";
    }
}

// notification animation
const showNotification = (message) => {
    element = document.getElementById("notification-bar")
    element.parentElement.parentElement.style.visibility = 'visible';
    element.parentElement.parentElement.style.opacity = '1';
    element.children[0].textContent = message
}
const hideNotification = () => {
    element = document.getElementById("notification-bar")
    element.parentElement.parentElement.style.visibility = 'hidden';
    element.parentElement.parentElement.style.opacity = '0';
    // element.children[0].textContent = '&nbsp'
}

// form functions
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// form post contact handling
document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault()
    showNotification("Sending...")
    const formData = new FormData(document.forms.contactForm);
    const obj = {}
    formData.forEach((val, key) => {
        obj[key] = val.trim()
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

document.getElementById("notification-close").addEventListener("click", hideNotification)
