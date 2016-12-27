import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class VocabService {
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

	getVocabs(){
		return this.http.get(this.baseUrl + "vocabs", this.options)
		      			.map(res => res.json())  
	}
}