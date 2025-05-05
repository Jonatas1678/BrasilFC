// Realce visual nos campos ao focar
let nome = document.querySelector('#idNome')
let cpf = document.querySelector('#idDocumento')
let email = document.querySelector('#idEmail')
let outro = document.querySelector('#idOutro')

nome.addEventListener('focus', () => {
    nome.style.outlineColor = 'blue'
})
cpf.addEventListener('focus', () => {
    cpf.style.outlineColor = 'blue'
})
email.addEventListener('focus', () => {
    email.style.outlineColor = 'blue'
})
outro.addEventListener('focus', () => {
    outro.style.outlineColor = 'blue'
})

// ENVIO PARA O FIREBASE
document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita o envio padrão da página

    // Pegando os valores do formulário
    let nome = document.querySelector('#idNome').value
    let cpf = document.querySelector('#idDocumento').value
    let dataNascimento = document.querySelector('#idDataNascto').value
    let email = document.querySelector('#idEmail').value
    let estado = document.querySelector('select[name="estado"]').value
    let cidade = document.querySelector('#idCid').value
    let outroSexo = document.querySelector('#idOutro').value

    // Você pode capturar os outros campos como sexo, situação etc., se quiser

    try {
        await db.collection("usuarios").add({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            email: email,
            estado: estado,
            cidade: cidade,
            outroSexo: outroSexo,
            criadoEm: new Date()
        })
        alert("Cadastro salvo com sucesso!")
        document.querySelector("form").reset()
    } catch (error) {
        console.error("Erro ao cadastrar:", error)
        alert("Erro ao cadastrar os dados.")
    }
})
