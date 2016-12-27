import { FormControl } from '@angular/forms';

export class UserValidator {

  static usernameTaken(formControl: FormControl){
    if(formControl.value.toLowerCase() === "abc123"){
      return ({ usernameTaken: true })
    } 
    
    return (null)
  }
}