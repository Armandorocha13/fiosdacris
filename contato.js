document.addEventListener('DOMContentLoaded', () => {
    // Função para aplicar máscara ao campo de telefone
    function applyPhoneMask(input) {
        input.addEventListener('input', function () {
            let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

            if (value.length <= 2) {
                input.value = `(${value}`;
            } else if (value.length <= 7) {
                input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 11) {
                input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else {
                input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        });

        input.addEventListener('blur', function () {
            let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

            if (value.length < 10) {
                input.value = ''; // Limpa o campo se o número for inválido
            } else if (value.length <= 11) {
                input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            } else {
                input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        });
    }

    // Função para validar o formulário
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        let isValid = true;

        // Limpa mensagens de erro anteriores
        clearErrors();

        if (name.value.trim() === '') {
            showError(name, 'Por favor, insira seu nome.');
            isValid = false;
        }

        if (email.value.trim() === '' || !validateEmail(email.value.trim())) {
            showError(email, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        if (phone.value.trim() === '' || !validatePhone(phone.value.trim())) {
            showError(phone, 'Por favor, insira um número de telefone válido no formato (xx)9XXXX-XXXX.');
            isValid = false;
        }

        if (message.value.trim() === '') {
            showError(message, 'Por favor, insira sua mensagem.');
            isValid = false;
        }

        if (isValid) {
            showSuccessAnimation();
        }

        return isValid;
    }

    // Função para validar o e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para validar o telefone
    function validatePhone(phone) {
        // Remove todos os caracteres não numéricos e verifica se o comprimento está correto
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 11; // Formato (xx)9XXXX-XXXX
    }

    // Função para exibir mensagem de erro
    function showError(input, message) {
        input.style.borderColor = 'red';
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.innerText = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    // Função para limpar mensagens de erro anteriores
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());

        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => input.style.borderColor = '');
    }

    // Função para exibir animação de sucesso
    function showSuccessAnimation() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerText = 'Mensagem enviada com sucesso!';
        
        document.body.appendChild(successMessage);
        
        // Aplicando estilos para a animação
        successMessage.style.position = 'fixed';
        successMessage.style.top = '50%';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translate(-50%, -50%) scale(0.5)';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '20px';
        successMessage.style.borderRadius = '10px';
        successMessage.style.fontSize = '20px';
        successMessage.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
        successMessage.style.zIndex = '1000';
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        // Animação de entrada
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);

        // Animação de saída e redirecionamento
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -50%) scale(0.5)';
            // Remover a mensagem da tela após a animação
            setTimeout(() => {
                successMessage.remove();
                // Redirecionar para a página inicial
                window.location.href = '../lading page/index.html'; // Altere o caminho conforme necessário
            }, 500);
        }, 2000);
    }

    // Função para adicionar animação aos ícones das redes sociais
    function addSocialAnimation() {
        const socialIcons = document.querySelectorAll('.redes-sociais li a');

        socialIcons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s';
            });

            icon.addEventListener('mouseout', () => {
                icon.style.transform = 'scale(1)';
            });
        });
    }

    // Aplica a máscara ao campo de telefone
    applyPhoneMask(document.getElementById('phone'));

    // Adicionando evento de clique ao botão de envio
    document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault(); // Evita o envio do formulário
        if (validateForm()) {
            // Simula o envio da mensagem se a validação passar
            console.log('Formulário enviado');
        }
    });

    // Adicionando animação aos ícones das redes sociais
    addSocialAnimation();
});
