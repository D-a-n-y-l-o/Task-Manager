/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://task-manager/./src/styles/style.css?");

/***/ }),

/***/ "./src/components/API.js":
/*!*******************************!*\
  !*** ./src/components/API.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\nconst TOKEN_KEY = 'token';\r\n\r\nclass APIError extends Error {\r\n    constructor({message, data, status}) {\r\n        super(message);\r\n        this.data = data;\r\n        this.status = status;\r\n    }\r\n}\r\n\r\n\r\nclass API {\r\n    constructor() {\r\n        this.baseUrl = 'https://byte-tasks.herokuapp.com'\r\n        this.headers = {\r\n            Authorization: null,\r\n            'Content-Type': 'application/json',\r\n        };\r\n    }\r\n\r\n    async handleErrors(response) {\r\n        const {ok, status, statusText} = response\r\n        if(!ok){\r\n            throw new APIError({\r\n                message: 'Error',\r\n                data: await response.json(),\r\n                status: status\r\n            })\r\n        }\r\n    }\r\n\r\n    async login (data) {\r\n        const response = await fetch(`${this.baseUrl}/api/auth/login`, {\r\n            method: 'POST',\r\n            headers: this.headers,\r\n            body: JSON.stringify(data)\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const {token} = await response.json();\r\n\r\n        this.headers.Authorization = `Bearer ${token}`;\r\n\r\n        localStorage.setItem(TOKEN_KEY, token);\r\n    }\r\n\r\n    async register (data) {\r\n        const response = await fetch(`${this.baseUrl}/api/auth/register`, {\r\n            method: 'POST',\r\n            headers: this.headers,\r\n            body: JSON.stringify(data)\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const registeredUser = await response.json();\r\n\r\n        return registeredUser;\r\n    }\r\n\r\n    async getSelf () {\r\n        const response = await fetch(`${this.baseUrl}/api/auth/user/self`, {\r\n            method: 'GET',\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const user = await response.json();\r\n\r\n        return user;\r\n    }\r\n\r\n    isLoggedIn () {\r\n        return Boolean(localStorage.getItem(TOKEN_KEY));\r\n    }\r\n\r\n    autoLogin() {\r\n        const localToken = localStorage.getItem(TOKEN_KEY);\r\n        this.headers.Authorization = `Bearer ${localToken}`;\r\n\r\n        return this.getSelf();\r\n    }\r\n\r\n    async createTask(data) {\r\n        const response = await fetch(`${this.baseUrl}/api/task`, {\r\n            method: 'POST',\r\n            headers: this.headers,\r\n            body: JSON.stringify(data)\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return response.json();\r\n    }\r\n\r\n    async getAllTasks () {\r\n        const response = await fetch(`${this.baseUrl}/api/task`, {\r\n            method: 'GET',\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return await response.json();\r\n    }\r\n\r\n    async editTask (id, data) {\r\n        const response = await fetch(`${this.baseUrl}/api/task/${id}`, {\r\n            method: 'PATCH',\r\n            headers: this.headers,\r\n            body: JSON.stringify(data)\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return response.json();\r\n    }\r\n\r\n    async deleteTask (id) {\r\n        const response = await fetch(`${this.baseUrl}/api/task/${id}`, {\r\n            method: 'DELETE',\r\n            headers: this.headers\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return response;\r\n    }\r\n\r\n    logout() {\r\n        localStorage.removeItem(TOKEN_KEY);\r\n    }\r\n};\r\n\r\n\r\nconst api = new API ();\r\n\n\n//# sourceURL=webpack://task-manager/./src/components/API.js?");

/***/ }),

