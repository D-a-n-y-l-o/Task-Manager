import { api } from './API';

export class Task {
    constructor({
        name,
        description,
        timeTracked,
        isActive,
        isFinished,
        _id,
        createdAt
    }) {
        this.name = name;
        this.description = description;
        this.timeTracked = timeTracked;
        this.isActive = isActive;
        this.isFinished = isFinished;
        this.createdAt = new Date(createdAt);

        this.id = _id;

        this.taskCard = document.createElement('div');
        this.deleteBtn = document.createElement('button');
        this.timerBtn = document.createElement('button');
        this.timeTrackedElement = document.createElement('span');
        this.markAsDoneBtn = document.createElement('button');
        this.timeTrackedIntervalId = null;
    }

    renderCard(container) {
        const titleElem = document.createElement('h3');
        const descriptionElement = document.createElement('p');
        const timeTracker = document.createElement('div');
        const dateElement = document.createElement('p');

        titleElem.classList.add('task-name');
        descriptionElement.classList.add('task-description');
        timeTracker.classList.add('time-tracker');
        dateElement.classList.add('task-date');

        this.taskCard.classList.add('task-card');
        this.deleteBtn.classList.add('task-delete-btn');
        this.timerBtn.classList.add('btn', 'timer-btn');
        this.markAsDoneBtn.classList.add('btn', 'btn-form-small');

        if(this.isFinished){
            this.timerBtn.setAttribute('disabled', '');
            this.taskCard.classList.add('task-finished');
            this.markAsDoneBtn.innerText = 'Restart';
        } else {
            this.taskCard.classList.add(
                this.isActive ? 'task-running' : 'task-planned'
            );
            this.markAsDoneBtn.innerText = 'Mark as Done';
        };

        titleElem.innerText = this.name;
        descriptionElement.innerText = this.description;

        console.log(this.createdAt);

        dateElement.innerText = Task.getFormattedDate(this.createdAt);
        this.timeTrackedElement.innerText = Task.getFormattedTimeTracked(this.timeTracked);

        this.deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        if(this.isActive) {
            this.startTracker();
            this.timerBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            this.timerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        };

        timeTracker.append(this.timerBtn, this.timeTrackedElement);

        this.taskCard.append(
            titleElem,
            descriptionElement,
            timeTracker,
            dateElement,
            this.markAsDoneBtn,
            this.deleteBtn
        );

        container.append(this.taskCard);

        this.timerBtn.addEventListener('click', this.toggleTimeTracker);
        this.deleteBtn.addEventListener('click', this.removeTask);
        this.markAsDoneBtn.addEventListener('click', this.toggleTaskFinished)
    }

    removeTask = async () => {
        await api.deleteTask(this.id);
        this.taskCard.remove();
    }

    toggleTaskFinished = async () => {
        this.isFinished = !this.isFinished;

        await api.editTask(this.id, {isFinished: this.isFinished});

        this.taskCard.classList.toggle('task-finished');
        if(this.isFinished){
            this.timerBtn.setAttribute('disabled', '');
            this.markAsDoneBtn.innerText = 'Restart';
            this.stopTracker();
        } else {
            this.timerBtn.removeAttribute('disabled');
            this.markAsDoneBtn.innerText = 'Mark as Done';
        }
    }

    toggleTimeTracker = async () => {
        this.isActive = !this.isActive;

        await api.editTask(this.id, {
            isActive: this.isActive,
        });

        if(this.isActive) {
            this.startTracker();
        } else {
            this.stopTracker();
        }
    }

    startTracker () {
        this.taskCard.classList.remove('task-planned');
        this.taskCard.classList.add('task-running');
        this.timerBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        this.timeTrackedIntervalId = setInterval(() => {
            this.timeTracked += 1000;
            this.updateTimeTracker()
        }, 1000)
    }

    stopTracker () {
        this.taskCard.classList.remove('task-running');
        this.taskCard.classList.add('task-planned');
        this.timerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

        clearInterval(this.timeTrackedIntervalId);
    }

    updateTimeTracker () {
        const formatted = Task.getFormattedTimeTracked(this.timeTracked);
        this.timeTrackedElement.innerText = formatted;
    }

    static getFormattedDate (_date) {
        const date = _date.toLocaleDateString();
        const time = _date.toLocaleTimeString();

        return `${date} ${time}`;
    }

    static addOptionalZero(value) {
        return value > 9 ? value : `0${value}`;
    }

    static getFormattedTimeTracked (timeTracked) {
        const timeTrackedSeconds = Math.floor(timeTracked / 1000);
        const hours = Math.floor(timeTrackedSeconds / 3600);
        const minutes = Math.floor((timeTrackedSeconds - hours * 3600) / 60);
        const seconds = timeTrackedSeconds - hours * 3600 - minutes* 60;

        return `${this.addOptionalZero(hours)}:${this.addOptionalZero(minutes)}:${this.addOptionalZero(seconds)}`;
    }
}