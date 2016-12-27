import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthenService {
	http: any
	baseUrl: string

	constructor(http: Http){
		this.http = http
		this.baseUrl = "http://vocabnote.herokuapp.com/api/v1/"
	}

	signIn(email, password){
		console.log("Sign In " + email);
	}

	signUp(formValue){
		let data = JSON.stringify(formValue);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

		return this.http.post(this.baseUrl + "register", data, options)
		      			.map(res => res.json())  
	}
}