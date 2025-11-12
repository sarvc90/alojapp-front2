  import { Component, Input } from '@angular/core';
  import { FormControl, ReactiveFormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'ad-input',
    template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ label }}</mat-label>
      <input matInput [type]="type" [formControl]="control!" [placeholder]="placeholder">
      @if (control!.invalid && control!.touched) {
        <mat-error>{{ errorText }}</mat-error>
      }
    </mat-form-field>
    `,
    styleUrls: [],
    standalone: false
  })
  export class AdInputComponent {
    @Input() label = '';
    @Input() type: 'text' | 'email' | 'password' = 'text';
    @Input() placeholder = '';
    @Input() errorText = 'Campo inválido';
    /** ¡no opcional! para que [formControl] no reciba undefined */
    @Input({ required: true }) control!: FormControl<any>;
  }
