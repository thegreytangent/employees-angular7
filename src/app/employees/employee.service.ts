import { Component,Injectable } from "@angular/core";
import {Employees} from "../models/employee.model";
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/catch';
import { debounceTime, delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()

export class EmployeeService {

	private listEmployees : Employees[];

	constructor(private _httpClient: HttpClient) {

	}

	getEmployees(): Observable<Employees[]>{
		// return of(this.listEmployees).pipe(delay(100)) ;
		return this._httpClient.get<Employees[]>('http://127.0.0.1:3000/employees')
		.pipe(catchError(this.handleError));
	}

	private handleError(errorResponse: HttpErrorResponse) {
		if (errorResponse.error instanceof ErrorEvent) {
			console.error('Client side Error',errorResponse.error.message);
		} else {
			console.error('Client side Error',errorResponse);
		}

		return throwError('There was a problem with the service.');
	}
	
	
	getEmployee(id:number) {
		return this.listEmployees.find(e => e.id === id);
	}

	save( employee: Employees ) {
		if (employee.id == null) {
			const maxId = this.listEmployees.reduce(function(e1, e2){
				return (e1.id > e2.id) ? e1 : e2;
			}).id;
			this.listEmployees.push(employee);
			employee.id = maxId + 1;
		} else {
			const foundIndex = this.listEmployees.findIndex(e=>e.id === employee.id);
			this.listEmployees[foundIndex] = employee;
		}
	}

	deleteEmployee(id: number) {
		const i  = this.listEmployees.findIndex(e => e.id === id);
		if ( i !== -1 ) {
			this.listEmployees.splice(i,1);
		}
	}	

}