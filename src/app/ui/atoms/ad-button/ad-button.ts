import { Component, Input } from '@angular/core';

@Component({
  selector: 'ad-button',
  template: `<button mat-raised-button color="primary" [disabled]="disabled">
               <ng-content></ng-content>
             </button>`,
  standalone: false
})
export class AdButtonComponent {
  @Input() disabled = false;
}
