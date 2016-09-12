import angular from 'angular';
import 'angular-sanitize';
import 'angular-messages';
import navBarDirective from './nav-bar.directive.js';
import contacFormDirective from './contact-form.directive.js';
import carouselDirective from './carousel.directive.js';

const modules = [
  'ngSanitize',
  'ngMessages',
];

function bootstrap() {
  angular.bootstrap(document, ['app'], {
    strictDi: true,
  });
}

angular
  .element(document)
  .ready(bootstrap);

export default angular
  .module('app', modules)
  .directive('contactForm', contacFormDirective)
  .directive('navBar', navBarDirective)
  .directive('carousel', carouselDirective);
