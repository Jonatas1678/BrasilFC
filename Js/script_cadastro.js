let nome = document.querySelector('#idNome')
let cpf = document.querySelector('#idDocumento')
let email = document.querySelector('#idEmail')
let outro = document.querySelector('#idOutro')

nome.addEventListener('focus', ()=>{
    nome.style.outlineColor = 'blue'
})

cpf.addEventListener('focus', ()=>{
    cpf.style.outlineColor = 'blue'
})

email.addEventListener('focus', ()=>{
    email.style.outlineColor = 'blue'
})

outro.addEventListener('focus', ()=>{
    outro.style.outlineColor = 'blue'
})