import './styles/style.css';
import {loginConfig} from './components/formConfigs'
import {Input} from './components/Input'
import {Form} from './components/Form'
import { api } from './components/API';

// const appContainer = document.getElementById('app');
// const testFormContainer = document.createElement('div');

// testFormContainer.classList.add('form-style');


// const loginForm = new Form ({
//     inputs: loginConfig.map((config) => new Input(config)),
//     onSubmit: (values) => console.log(values),
//     submitBtnText: 'Log In',
//     title: 'Login'
// });

// loginForm.render(testFormContainer);

// appContainer.append(testFormContainer);

// const input = new Input ({
//     name: 'email',
//     label: 'Email',
//     type: 'text'
// });

// input.render(document.body)


// api.login({
//     email: 'danylo22@gmail.com',
//     password: 'danylo'
// }).then((res) => {
//     api.getSelf();
// })

// api.register({
//     email: "danylo22@gmail.com",
//     name: "Danylo",
//     password: "danylo"
// })

const authorized = api.isLoggedIn();
if(authorized) {
    api.autoLogin();
} else{
    console.log('login form')
}