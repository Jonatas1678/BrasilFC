import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Verifica se o script foi carregado corretamente
console.log("script_cadastro.js carregado!");

const db = window.db; // Acesso ao Firestore, verifique se o db está disponível
console.log("Instância do Firestore DB:", db);

['#idNome', '#idDocumento', '#idEmail'].forEach(id => {
    const input = document.querySelector(id);
    if (input) {
        input.addEventListener('focus', () => {
            input.style.outlineColor = 'blue';
        });
    }
});

const cpfInput = document.querySelector('#idDocumento');
if (cpfInput) {
    aplicarMascaraCPF(cpfInput);

    cpfInput.addEventListener("input", () => {
        if (validarCPF(cpfInput.value)) {
            cpfInput.style.border = "";
        }
    });
} else {
    console.error("Input CPF (#idDocumento) não encontrado!");
}

function aplicarMascaraCPF(input) {
    input.addEventListener("input", () => {
        let valor = input.value.replace(/\D/g, "");
        if (valor.length > 11) valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        input.value = valor;
    });
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

const form = document.querySelector("#cadastroForm");
if (form) {
    form.addEventListener("submit", async function (e) {
        console.log("Evento de submit disparado!");

        e.preventDefault();

        const nome = document.querySelector('#idNome')?.value.trim() || '';
        const cpf = document.querySelector('#idDocumento')?.value.trim() || '';
        const dataNascimento = document.querySelector('#idDataNascto')?.value || '';
        const email = document.querySelector('#idEmail')?.value.trim() || '';
        const estado = document.querySelector('#idEstado')?.value || '';
        const cidade = document.querySelector('#idCid')?.value.trim() || '';

        const tipoEmailRadio = document.querySelector('input[name="tipoEmail"]:checked');
        const tipoEmail = tipoEmailRadio ? tipoEmailRadio.value : 'Não informado';

        const sexoRadio = document.querySelector('input[name="sexo"]:checked');
        const sexo = sexoRadio ? sexoRadio.value : 'Não informado';

        const situacaoRadio = document.querySelector('input[name="situacao"]:checked');
        const situacao = situacaoRadio ? situacaoRadio.value : 'Não informado';

        // Verifica os dados coletados
        console.log("Dados coletados do formulário:", {
            nome, cpf, dataNascimento, email, tipoEmail, estado, cidade, sexo, situacao
        });

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!nome || !cpf || !dataNascimento || !email || !estado || !cidade || !sexo || !situacao) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!validarCPF(cpf)) {
            cpfInput.style.border = "2px solid red";
            cpfInput.focus();
            alert("CPF inválido. Verifique o número digitado.");
            console.warn("Cadastro impedido: CPF inválido.");
            return;
        } else {
            cpfInput.style.border = "";
        }

        const dadosUsuario = {
            nome,
            cpf,
            dataNascimento,
            email,
            tipoEmail,
            estado,
            cidade,
            sexo,
            situacao,
            criadoEm: new Date()
        };

        console.log("Tentando adicionar documento ao Firestore:", dadosUsuario);

        try {
            const docRef = await addDoc(collection(db, "usuarios"), dadosUsuario);
            console.log("Cadastro salvo com sucesso! ID do documento:", docRef.id);
            alert("Cadastro salvo com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro ao cadastrar no Firestore:", error);
            alert("Erro ao cadastrar os dados. Verifique o console para detalhes.");
        }
    });
} else {
    console.error("Formulário (#cadastroForm) não encontrado!");
}
