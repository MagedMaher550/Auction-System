import { Component, Input} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class CustomInputComponent {
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() marginBottom: number = 2;
  @Input() isInline: boolean = false;
  @Input() formControl: AbstractControl | null = null;

}
