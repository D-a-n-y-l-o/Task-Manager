export class Input {
    constructor (options) {
        const {
            name,
            label,
            type,
            onInput,
            onChange
        } = options;

        this.input = document.createElement('input');
        this.errorMessageElement = document.createElement('p');

        this.name = name;
        this.input.name = name;
        this.label = label;
        this.input.type = type;
        this.control = this.createControl(onInput, onChange);

        this.value = this.input.value;
    }

    createControl(onInput, onChange) {
        const container = document.createElement('div');
        const label = document.createElement('label');

        const inputId = `_${this.name}`;

        container.classList.add('text-control');
        label.classList.add('form_label');
        this.input.classList.add('form_input');
        this.errorMessageElement.classList.add('error-message');


        this.input.id = inputId;
        label.setAttribute('for', inputId);

        label.innerText = this.label;

        container.append(label, this.input, this.errorMessageElement);

        this.input.addEventListener('input', (event) => {
            this.value = event.target.value;
            if(onInput) {
                onInput(event);
            }
        });


        if(onChange) {
            this.input.addEventListener('change', (event) => {
                onChange(event);
            }); 
        };

        return container;
    }

    render(container) {
        container.append(this.control);
    }
}