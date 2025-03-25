const xhr = new XMLHttpRequest()
xhr.open()

xhr.addEventListener('load', () => {
    console.log(xhr.response)
})

xhr.open('GET', "link-whatever-we-want-here")
xhr.send()