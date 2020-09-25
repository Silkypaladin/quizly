import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  input() {
    return this.loginForm.controls;
  }

  length() {
    let obj = this.loginForm.controls['password'].errors.minlength;
    if (obj === undefined) {
      return false
    }
    return obj['requiredLength'] > obj['actualLength']
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }

}
