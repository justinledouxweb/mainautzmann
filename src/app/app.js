import angular from 'angular';
import 'angular-sanitize';
import 'angular-messages';
import navBarDirective from './nav-bar.directive.js';
import contacFormDirective from './contact-form.directive.js';
import carouselDirective from './carousel.directive.js';

import '../styles/main.scss';
import '../images/album.jpg';
import '../images/hero.jpg';
import '../images/maina-1.jpg';
import '../images/maina-2.jpg';
import '../images/maina-3.jpg';
import '../images/maina-4.jpg';
import '../images/maina-5.jpg';
import '../images/maina-6.jpg';
import '../images/pattern.svg';
import '../images/sprite.png';
import '../images/sprite.svg';
import '../images/sprite@2x.png';
import '../images/sprite1.png';

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
