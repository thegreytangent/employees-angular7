import { EmployeeService } from './employee.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class EmployeeDetailGuardService implements CanActivate{
    constructor(private _employeeService: EmployeeService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):any {
        const employeeExists = !!this._employeeService.getEmployee(+route.paramMap.get('id'));
        console.log(employeeExists);
        if (employeeExists) {
            return true;
        }else {
             this._router.navigate(['pageNotFound']);
            return false;
        }
    }
}