/***/ "./src/components/Auth.js":
/*!********************************!*\
  !*** ./src/components/Auth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Auth\": () => (/* binding */ Auth)\n/* harmony export */ });\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ \"./src/components/Input.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ \"./src/components/Form.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst getLoginForm = (onSuccess) => {\r\n    return new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\r\n        title: 'Login',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.loginConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_0__.Input(input)),\r\n        submitBtnText: 'Sign in',\r\n        onSubmit: async (data) => {\r\n            await _API__WEBPACK_IMPORTED_MODULE_2__.api.login(data);\r\n            onSuccess();\r\n        }\r\n\r\n    })\r\n};\r\n\r\nconst getRegisterForm = (onSuccess) => {\r\n    return new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\r\n        title: 'Register',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.registerConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_0__.Input(input)),\r\n        submitBtnText: 'Sign up',\r\n        onSubmit: async (data) => {\r\n            await _API__WEBPACK_IMPORTED_MODULE_2__.api.register(data);\r\n            onSuccess();\r\n        }\r\n\r\n    })\r\n};\r\n\r\nclass Auth {\r\n    constructor ({appContainer, onLoginSuccess}) {\r\n        this.appContainer = appContainer;\r\n        this.formContainer = document.createElement('div');\r\n        this.switchBtn = document.createElement('button');\r\n        this.logoutBtn = document.createElement('button');\r\n        this.avatarContainer = document.createElement('div');\r\n        this.avatar = document.createElement('span');\r\n\r\n        this.logoutBtn.setAttribute('type', 'submit');\r\n\r\n        this.form = null;\r\n        this.user = null;\r\n        this.isLogin = true;\r\n\r\n        this.loginForm = getLoginForm(onLoginSuccess);\r\n        this.registerForm = getRegisterForm(this.switchForms.bind(this))\r\n\r\n        this.createFormContainer();\r\n        this.createHeaderNav();\r\n    }\r\n\r\n    createHeaderNav() {\r\n        this.logoutBtn.classList.add('btn', 'btn-text');\r\n        this.logoutBtn.innerText = 'Logout';\r\n        this.avatarContainer.classList.add('header_logo');\r\n        this.avatar.classList.add('header_logo-text');\r\n\r\n        this.logoutBtn.addEventListener('click', () => {\r\n            _index__WEBPACK_IMPORTED_MODULE_4__.taskBoard.logout();\r\n            this.logout();\r\n            _API__WEBPACK_IMPORTED_MODULE_2__.api.logout();\r\n            \r\n        })\r\n    }\r\n\r\n    renderHeaderNav() {\r\n        const navContainer = document.getElementById('header_nav');\r\n        this.avatar.innerText = this.user.name[0];\r\n\r\n        this.avatarContainer.append(this.avatar);\r\n\r\n        navContainer.append(this.logoutBtn, this.avatarContainer);\r\n    }\r\n\r\n    createFormContainer() {\r\n        this.formContainer.classList.add('form-style');\r\n        this.switchBtn.classList.add('btn', 'btn-text', 'btn-text-form');\r\n        this.switchBtn.innerText = 'Register';\r\n        this.formContainer.prepend(this.switchBtn);\r\n\r\n        this.switchBtn.addEventListener('click', () => {\r\n            this.switchForms();\r\n        })\r\n    }\r\n\r\n    renderAuthForm () {\r\n        if(this.form){\r\n            this.form.form.remove();\r\n        };\r\n\r\n        if(this.isLogin) {\r\n            this.form = this.loginForm\r\n        } else {\r\n            this.form = this.registerForm\r\n        }\r\n\r\n        this.form.render(this.formContainer);\r\n\r\n        this.appContainer.append(this.formContainer);\r\n    }\r\n\r\n    switchForms() {\r\n        this.isLogin = !this.isLogin;\r\n\r\n        if(this.isLogin) {\r\n            this.switchBtn.innerText = 'Register';\r\n        } else {\r\n            this.switchBtn.innerText = 'Login';\r\n        };\r\n\r\n        this.renderAuthForm();\r\n    }\r\n\r\n    logout() {\r\n        this.avatarContainer.remove();\r\n        this.logoutBtn.remove();\r\n        this.appContainer.innerHTML = '';\r\n        this.isLogin = true;\r\n\r\n        this.renderAuthForm();\r\n    }\r\n}\n\n//# sourceURL=webpack://task-manager/./src/components/Auth.js?");

/***/ }),

