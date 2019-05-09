import { PipeTransform, Pipe } from '@angular/core';
import { Employees } from '../models/employee.model';

@Pipe({
    name: 'employeeFilter',
    pure: false
})

export class EmployeeFilterPipe implements PipeTransform {
    private counter = 0;
    transform(employees: Employees[], searchTerm: string): Employees[] {
        this.counter++
        console.log("This counter is count to "+this.counter);
        if (!employees || !searchTerm) {
            return employees;
        }
        return employees.filter(employee =>
            employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
       
    }

}