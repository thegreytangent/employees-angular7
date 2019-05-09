import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employees } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Observable, observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResolveEmployeeList } from './resolved-employeelist.model';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class EmployeeListResolverService implements Resolve< Employees[] | string > {
    constructor(private _employeeService : EmployeeService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees[] | string> {
        return this._employeeService.getEmployees()
        .pipe(
            catchError((err: string) => of(err))
        );
    }
}