/***/ "./src/components/Form.js":
/*!********************************!*\
  !*** ./src/components/Form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Form\": () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\r\n    constructor(options){\r\n        const {\r\n            inputs,\r\n            onSubmit,\r\n            submitBtnText,\r\n            title\r\n        } = options;\r\n\r\n        this.submitBtn = document.createElement('button');\r\n        this.inputs = inputs;\r\n        this.form = document.createElement('form');\r\n        this.createForm(options);\r\n    }\r\n\r\n    static getFormValues(inputs) {\r\n        return inputs.reduce((values, input) => {\r\n            values[input.name] = input.value;\r\n            return values;\r\n        }, {})\r\n    }\r\n\r\n    createForm({onSubmit, submitBtnText, title: titleText}) {\r\n        const title = document.createElement('h3');\r\n\r\n        title.innerText = titleText;\r\n        this.submitBtn.type = 'submit';\r\n        this.submitBtn.innerText = submitBtnText;\r\n        \r\n        title.classList.add('form_title');\r\n        this.submitBtn.classList.add('btn', 'btn-form');\r\n        this.form.classList.add('form')\r\n\r\n        this.form.addEventListener('submit', async (event) => {\r\n            event.preventDefault();\r\n\r\n            this.formValues = Form.getFormValues(this.inputs);\r\n\r\n            this.submitBtn.setAttribute('disabled', '');\r\n\r\n            try{\r\n                await onSubmit(this.formValues, event);\r\n            }catch (err) {\r\n                console.log(Object.entries(err.data));\r\n                Object.entries(err.data).forEach(([path, message]) => {\r\n                    console.log(path, message)\r\n                    const erroredInput = this.inputs.find((input) => {\r\n                        return input.name === path;\r\n                    });\r\n                    console.log(erroredInput)\r\n                    erroredInput.updateErrorMassage(message);\r\n                });\r\n            }\r\n\r\n\r\n            this.submitBtn.removeAttribute('disabled');\r\n        });\r\n\r\n        this.form.append(title);\r\n\r\n        this.inputs.forEach((input) => {\r\n            input.render(this.form);\r\n        });\r\n\r\n        this.form.append(this.submitBtn);\r\n    }\r\n\r\n    render (container) {\r\n        container.append(this.form);\r\n    }\r\n}\n\n//# sourceURL=webpack://task-manager/./src/components/Form.js?");

/***/ }),

/***/ "./src/components/Input.js":
/*!*********************************!*\
  !*** ./src/components/Input.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Input\": () => (/* binding */ Input)\n/* harmony export */ });\nclass Input {\r\n    constructor (options) {\r\n        const {\r\n            name,\r\n            label,\r\n            type,\r\n            onInput,\r\n            onChange\r\n        } = options;\r\n\r\n        this.input = document.createElement('input');\r\n        this.errorMessageElement = document.createElement('p');\r\n\r\n        this.name = name;\r\n        this.input.name = name;\r\n        this.label = label;\r\n        this.input.type = type;\r\n        this.control = this.createControl(onInput, onChange);\r\n\r\n        this.value = this.input.value;\r\n    }\r\n\r\n    createControl(onInput, onChange) {\r\n        const container = document.createElement('div');\r\n        const label = document.createElement('label');\r\n\r\n        const inputId = `_${this.name}`;\r\n\r\n        container.classList.add('text-control');\r\n        label.classList.add('form_label');\r\n        this.input.classList.add('form_input');\r\n        this.errorMessageElement.classList.add('error-message');\r\n\r\n\r\n        this.input.id = inputId;\r\n        label.setAttribute('for', inputId);\r\n\r\n        label.innerText = this.label;\r\n\r\n        container.append(label, this.input, this.errorMessageElement);\r\n\r\n        this.input.addEventListener('input', (event) => {\r\n            this.value = event.target.value;\r\n            this.updateErrorMassage('')\r\n            if(onInput) {\r\n                onInput(event);\r\n            }\r\n        });\r\n\r\n\r\n        if(onChange) {\r\n            this.input.addEventListener('change', (event) => {\r\n                onChange(event);\r\n            }); \r\n        };\r\n\r\n        return container;\r\n    }\r\n\r\n    render(container) {\r\n        container.append(this.control);\r\n    }\r\n\r\n    updateErrorMassage (message) {\r\n        this.errorMessageElement.innerText = message;\r\n    }\r\n}\n\n//# sourceURL=webpack://task-manager/./src/components/Input.js?");

