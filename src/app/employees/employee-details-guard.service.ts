import { EmployeeService } from './employee.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()

export class EmployeeDetailGuardService implements CanActivate{
    constructor(private _employeeService: EmployeeService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable <boolean> {
        return this._employeeService.getEmployee(+route.paramMap.get('id')).pipe(
            map(employee => {
                const employeeExists = !!employee;
                if (employeeExists) {
                    return true;
                }else {
                     this._router.navigate(['pageNotFound']);
                    return false;
                }
            }),
            catchError((error) => {
                console.log(error);
                return of(false);
            })
        );
      
        
    }
}