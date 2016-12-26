import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthenService {
	http: any
	baseUrl: string
	data: any

	constructor(http: Http){
		this.http = http
		this.baseUrl = "http://vocabnote.herokuapp.com/api/v1/"
		this.data = {}

	}

	signIn(email, password){
		console.log("Sign In " + email);
	}

	signUp(email, password){
		console.log("Sign Up! " + email + " " + password)
		var data = JSON.stringify({email: email, password: password});

		this.http.post(this.baseUrl + "register", data)  
				 .subscribe(data => {
		         	this.data.response = data._body;
		         }, error => {
		            console.log("Error!");
		         });
	}
}