const TOKEN_KEY = 'token';

class APIError extends Error {
    constructor({message, data, status}) {
        super(message);
        this.data = data;
        this.status = status;
    }
}


class API {
    constructor() {
        this.baseUrl = 'https://byte-tasks.herokuapp.com'
        this.headers = {
            Authorization: null,
            'Content-Type': 'application/json',
        };
    }

    async handleErrors(response) {
        const {ok, status, statusText} = response
        if(!ok){
            throw new APIError({
                message: 'Error',
                data: await response.json(),
                status: status
            })
        }
    }

    async login (data) {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });

        await this.handleErrors(response);

        const {token} = await response.json();

        this.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem(TOKEN_KEY, token);
    }

    async register (data) {
        const response = await fetch(`${this.baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });

        await this.handleErrors(response);

        const registeredUser = await response.json();

        return registeredUser;
    }

    async getSelf () {
        const response = await fetch(`${this.baseUrl}/api/auth/user/self`, {
            method: 'GET',
            headers: this.headers,
        });

        await this.handleErrors(response);

        const user = await response.json();

        return user;
    }

    isLoggedIn () {
        return Boolean(localStorage.getItem(TOKEN_KEY));
    }

    autoLogin() {
        const localToken = localStorage.getItem(TOKEN_KEY);
        this.headers.Authorization = `Bearer ${localToken}`;

        return this.getSelf();
    }

    async createTask(data) {
        const response = await fetch(`${this.baseUrl}/api/task`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });

        await this.handleErrors(response);

        return response.json();
    }

    async getAllTasks () {
        const response = await fetch(`${this.baseUrl}/api/task`, {
            method: 'GET',
            headers: this.headers,
        });

        await this.handleErrors(response);

        return await response.json();
    }

    async editTask (id, data) {
        const response = await fetch(`${this.baseUrl}/api/task/${id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        });

        await this.handleErrors(response);

        return response.json();
    }

    async deleteTask (id) {
        const response = await fetch(`${this.baseUrl}/api/task/${id}`, {
            method: 'DELETE',
            headers: this.headers
        });

        await this.handleErrors(response);

        return response;
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
    }
};


export const api = new API ();
