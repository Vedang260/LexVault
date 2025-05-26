import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { faFileAlt, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent {
  caseForm: FormGroup;
  submitted = false;
  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.caseForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.caseForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.caseForm.invalid) {
      return;
    }

    // Here you would typically call your API service
    console.log('Case submitted', this.caseForm.value);
    this.router.navigate(['/cases']);
  }

  onCancel() {
    this.router.navigate(['/cases']);
  }
}