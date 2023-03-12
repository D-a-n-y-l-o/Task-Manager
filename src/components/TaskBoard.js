import { Input } from './Input';
import { Form } from './Form';
import { api } from './API';
import { Task } from './Task';
import { taskConfig } from './formConfigs';

const getTaskForm = (onTaskCreated) => {
    return new Form ({
        title: 'Add task',
        inputs: taskConfig.map((input) => new Input(input)),
        submitBtnText: 'Add',
        onSubmit: async (data) => {
            const createdTask = await api.createTask(data);
            onTaskCreated(createdTask);
        }
    })
}

export class TaskBoard {
    constructor({
        appContainer
    }) {
        this.appContainer = appContainer;
        this.taskForm = getTaskForm(this.addTask.bind(this));
        this.taskContainer = document.createElement('div');
    }

    renderLayout() {
        const board = document.createElement('div');
        const formContainer = document.createElement('div');

        board.classList.add('board');
        formContainer.classList.add('task-form');
        this.taskContainer.classList.add('task-cards');

        console.log(this.taskForm)

        board.append(formContainer, this.taskContainer);
        this.taskForm.render(formContainer);

        this.appContainer.append(board);
    }

    addTask (taskData) {
        const task = new Task(taskData);
        task.renderCard(this.taskContainer)
    }

    logout () {
        this.appContainer.innerHTML = '';
    }
}