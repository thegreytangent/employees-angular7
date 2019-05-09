import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employees } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EmployeeListResolverService implements Resolve< Employees[] > {
    constructor(private _employeeService : EmployeeService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees[]> {
        return this._employeeService.getEmployees()
    }
}