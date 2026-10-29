
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MilestoneService, Milestone } from './services/milestone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private milestoneService = inject(MilestoneService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  milestones: Milestone[] = [];
  confirmation = '';
  errorMessage = '';
  submitting = false;

  milestoneForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    status: ['In Progress', Validators.required]
  });

  ngOnInit(): void {
    this.milestoneService.getMilestones().subscribe({
      next: (data) => {
        this.milestones = data;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to retrieve milestones.';
        this.cdr.markForCheck();
      }
    });
  }

  submitMilestone(): void {
    if (this.milestoneForm.invalid || this.submitting) {
      return;
    }

    this.confirmation = '';
    this.errorMessage = '';
    this.submitting = true;
    this.cdr.markForCheck();

    this.milestoneService.addMilestone(
      this.milestoneForm.getRawValue()
    ).subscribe({
      next: (response) => {
        this.confirmation = response.message;
        this.submitting = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Submission failed.';
        this.submitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}