/***/ }),

/***/ "./src/components/Task.js":
/*!********************************!*\
  !*** ./src/components/Task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n\r\n\r\nclass Task {\r\n    constructor({\r\n        name,\r\n        description,\r\n        timeTracked,\r\n        isActive,\r\n        isFinished,\r\n        _id,\r\n        createdAt\r\n    }) {\r\n        this.name = name;\r\n        this.description = description;\r\n        this.timeTracked = timeTracked;\r\n        this.isActive = isActive;\r\n        this.isFinished = isFinished;\r\n        this.createdAt = new Date(createdAt);\r\n\r\n        this.id = _id;\r\n\r\n        this.taskCard = document.createElement('div');\r\n        this.deleteBtn = document.createElement('button');\r\n        this.timerBtn = document.createElement('button');\r\n        this.timeTrackedElement = document.createElement('span');\r\n        this.markAsDoneBtn = document.createElement('button');\r\n        this.timeTrackedIntervalId = null;\r\n    }\r\n\r\n    renderCard(container) {\r\n        const titleElem = document.createElement('h3');\r\n        const descriptionElement = document.createElement('p');\r\n        const timeTracker = document.createElement('div');\r\n        const dateElement = document.createElement('p');\r\n\r\n        titleElem.classList.add('task-name');\r\n        descriptionElement.classList.add('task-description');\r\n        timeTracker.classList.add('time-tracker');\r\n        dateElement.classList.add('task-date');\r\n\r\n        this.taskCard.classList.add('task-card');\r\n        this.deleteBtn.classList.add('task-delete-btn');\r\n        this.timerBtn.classList.add('btn', 'timer-btn');\r\n        this.markAsDoneBtn.classList.add('btn', 'btn-form-small');\r\n\r\n        if(this.isFinished){\r\n            this.timerBtn.setAttribute('disabled', '');\r\n            this.taskCard.classList.add('task-finished');\r\n            this.markAsDoneBtn.innerText = 'Restart';\r\n        } else {\r\n            this.taskCard.classList.add(\r\n                this.isActive ? 'task-running' : 'task-planned'\r\n            );\r\n            this.markAsDoneBtn.innerText = 'Mark as Done';\r\n        };\r\n\r\n        titleElem.innerText = this.name;\r\n        descriptionElement.innerText = this.description;\r\n\r\n        console.log(this.createdAt);\r\n\r\n        dateElement.innerText = Task.getFormattedDate(this.createdAt);\r\n        this.timeTrackedElement.innerText = Task.getFormattedTimeTracked(this.timeTracked);\r\n\r\n        this.deleteBtn.innerHTML = '<i class=\"fa-solid fa-xmark\"></i>';\r\n\r\n        if(this.isActive) {\r\n            this.startTracker();\r\n            this.timerBtn.innerHTML = '<i class=\"fa-solid fa-pause\"></i>';\r\n        } else {\r\n            this.timerBtn.innerHTML = '<i class=\"fa-solid fa-play\"></i>';\r\n        };\r\n\r\n        timeTracker.append(this.timerBtn, this.timeTrackedElement);\r\n\r\n        this.taskCard.append(\r\n            titleElem,\r\n            descriptionElement,\r\n            timeTracker,\r\n            dateElement,\r\n            this.markAsDoneBtn,\r\n            this.deleteBtn\r\n        );\r\n\r\n        container.append(this.taskCard);\r\n\r\n        this.timerBtn.addEventListener('click', this.toggleTimeTracker);\r\n        this.deleteBtn.addEventListener('click', this.removeTask);\r\n        this.markAsDoneBtn.addEventListener('click', this.toggleTaskFinished)\r\n    }\r\n\r\n    removeTask = async () => {\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.deleteTask(this.id);\r\n        this.taskCard.remove();\r\n    }\r\n\r\n    toggleTaskFinished = async () => {\r\n        this.isFinished = !this.isFinished;\r\n\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, {isFinished: this.isFinished});\r\n\r\n        this.taskCard.classList.toggle('task-finished');\r\n        if(this.isFinished){\r\n            this.timerBtn.setAttribute('disabled', '');\r\n            this.markAsDoneBtn.innerText = 'Restart';\r\n            this.stopTracker();\r\n        } else {\r\n            this.timerBtn.removeAttribute('disabled');\r\n            this.markAsDoneBtn.innerText = 'Mark as Done';\r\n        }\r\n    }\r\n\r\n    toggleTimeTracker = async () => {\r\n        this.isActive = !this.isActive;\r\n\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, {\r\n            isActive: this.isActive,\r\n        });\r\n\r\n        if(this.isActive) {\r\n            this.startTracker();\r\n        } else {\r\n            this.stopTracker();\r\n        }\r\n    }\r\n\r\n    startTracker () {\r\n        this.taskCard.classList.remove('task-planned');\r\n        this.taskCard.classList.add('task-running');\r\n        this.timerBtn.innerHTML = '<i class=\"fa-solid fa-pause\"></i>';\r\n\r\n        this.timeTrackedIntervalId = setInterval(() => {\r\n            this.timeTracked += 1000;\r\n            this.updateTimeTracker()\r\n        }, 1000)\r\n    }\r\n\r\n    stopTracker () {\r\n        this.taskCard.classList.remove('task-running');\r\n        this.taskCard.classList.add('task-planned');\r\n        this.timerBtn.innerHTML = '<i class=\"fa-solid fa-play\"></i>';\r\n\r\n        clearInterval(this.timeTrackedIntervalId);\r\n    }\r\n\r\n    updateTimeTracker () {\r\n        const formatted = Task.getFormattedTimeTracked(this.timeTracked);\r\n        this.timeTrackedElement.innerText = formatted;\r\n    }\r\n\r\n    static getFormattedDate (_date) {\r\n        const date = _date.toLocaleDateString();\r\n        const time = _date.toLocaleTimeString();\r\n\r\n        return `${date} ${time}`;\r\n    }\r\n\r\n    static addOptionalZero(value) {\r\n        return value > 9 ? value : `0${value}`;\r\n    }\r\n\r\n    static getFormattedTimeTracked (timeTracked) {\r\n        const timeTrackedSeconds = Math.floor(timeTracked / 1000);\r\n        const hours = Math.floor(timeTrackedSeconds / 3600);\r\n        const minutes = Math.floor((timeTrackedSeconds - hours * 3600) / 60);\r\n        const seconds = timeTrackedSeconds - hours * 3600 - minutes* 60;\r\n\r\n        return `${this.addOptionalZero(hours)}:${this.addOptionalZero(minutes)}:${this.addOptionalZero(seconds)}`;\r\n    }\r\n}\n\n//# sourceURL=webpack://task-manager/./src/components/Task.js?");

/***/ }),

