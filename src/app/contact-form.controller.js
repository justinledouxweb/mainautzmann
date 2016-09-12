class ContactFormController {
  constructor($http, $timeout) {
    this.$http = $http;
    this.$timeout = $timeout;

    this.formPostSuccess = false;
    this.formPostError = false;
  }

  displayFlash(error) {
    this.formPostSuccess = !error;
    this.formPostError = error;
  }

  submit(form) {
    if (form.$valid) {
      this.$http({
        url: '/contact',
        method: 'POST',
        data: this.formData,
      })
      .then(() => {
        this.displayFlash(false);
        form.$setSubmitted(false);
        form.$setDirty(false);
        form.$setPristine(true);
        this.formData = {};
      })
      .catch(() => {
        this.displayFlash(true);
      });
    }
  }
}

ContactFormController.$inject = [
  '$http',
  '$timeout',
];

export default ContactFormController;
