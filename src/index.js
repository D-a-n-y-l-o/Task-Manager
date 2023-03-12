import './styles/style.css';
import {loginConfig} from './components/formConfigs';
import {Input} from './components/Input';
import {Form} from './components/Form';
import { api } from './components/API';
import { Auth } from './components/Auth';
import { TaskBoard } from './components/TaskBoard';

const appContainer = document.getElementById('app');

const onLoginSuccess = async () => {
    console.log('Hello');
    appContainer.innerHTML = '';
    const user = await api.getSelf();
    renderAppLayout(user);
};

const auth = new Auth({
    appContainer,
    onLoginSuccess,
});

export const taskBoard = new TaskBoard({
    appContainer 
});

const renderAppLayout = async (user) => {
    auth.user = user;
    auth.renderHeaderNav();
    taskBoard.renderLayout();

    const taskList = await api.getAllTasks();
    taskList.forEach((task) => taskBoard.addTask(task))
}

const init = async () => {
    const authorized = api.isLoggedIn();
    if(authorized) {
        const user = await api.autoLogin();
        console.log(user);
        renderAppLayout(user);
    } else{
        auth.renderAuthForm();
    }
}

init();



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

// const authorized = api.isLoggedIn();
// if(authorized) {
//     api.autoLogin();
// } else{
//     console.log('login form')
// }