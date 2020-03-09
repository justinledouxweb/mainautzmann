import { ContactFormController } from './contact-form.controller';
import template from './contact-form.html';

export class ContactFormComponent implements ng.IComponentOptions {
    public template: string = template;
    public controller: any = ContactFormController;
    public bindings: any = {
        language: '<',
    };
}