/***/ "./src/components/TaskBoard.js":
/*!*************************************!*\
  !*** ./src/components/TaskBoard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TaskBoard\": () => (/* binding */ TaskBoard)\n/* harmony export */ });\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ \"./src/components/Input.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ \"./src/components/Form.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Task */ \"./src/components/Task.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formConfigs */ \"./src/components/formConfigs.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst getTaskForm = (onTaskCreated) => {\r\n    return new _Form__WEBPACK_IMPORTED_MODULE_1__.Form ({\r\n        title: 'Add task',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_4__.taskConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_0__.Input(input)),\r\n        submitBtnText: 'Add',\r\n        onSubmit: async (data) => {\r\n            const createdTask = await _API__WEBPACK_IMPORTED_MODULE_2__.api.createTask(data);\r\n            onTaskCreated(createdTask);\r\n        }\r\n    })\r\n}\r\n\r\nclass TaskBoard {\r\n    constructor({\r\n        appContainer\r\n    }) {\r\n        this.appContainer = appContainer;\r\n        this.taskForm = getTaskForm(this.addTask.bind(this));\r\n        this.taskContainer = document.createElement('div');\r\n    }\r\n\r\n    renderLayout() {\r\n        const board = document.createElement('div');\r\n        const formContainer = document.createElement('div');\r\n\r\n        board.classList.add('board');\r\n        formContainer.classList.add('task-form');\r\n        this.taskContainer.classList.add('task-cards');\r\n\r\n        console.log(this.taskForm)\r\n\r\n        board.append(formContainer, this.taskContainer);\r\n        this.taskForm.render(formContainer);\r\n\r\n        this.appContainer.append(board);\r\n    }\r\n\r\n    addTask (taskData) {\r\n        const task = new _Task__WEBPACK_IMPORTED_MODULE_3__.Task(taskData);\r\n        task.renderCard(this.taskContainer)\r\n    }\r\n\r\n    logout () {\r\n        this.appContainer.innerHTML = '';\r\n    }\r\n}\n\n//# sourceURL=webpack://task-manager/./src/components/TaskBoard.js?");

