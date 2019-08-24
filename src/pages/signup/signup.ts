import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPass: ['', [Validators.required]]
      }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {

    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }     

  }

  signupUser() {
    
  }
}
