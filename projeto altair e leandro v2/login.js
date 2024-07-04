function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var mensagemElement = document.getElementById("mensagem-login");

    if (username === "admin" && password === "2024") {
        
        window.location.href = "menu.html";
    } else {
        
        mensagemElement.textContent = "Login incorreto. Verifique a senha ou o nome de usuário.";
    }
    
}



    