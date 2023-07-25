import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-scheduling',
  templateUrl: './create-new-scheduling.component.html',
  styleUrls: ['./create-new-scheduling.component.css']
})
export class CreateNewSchedulingComponent {

  constructor(private formBuilder: FormBuilder, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: { message: string }, public dialogRef: MatDialogRef<CreateNewSchedulingComponent>) { }
  schedulingForm = this.formBuilder.group({
    title: '',
    time: '',
    pickerstartdate: '',
    pickerenddate: ''
  },
    { validator: this.checkDates });


  checkDates(group: FormGroup) {
    if (group.controls['pickerenddate'].value < group.controls['pickerstartdate'].value) {
      return { notValid: true }
    }
    return null;
  }

  save() {
    this.dialogRef.close({
      form: this.schedulingForm.value,
    });
  }
}