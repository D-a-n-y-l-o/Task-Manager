import { Input } from './Input';
import { Form } from './Form';
import { api } from './API';
import { loginConfig, registerConfig } from './formConfigs';

const getLoginForm = (onSuccess) => {
    return new Form({
        title: 'Login',
        inputs: loginConfig.map((input) => new Input(input)),
        submitBtnText: 'Sign in',
        onSubmit: async (data) => {
            await api.login(data);
            onSuccess();
        }

    })
};

const getRegisterForm = (onSuccess) => {
    return new Form({
        title: 'Register',
        inputs: registerConfig.map((input) => new Input(input)),
        submitBtnText: 'Sign up',
        onSubmit: async (data) => {
            await api.register(data);
            onSuccess();
        }

    })
};

export class Auth {
    constructor ({appContainer, onLoginSuccess}) {
        this.appContainer = appContainer;
        this.formContainer = document.createElement('div');
        this.switchBtn = document.createElement('button');
        this.logoutBtn = document.createElement('button');
        this.avatarContainer = document.createElement('div');
        this.avatar = document.createElement('span');

        this.logoutBtn.setAttribute('type', 'submit');

        this.form = null;
        this.user = null;
        this.isLogin = true;

        this.loginForm = getLoginForm(onLoginSuccess);
        this.registerForm = getRegisterForm(this.switchForms.bind(this))

        this.createFormContainer();
        this.createHeaderNav();
    }

    createHeaderNav() {
        this.logoutBtn.classList.add('btn', 'btn-text');
        this.logoutBtn.innerText = 'Logout';
        this.avatarContainer.classList.add('header_logo');
        this.avatar.classList.add('header_logo-text');

        this.logoutBtn.addEventListener('click', () => {
            this.logout();
            api.logout();
        })
    }

    renderHeaderNav() {
        const navContainer = document.getElementById('header_nav');
        this.avatar.innerText = this.user.name[0];

        this.avatarContainer.append(this.avatar);

        navContainer.append(this.logoutBtn, this.avatarContainer);
    }

    createFormContainer() {
        this.formContainer.classList.add('form-style');
        this.switchBtn.classList.add('btn', 'btn-text', 'btn-text-form');
        this.switchBtn.innerText = 'Register';
        this.formContainer.prepend(this.switchBtn);

        this.switchBtn.addEventListener('click', () => {
            this.switchForms();
        })
    }

    renderAuthForm () {
        if(this.form){
            this.form.form.remove();
        };

        if(this.isLogin) {
            this.form = this.loginForm
        } else {
            this.form = this.registerForm
        }

        this.form.render(this.formContainer);

        this.appContainer.append(this.formContainer);
    }

    switchForms() {
        this.isLogin = !this.isLogin;

        if(this.isLogin) {
            this.switchBtn.innerText = 'Register';
        } else {
            this.switchBtn.innerText = 'Login';
        };

        this.renderAuthForm();
    }

    logout() {
        this.avatarContainer.remove();
        this.logoutBtn.remove();
        this.appContainer.innerHTML = '';
        this.isLogin = true;

        this.renderAuthForm();
    }
}