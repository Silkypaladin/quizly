import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  input() {
    return this.registerForm.controls;
  }

  length() {
    let obj = this.registerForm.controls['password'].errors.minlength;
    if (obj === undefined) {
      return false
    }
    return obj['requiredLength'] > obj['actualLength']
  }

  passwordsNotMatching() {
    let pass = this.registerForm.controls['password'].value;
    let passRepeat = this.registerForm.controls['passwordRepeat'].value;
    return pass !== passRepeat
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }

  this.loading = true;

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}
