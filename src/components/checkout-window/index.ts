import './style.scss'
import ComponentTemplate from '../component-template';
import Elem from '../elem';
import { PagePaths } from '../../app';

const enum Error {
    wrongName = 'Enter your first and last name, each must contain at least 3 characters',
    wrongAddress = 'The number of words must be at least three, each must contain at least 5 characters',
    wrongPhone = 'Phone number must start with + and contain at least 9 characters',
    wrongEmail = 'Email must contain the @ symbol',
    wrongCardNumber = 'The card number must have exactly 16 digits',
    wrongCardCode = 'The code must have exactly 3 digits',
    wrongMonth = 'The month must be equal to or less than 12',
    wrongLengthDate = 'Valid thru must contain 4 digits'
}

class CheckoutWindow extends ComponentTemplate{
    private inputName: HTMLInputElement;
    private inputPhone: HTMLInputElement;
    private inputAddress: HTMLInputElement;
    private inputEmail: HTMLInputElement;
    private inputCardNumber: HTMLInputElement;
    private inputCardValid: HTMLInputElement;
    private inputCardCode: HTMLInputElement;

    constructor() {
        super('div', 'checkout-window');
        this.inputName = this.createInput('form__input form__input_name', 'text', 'FirstName LastName', 'name');
        this.inputPhone = this.createInput('form__input form__input_phone', 'tel', 'Phone number', 'tel');
        this.inputAddress = this.createInput('form__input form__input_address', 'text', 'Delivery address', 'address');
        this.inputEmail = this.createInput('form__input form__input_email', 'email', 'E-mail', 'email');
        this.inputCardNumber = this.createInput('form__input form__input_card-num', 'number', 'Card number', 'card-number');
        this.inputCardValid = this.createInput('form__input', 'text', '00/00', 'valid');
        this.inputCardCode = this.createInput('form__input', 'number', '000', 'code');
    }

    private createForm(): HTMLElement {
        const form = <HTMLFormElement>new Elem('form', 'checkout-window__form form').elem;
        form.append(this.createPersonalDetails());
        form.append(this.createCreditCardDetails());
        form.append(this.createConfirmBtn());
        form.noValidate = true;
        return form;
    }

    private createInput(className: string, type: string, placeholder: string, name: string): HTMLInputElement {
        const input = <HTMLInputElement>new Elem('input', className).elem;
        input.placeholder = placeholder;
        input.type = type;
        input.name = name;

        return input;
    }

    private createPersonalDetails(): HTMLElement {
        const personalDetails = new Elem('fieldset', 'form__personal').elem;
        const legend = new Elem('legend', 'form__legend').elem;
        legend.textContent = 'Personal details';
        this.inputPhone.pattern = '\\+[0-9]{9,30}';

        personalDetails.append(legend)
        personalDetails.append(this.inputName);
        personalDetails.append(this.inputPhone);
        personalDetails.append(this.inputAddress);
        personalDetails.append(this.inputEmail);
        return personalDetails;
    }
    
    private createCreditCardDetails(): HTMLElement {
        const creditCardDetail = new Elem('fieldset', 'form__credit-card').elem;
        const legend = new Elem('legend', 'form__legend').elem;
        legend.textContent = 'Credit cart details';
        const creditCardWrap = new Elem('div', 'form__credit-card-wrap').elem;
        const cardNumberWrap = new Elem('div', 'form__card-number-wrap').elem;
        const imgPayment = <HTMLImageElement>new Elem('img', 'form__img-payment').elem;

        const cardInfoWrap = new Elem('div', 'form__card-info-wrap').elem;
        const cardValid = new Elem('div', 'form__card-info').elem;
        const cardCode = new Elem('div', 'form__card-info').elem;

        const cardValidLabel = <HTMLLabelElement>new Elem('label', '').elem;
        cardValidLabel.textContent = 'Valid THRU: ';
        cardValidLabel.htmlFor = 'valid';
        this.inputCardValid.id = 'valid';

        const cardCodeLabel = <HTMLLabelElement>new Elem('label', '').elem;
        cardCodeLabel.textContent = 'Security code: ';
        cardCodeLabel.htmlFor = 'code';
        this.inputCardCode.id = 'code';

        cardNumberWrap.append(this.inputCardNumber);
        cardNumberWrap.append(imgPayment);
        creditCardWrap.append(cardNumberWrap);
        cardInfoWrap.append((cardValid));
        cardValid.append(cardValidLabel);
        cardValid.append(this.inputCardValid);
        cardCode.append(cardCodeLabel);
        cardCode.append(this.inputCardCode);
        cardInfoWrap.append((cardCode));
        creditCardDetail.append(legend);
        creditCardDetail.append(creditCardWrap)
        creditCardWrap.append(cardInfoWrap);
        return creditCardDetail;
    }

    private createConfirmBtn(): HTMLElement {
        const btn = new Elem('button', 'form__btn').elem;
        btn.textContent = 'Confirm';
        return btn;
    }

    
    private createOverlay(): HTMLElement {
        const overlay = new Elem('div', 'checkout-window__overlay').elem;
        overlay.addEventListener('click', this.toggleCheckoutWindow.bind(this));
        return overlay;
    }

    public toggleCheckoutWindow() {
        this.container.classList.toggle('active');
    }

    public render(): HTMLElement {
        this.container.append(this.createOverlay());
        this.container.append(this.createForm());
        return this.container;
    }
}

export default CheckoutWindow;