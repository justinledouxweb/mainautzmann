import * as angular from 'angular';
import { ContactFormComponent } from './contact-form.component';

export const contactFormModule: string = angular.module('contact-form', [])
    .component('contactForm', new ContactFormComponent())
    .name;