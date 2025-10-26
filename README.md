<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inicio de Sesión - Barbería NicoSTN</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #4f46e5, #9333ea, #ec4899);
      background-size: 400% 400%;
      animation: gradient 10s ease infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      padding: 40px;
      width: 350px;
      text-align: center;
      transition: all 0.3s ease-in-out;
    }

    h1 {
      color: #333;
      font-size: 26px;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.2s;
    }

    input:focus {
      border-color: #6366f1;
      outline: none;
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
    }

    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(90deg, #4f46e5, #9333ea, #ec4899);
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    button:hover {
      background: linear-gradient(90deg, #4338ca, #7e22ce, #db2777);
      transform: scale(1.05);
    }

    .switch {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .switch button {
      width: 45%;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      border: 1px solid #ddd;
      color: #333;
      background: #f4f4f4;
      cursor: pointer;
      transition: all 0.3s;
    }

    .switch button.active {
      background: #4f46e5;
      color: white;
      border-color: #4f46e5;
    }

    .error {
      background: #fee2e2;
      color: #b91c1c;
      padding: 8px;
      border-radius: 8px;
      font-size: 13px;
      margin-top: 8px;
    }

    .success {
      background: #dcfce7;
      color: #166534;
      padding: 8px;
      border-radius: 8px;
      font-size: 13px;
      margin-top: 8px;
    }

    .link {
      color: #4f46e5;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      margin-top: 15px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="container" id="app">
    <h1>Bienvenido 👋</h1>
    <p>Inicia sesión o regístrate</p>

    <div class="switch">
      <button id="btnUser" class="active">Usuario</button>
      <button id="btnAdmin">Administrador</button>
    </div>

    <div id="formLogin">
      <input type="text" id="username" placeholder="Nombre de usuario" />
      <input type="password" id="password" placeholder="Contraseña" />
      <button id="loginBtn">Entrar</button>
      <div id="message"></div>
      <span class="link" id="toRegister">¿No tienes cuenta? Regístrate</span>
    </div>

    <div id="formRegister" style="display:none;">
      <input type="text" id="newUser" placeholder="Nuevo usuario" />
      <input type="password" id="newPass" placeholder="Contraseña" />
      <button id="registerBtn">Crear cuenta</button>
      <div id="regMessage"></div>
      <span class="link" id="toLogin">¿Ya tienes cuenta? Inicia sesión</span>
    </div>
  </div>

  <script>
    const btnUser = document.getElementById('btnUser');
    const btnAdmin = document.getElementById('btnAdmin');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const message = document.getElementById('message');

    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const toRegister = document.getElementById('toRegister');
    const toLogin = document.getElementById('toLogin');

    const newUser = document.getElementById('newUser');
    const newPass = document.getElementById('newPass');
    const registerBtn = document.getElementById('registerBtn');
    const regMessage = document.getElementById('regMessage');

    let mode = 'user'; // user o admin

    // Modo usuario
    btnUser.addEventListener('click', () => {
      mode = 'user';
      btnUser.classList.add('active');
      btnAdmin.classList.remove('active');
      usernameInput.placeholder = 'Nombre de usuario';
      passwordInput.placeholder = 'Contraseña';
      message.textContent = '';
    });

    // Modo admin
    btnAdmin.addEventListener('click', () => {
      mode = 'admin';
      btnAdmin.classList.add('active');
      btnUser.classList.remove('active');
      usernameInput.placeholder = 'Código de administrador';
      passwordInput.placeholder = 'Contraseña de administrador';
      message.textContent = '';
    });

    // Cambio entre login y registro
    toRegister.addEventListener('click', () => {
      formLogin.style.display = 'none';
      formRegister.style.display = 'block';
      message.textContent = '';
    });

    toLogin.addEventListener('click', () => {
      formRegister.style.display = 'none';
      formLogin.style.display = 'block';
      regMessage.textContent = '';
    });

    // Guardar nuevo usuario
    registerBtn.addEventListener('click', () => {
      const user = newUser.value.trim();
      const pass = newPass.value.trim();

      if (!user || !pass) {
        showMessage(regMessage, 'Completa todos los campos.', 'error');
        return;
      }

      let users = JSON.parse(localStorage.getItem('usuarios')) || {};

      if (users[user]) {
        showMessage(regMessage, 'El usuario ya existe.', 'error');
        return;
      }

      users[user] = pass;
      localStorage.setItem('usuarios', JSON.stringify(users));

      showMessage(regMessage, 'Usuario creado con éxito ✅', 'success');
      newUser.value = '';
      newPass.value = '';

      setTimeout(() => {
        formRegister.style.display = 'none';
        formLogin.style.display = 'block';
      }, 1500);
    });

    // Login
    loginBtn.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (username === '' || password === '') {
        showMessage(message, 'Por favor, completa todos los campos.', 'error');
        return;
      }

      if (mode === 'user') {
        const users = JSON.parse(localStorage.getItem('usuarios')) || {};
        if (users[username] && users[username] === password) {
          showMessage(message, `Bienvenido ${username} 😎`, 'success');
          setTimeout(() => window.location.href = 'usuarios.html', 1500);
        } else {
          showMessage(message, 'Usuario o contraseña incorrectos.', 'error');
        }
      } else {
        if (password === '123456') {
          showMessage(message, 'Bienvenido administrador 🔐', 'success');
          setTimeout(() => window.location.href = 'administrador.html', 1500);
        } else {
          showMessage(message, 'Contraseña de administrador incorrecta.', 'error');
        }
      }
    });

    function showMessage(element, text, type) {
      element.textContent = text;
      element.className = type;
    }
  </script>
</body>
</html>
