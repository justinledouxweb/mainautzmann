import { NavBarController } from './nav-bar.controller';
import template from './nav-bar.html';

export class NavBarComponent implements ng.IComponentOptions {
    public template: string = template;
    public controller: any = NavBarController;
    public bindings: any = {
        language: '<',
    };
};
