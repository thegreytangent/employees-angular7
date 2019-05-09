import { Employees } from '../models/employee.model';

export class ResolveEmployeeList {
    constructor(public employeeList: Employees[],public error: any = null) {}
}