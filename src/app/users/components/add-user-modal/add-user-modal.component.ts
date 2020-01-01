import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgControlStatus, FormControl } from '@angular/forms';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  // form group of add user form
  addUserForm: FormGroup;

  // used for city ng select component
  cities: any[] = [
    { id: 1, name: 'Cairo' },
    { id: 2, name: 'Alexandria' },
    { id: 3, name: 'London' },
    { id: 4, name: 'Paris' },
  ];


  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private restService: RestService
  ) { }

  ngOnInit() {
    // building our form with reactive forms approach
    this.addUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        suite: ['', [Validators.required]],
        city: [null, [Validators.required]]
      })
    });
  }

   /**
   *  close the modal on clicking close button
   * @return {void}
   * @author Ahmed Abdelnour
   */
  closeModal(): void {
    this.dialogRef.close();
  }

  /**
   * returns error message to be dislayed for required controlsr
   * @param {FormControl} control => control from add user form
   * @param { string } name => name indicating the passed control from html
   * @return {string}
   * @author Ahmed Abdelnour
   */
  getRequiredFeildsErrMsg(control, name) {

    if (control.touched && control.invalid && control.errors.required) {
      return name + ' is required';
    }
  }

  /**
   * returns error message for email and phone controls 
   * @param {FormControl} control => control from add user form
   * @param { string } name => name indicating the passed control from html can be 'email' or 'phone'
   * @return {string}
   * @author Ahmed Abdelnour
   */
  getErrorMsgForEmailOrPhone(control, name) {
    if (control.touched && control.invalid) {
      if (control.errors.required) {
        return name === 'email' ? 'Email is required' : 'Phone is required';
      } else if (control.errors.pattern) {
        return name === 'email' ? 'Please enter valid email like a@a.com' : 'Phone number can contain only numbers';
      }
    }
  }

   /**
   * adds user to DB and closes the modal on clicking save button
   * @return {void}
   * @author Ahmed Abdelnour
   */
  addUserHandler() {
    if (this.addUserForm.valid) {
      let userToBeAdded = {
        ...this.addUserForm.value
      }

      this.restService.addUser(userToBeAdded).subscribe(
        (user) => {
          this.dialogRef.close(user);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }




}
