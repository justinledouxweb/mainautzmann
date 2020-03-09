import * as angular from 'angular';

declare var grecaptcha;
declare var onloadCallback;

export class ContactFormController implements ng.IOnChanges {
  public formPostSuccess: boolean;
  public formPostError: boolean;
  public language: any;
  public captcha: any;
  private formData: any;

  constructor(
    private $http: ng.IHttpService,
    private $timeout: ng.ITimeoutService
  ) {
    'ngInject';
  }

  $onChanges(changes: ng.IOnChangesObject) {
    if (changes.language.currentValue !== undefined) {
      this.language = angular.copy(changes.language.currentValue);
    }
  }

  $onInit() {
    grecaptcha.ready(() => {
      this.captcha = grecaptcha.render(
        'captcha',
        {
          sitekey: '6LcowN8UAAAAADDt_cQYPhNtX2ybH5T_9gYf9J55'
        }
      );
    });
  }

  displayFlash(error) {
    this.formPostSuccess = !error;
    this.formPostError = error;
  }

  submit(form) {
    if (form.$valid) {
      this.formData.captcha = grecaptcha.getResponse(this.captcha);;

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
        grecaptcha.reset(this.captcha);
      })
      .catch(() => {
        this.displayFlash(true);
      });
    }
  }
}