/***/ }),

/***/ "./src/components/formConfigs.js":
/*!***************************************!*\
  !*** ./src/components/formConfigs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginConfig\": () => (/* binding */ loginConfig),\n/* harmony export */   \"registerConfig\": () => (/* binding */ registerConfig),\n/* harmony export */   \"taskConfig\": () => (/* binding */ taskConfig)\n/* harmony export */ });\nconst loginConfig = [\r\n    {\r\n        name: 'email',\r\n        label: 'Email',\r\n        type: 'text'\r\n    },\r\n    {\r\n        name: 'password',\r\n        label: 'Password',\r\n        type: 'password'\r\n    }\r\n];\r\n\r\nconst registerConfig = [\r\n    {\r\n        name: 'email',\r\n        label: 'Email',\r\n        type: 'text'\r\n    },\r\n    {\r\n        name: 'name',\r\n        label: 'Name',\r\n        type: 'text'\r\n    },\r\n    {\r\n        name: 'password',\r\n        label: 'Password',\r\n        type: 'password'\r\n    }\r\n];\r\n\r\nconst taskConfig = [\r\n    {\r\n        name: 'name',\r\n        label: 'Name',\r\n        type: 'text'\r\n    },\r\n    {\r\n        name: 'description',\r\n        label: 'Description',\r\n        type: 'text'\r\n    }\r\n];\n\n//# sourceURL=webpack://task-manager/./src/components/formConfigs.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskBoard\": () => (/* binding */ taskBoard)\n/* harmony export */ });\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ \"./src/styles/style.css\");\n/* harmony import */ var _components_formConfigs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Input */ \"./src/components/Input.js\");\n/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Form */ \"./src/components/Form.js\");\n/* harmony import */ var _components_API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/API */ \"./src/components/API.js\");\n/* harmony import */ var _components_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Auth */ \"./src/components/Auth.js\");\n/* harmony import */ var _components_TaskBoard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/TaskBoard */ \"./src/components/TaskBoard.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst appContainer = document.getElementById('app');\r\n\r\nconst onLoginSuccess = async () => {\r\n    console.log('Hello');\r\n    appContainer.innerHTML = '';\r\n    const user = await _components_API__WEBPACK_IMPORTED_MODULE_4__.api.getSelf();\r\n    renderAppLayout(user);\r\n};\r\n\r\nconst auth = new _components_Auth__WEBPACK_IMPORTED_MODULE_5__.Auth({\r\n    appContainer,\r\n    onLoginSuccess,\r\n});\r\n\r\nconst taskBoard = new _components_TaskBoard__WEBPACK_IMPORTED_MODULE_6__.TaskBoard({\r\n    appContainer \r\n});\r\n\r\nconst renderAppLayout = async (user) => {\r\n    auth.user = user;\r\n    auth.renderHeaderNav();\r\n    taskBoard.renderLayout();\r\n\r\n    const taskList = await _components_API__WEBPACK_IMPORTED_MODULE_4__.api.getAllTasks();\r\n    taskList.forEach((task) => taskBoard.addTask(task))\r\n}\r\n\r\nconst init = async () => {\r\n    const authorized = _components_API__WEBPACK_IMPORTED_MODULE_4__.api.isLoggedIn();\r\n    if(authorized) {\r\n        const user = await _components_API__WEBPACK_IMPORTED_MODULE_4__.api.autoLogin();\r\n        console.log(user);\r\n        renderAppLayout(user);\r\n    } else{\r\n        auth.renderAuthForm();\r\n    }\r\n}\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://task-manager/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;