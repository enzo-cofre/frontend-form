const form = document.querySelector('#form')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const labels = document.querySelectorAll('label')
const loader = document.querySelector('#loader')
const button = document.querySelector('#button')


const setErrorFor = (input, inputMessage) => {
    const inputControl = input.parentElement
    const inputMsg = inputControl.lastElementChild
    inputMsg.innerText = inputMessage
    inputControl.classList.remove('success')
    inputControl.classList.add('error')
}

const setSuccessFor = (input) => {
    const inputControl = input.parentElement
    inputControl.classList.remove('error')
    inputControl.classList.add('success')
}

const isEmail = (emailAddress) => {
    return /^\S+@\S+\.\S+$/.test(emailAddress)
}

const validateForm = () => {
    let cleanForm = true
    const nameValue = name.value.trim()
    const emailValue = email.value.trim()
    const messageValue = message.value.trim()

    if (nameValue === '') {
        cleanForm = false
        setErrorFor(name, 'Name can not be empty')
    } else {
        setSuccessFor(name)
    }

    if (emailValue === '') {
        cleanForm = false
        setErrorFor(email, 'Email can not be empty')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email address is not valid')
    } else {
        setSuccessFor(email)
    }

    if (messageValue === '') {
        cleanForm = false
        setErrorFor(message, 'Message can not be empty')
    } else if (messageValue.length > 255) {
        cleanForm = false
        setErrorFor(message, 'Maximum message lenght is 255 characters long')
    } else {
        setSuccessFor(message)
    }

    return cleanForm
}

const resetForm = () => {
    name.value = ''
    email.value = ''
    message.value = ''
    labels.forEach(label => {
        label.classList.remove('labelUp')
    })
}




document.addEventListener('focusin', e => {
    if (e.target.classList.contains('input')) {
        const label = e.target.previousElementSibling
        label.classList.add('labelUp')
    }
})

document.addEventListener('focusout', e => {
    if (e.target.classList.contains('input') && e.target.value.length === 0) {
        const label = e.target.previousElementSibling
        label.classList.remove('labelUp')
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()

    if (validateForm()) {
        button.setAttribute('disabled', true)
        loader.classList.add('showLoader')
        setTimeout(() => {
            button.removeAttribute('disabled')
            loader.classList.remove('showLoader') 
            alert('Message sent successfully')           
        }, 3000);
        resetForm()
    } else {
        console.log('revisar los datos ingresados')
    }
    
 
})