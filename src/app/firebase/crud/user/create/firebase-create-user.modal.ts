import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, UntypedFormGroup, UntypedFormControl, UntypedFormArray } from '@angular/forms';
import * as dayjs from 'dayjs';

import { CheckboxCheckedValidator } from '../../../../validators/checkbox-checked.validator';

import { FirebaseUserModel } from '../firebase-user.model';
import { SelectUserImageModalComponent } from '../select-image/select-user-image.modal';
import { FirebaseCrudService } from '../../firebase-crud.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-firebase-create-user',
  templateUrl: './firebase-create-user.modal.html',
  styleUrls: [
    './styles/firebase-create-user.modal.scss',
    './styles/firebase-create-user.shell.scss'
  ],
})
export class FirebaseCreateUserModalComponent implements OnInit {
  // "modalId" is passed in firebase-listing.page.
  // We use it to for the dismiss function
  @Input() modalId: string;

  createUserForm: UntypedFormGroup;
  userData: FirebaseUserModel = new FirebaseUserModel();
  skills = [];
  formattedDate?: string;

  constructor(
    private modalController: ModalController,
    public firebaseCrudService: FirebaseCrudService
  ) { }

  ngOnInit() {
    // default image
    this.userData.avatar = 'https://s3-us-west-2.amazonaws.com/ionicthemes/otros/avatar-placeholder.png';

    this.createUserForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      lastname: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new UntypedFormControl('', Validators.required),
      birthdate: new UntypedFormControl(null, Validators.required),
      skills: new UntypedFormArray([], CheckboxCheckedValidator.minSelectedCheckboxes(1)),
      spanish: new UntypedFormControl(),
      english: new UntypedFormControl(),
      french: new UntypedFormControl()
    });

    this.firebaseCrudService.getSkills().subscribe(skills => {
      this.skills = skills;
      // create skill checkboxes
      this.skills.map(() => {
        (this.createUserForm.controls.skills as UntypedFormArray).push(new UntypedFormControl());
      });
    });
  }

  formatDate() {
    this.formattedDate = format(parseISO(this.createUserForm.value.birthdate), 'MMM d, yyyy');
  }

  get skillsFormArray() { return <UntypedFormArray>this.createUserForm.get('skills'); }

  changeLangValue(value): string {
    switch (true) {
      case (value <= 3 ):
        return 'Novice';
      case (value > 3 && value <= 6 ):
        return 'Competent';
      case (value > 6 ):
        return 'Expert';
    }
  }

  dismissModal() {
   this.modalController.dismiss(undefined, undefined, this.modalId);
  }

  createUser() {
    this.userData.name = this.createUserForm.value.name;
    this.userData.lastname = this.createUserForm.value.lastname;
    this.userData.birthdate = dayjs(this.createUserForm.value.birthdate).unix(); // save it in timestamp
    this.userData.phone = this.createUserForm.value.phone;
    this.userData.email = this.createUserForm.value.email;
    this.userData.languages.spanish = this.createUserForm.value.spanish;
    this.userData.languages.english = this.createUserForm.value.english;
    this.userData.languages.french = this.createUserForm.value.french;

    // get the ids of the selected skills
    const selectedSkills = [];

    this.createUserForm.value.skills
    .map((value: any, index: number) => {
      if (value) {
        selectedSkills.push(this.skills[index].id);
      }
    });
    this.userData.skills = selectedSkills;

    this.firebaseCrudService.createUser(this.userData)
    .then(() => {
      this.dismissModal();
    });
  }

  async changeUserImage() {
    const modal = await this.modalController.create({
      component: SelectUserImageModalComponent,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop()
    });

    modal.onDidDismiss().then(avatar => {
      if (avatar.data != null) {
        this.userData.avatar = avatar.data.link;
      }
    });
    await modal.present();
  }

}
