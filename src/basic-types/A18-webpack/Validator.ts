interface Iform {
  name: HTMLInputElement,
  email: HTMLInputElement,
  subject: HTMLInputElement,
  phone: HTMLInputElement,
}

class Validator {
  form: HTMLFormElement
  values: Iform

  constructor() {
    this.form = document.querySelector('.signin-form') as HTMLFormElement

    this.values = {
      name: document.querySelector('#w3lName') as HTMLInputElement,
      phone: document.querySelector('#w3lPhone') as HTMLInputElement,
      email: document.querySelector('#w3lSender') as HTMLInputElement,
      subject: document.querySelector('#w3lSubject') as HTMLInputElement
    }

    this.handleSubmit()
  }

  handleSubmit() {
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      this.handleErrors()
    })
  }

  handleErrors() {
    const strippedName = this.values.name.value.trim().replace(/<\/?[^>]+(>|$)/g, '')
    const strippedEmail = this.values.email.value.trim().replace(/<\/?[^>]+(>|$)/g, '')
    const strippedsubject = this.values.subject.value.trim().replace(/<\/?[^>]+(>|$)/g, '')
    const strippedphoneNumber = this.values.phone.value.trim().replace(/<\/?[^>]+(>|$)/g, '')

    const spanName = document.querySelector('.span-name') as HTMLSpanElement
    const spanEmail = document.querySelector('.span-email') as HTMLSpanElement
    const spanPhone = document.querySelector('.span-phone') as HTMLSpanElement
    const spanSubject = document.querySelector('.span-subject') as HTMLSpanElement

    if (strippedName === '') {
      spanName.style.color = 'red'
      spanName.innerHTML = 'Por favor, preencha o campo nome.'
    } else {
      spanName.innerText = ''
    }

    if (strippedsubject === '') {
      spanSubject.style.color = 'red'
      spanSubject.innerText = 'Por favor, preencha o campo assunto.'
    } else {
      spanSubject.innerText = ''
    }

    if (strippedEmail === '') {
      spanEmail.style.color = 'red'
      spanEmail.innerText = 'Por favor, preencha o campo email.'
    } else {
      spanEmail.innerText = ''
    }

    if (strippedphoneNumber === '') {
      spanPhone.style.color = 'red'
      spanPhone.innerText = 'Por favor, preencha o campo telefone.'
    } else {
      spanPhone.innerText = ''
    }
  }
}

export default Validator
