import { Component,Injectable } from "@angular/core";
import {Employees} from "../models/employee.model";
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/catch';
import { debounceTime, delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable()

export class EmployeeService {

	// private listEmployees : Employees[];
	private baseUrl = 'http://127.0.0.1:3000/employees';

	constructor(private _httpClient: HttpClient) {}

	getEmployees(): Observable<Employees[]>{
		// return of(this.listEmployees).pipe(delay(100)) ;
		return this._httpClient.get<Employees[]>(`${this.baseUrl}`)
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
	
	
	getEmployee(id: number): Observable<Employees> {
	
		return this._httpClient.get<Employees>(`${this.baseUrl}/${id}`)
		.pipe(catchError(this.handleError));

		// return this.listEmployees.find(e => e.id === id);
	}

	addEmployee( employee: Employees ) : Observable<Employees> {

		return this._httpClient.post<Employees>(this.baseUrl,employee,{
				headers : new HttpHeaders({
					'Content-Type' : 'application/json'
				})
			})
			.pipe(catchError(this.handleError));


		// if (employee.id == null) {
		// 	// const maxId = this.listEmployees.reduce(function(e1, e2){
		// 	// 	return (e1.id > e2.id) ? e1 : e2;
		// 	// }).id;
		// 	// this.listEmployees.push(employee);
		// 	// employee.id = maxId + 1;

		// 	return this._httpClient.post<Employees>('http://127.0.0.1:3000/employees',employee,{
		// 		headers : new HttpHeaders({
		// 			'Content-Type' : 'application/json'
		// 		})
		// 	}).pipe(catchError(this.handleError));
		// } else {
		// 	const foundIndex = this.listEmployees.findIndex(e=>e.id === employee.id);
		// 	this.listEmployees[foundIndex] = employee;
		// }
	}


	updateEmployee( employee: Employees ) : Observable<void> {
		return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
			headers : new HttpHeaders({
				'Content-Type' : 'application/json'
			})
		}).pipe(catchError(this.handleError));
	}

	deleteEmployee(id: number): Observable<void> {
		// const i  = this.listEmployees.findIndex(e => e.id === id);
		// if ( i !== -1 ) {
		// 	this.listEmployees.splice(i,1);
		// }

		return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
		.pipe(catchError(this.handleError));
	}	

}