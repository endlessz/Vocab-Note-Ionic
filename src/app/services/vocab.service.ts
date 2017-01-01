import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class VocabService {
	http: any
	baseUrl: string

	constructor(http: Http){
		this.http = http
		this.baseUrl = "http://vocabnote.herokuapp.com/api/v1/vocabs"
	}

	getVocabs(){
		const option = this.preparedRequestOptions()

		return this.http.get(this.baseUrl, option)
		      			.map(res => res.json())  
	}

	postVocab(formValue){
		const option = this.preparedRequestOptions()
		let data = JSON.stringify(formValue);

		return this.http.post(this.baseUrl, data, option)
		      			.map(res => res.json())  
	}

	deleteVocab(vocab){
		const option = this.preparedRequestOptions()

		console.log("Vocab " + vocab.id)

		return this.http.delete(this.baseUrl + "/" + vocab.id, option)
						.map(res => res.json())
	}

	private preparedRequestOptions(){
		const headers = new Headers({ 
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		});

		const options = new RequestOptions({ headers: headers });

		return options
	}
}