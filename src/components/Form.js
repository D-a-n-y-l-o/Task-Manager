export class Form {
    constructor(options){
        const {
            inputs,
            onSubmit,
            submitBtnText,
            title
        } = options;

        this.submitBtn = document.createElement('button');
        this.inputs = inputs;
        this.form = document.createElement('form');
        this.createForm(options);
    }

    static getFormValues(inputs) {
        return inputs.reduce((values, input) => {
            values[input.name] = input.value;
            return values;
        }, {})
    }

    createForm({onSubmit, submitBtnText, title: titleText}) {
        const title = document.createElement('h3');

        title.innerText = titleText;
        this.submitBtn.type = 'submit';
        this.submitBtn.innerText = submitBtnText;
        
        title.classList.add('form_title');
        this.submitBtn.classList.add('btn', 'btn-form');
        this.form.classList.add('form')

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();

            this.formValues = Form.getFormValues(this.inputs);

            this.submitBtn.setAttribute('disabled', '');

            await onSubmit(this.formValues, event);

            this.submitBtn.removeAttribute('disabled');
        });

        this.form.append(title);

        this.inputs.forEach((input) => {
            input.render(this.form);
        });

        this.form.append(this.submitBtn);
    }

    render (container) {
        container.append(this.form);
    }
}