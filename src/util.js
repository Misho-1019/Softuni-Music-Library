const userNav = document.querySelector('nav .user')
const userGuest = document.querySelector('nav .guest')

export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'))
}

export function clearUserData() {
    localStorage.removeItem('user')
}

export function hasOwner(ownerId) {
    const userData = getUserData();
    return ownerId === userData?._id
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, event.target)
    }
}

export function updateNav() {
    const userData = getUserData()

    if (userData) {
        userNav.style.display = 'inline-block'
        userGuest.style.display = 'none'
    }else {
        userNav.style.display = 'none'
        userGuest.style.display = 'inline-block'
    }
}