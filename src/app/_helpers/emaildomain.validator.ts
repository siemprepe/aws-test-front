import { AbstractControl } from '@angular/forms';

export function ValidateEmailDomain(control: AbstractControl) {
  if (!control.value.includes('@cgi.com')) {
    return { validDomain: true };
  }
  return null;
}
