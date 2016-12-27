import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthenService {
	http: any
	baseUrl: string
	headers: any
	options: any

	constructor(http: Http){
		this.http = http
		this.baseUrl = "http://vocabnote.herokuapp.com/api/v1/"
		this.headers = new Headers({ 'Content-Type': 'application/json' });
		this.options = new RequestOptions({ headers: this.headers });
	}

	signIn(email, password){
		let data = JSON.stringify({email: email, password: password});

		return this.http.post(this.baseUrl + "login", data, this.options)
		      			.map(res => res.json())  
	}

	signUp(formValue){
		let data = JSON.stringify(formValue);


		return this.http.post(this.baseUrl + "register", data, this.options)
		      			.map(res => res.json())  
	}
}