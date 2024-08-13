document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name.trim() === '' || phone.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!/^\d{10,11}$/.test(phone)) {
        alert('Por favor, insira um número de telefone válido (somente dígitos, 10 ou 11 caracteres).');
        return;
    }

    alert('Formulário enviado com sucesso!');
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
});
