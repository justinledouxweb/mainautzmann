import { CarouselController } from "./carousel.controller";
import template from './carousel.html';

export class CarouselComponent implements ng.IComponentOptions {
    public template: string = template;
    public controller: any = CarouselController;
    public bindings: any = {
        next: '@',
        previous: '@',
    };
};
