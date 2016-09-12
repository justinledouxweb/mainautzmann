import controller from './contact-form.controller.js';

function contactFormDirective() {
  return {
    restrict: 'A',
    scope: true,
    controller,
    controllerAs: '$ctrl',
  };
}

contactFormDirective.$inject = [];

export default contactFormDirective;
