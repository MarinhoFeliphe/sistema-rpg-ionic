import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from '../../models/user.dto';
import { UserService } from '../../services/user/user.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  differentPassword: boolean = false;
  registeredEmail: boolean = false;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder
    , public userService: UserService
    , public alertController: AlertController) 
  {
      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPass: ['', [Validators.required]]
      });
  }

  signupUser() 
  {    
    this.verifyPassword(); 
    this.verifyEmail();
  }

  verifyPassword() 
  {
    let group = this.formGroup.value;
    this.differentPassword = group.password === group.confirmPass ? false : true;
  }

  verifyEmail()
  {
    this.userService
        .findByEmail(this.formGroup.value.email)
        .subscribe(response => 
          {
          this.registeredEmail = (response == null) ? false : true;
          
          if(!(this.differentPassword || this.registeredEmail)) {
      
            let newUser: UserDTO = new UserDTO(this.formGroup);
            
            this.userService
                .insert(newUser)
                .subscribe(response => 
                {
                  this.alerta(newUser);                  
                }, error => {});
          }

        }, error => {});
  }

  alerta(newUser: UserDTO)
  {
    const alert = this.alertController.create({
      title: 'Usuário Registrado',
      subTitle: 'Efetue o login',
      buttons: 
      [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('HomePage', { pNewUser : newUser });
        }
      }]
    });

    alert.present();
  }
}
