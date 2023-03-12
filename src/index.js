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
