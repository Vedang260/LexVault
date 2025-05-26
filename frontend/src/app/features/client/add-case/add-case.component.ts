import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { faFileAlt, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CaseService } from '../../../core/services/case.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private caseService: CaseService) {
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

    const formValue = this.caseForm.value;

    this.caseService.createCase(formValue).subscribe({
      next: (response) => {
          console.log('Case submitted successfully:', response);
         // ✅ Reset the form on success
         this.caseForm.reset();

        // ✅ Optionally reset the `submitted` flag
        this.submitted = false;

        // ✅ Navigate to another route
        this.router.navigate(['/cases']);
      },
      error: (error) => {
        console.error('Error submitting case:', error);
        // Optionally show error message to user
      }
    });
  }

  onCancel() {
    this.router.navigate(['/cases']);
  }
}