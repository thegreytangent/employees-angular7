import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';
import { Employees } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.sass']
})

export class EmployeeDetailsComponent implements OnInit {
  employee : Employees;
  private _id : number;
  constructor(private _router : Router, private _route: ActivatedRoute,private _employeeService : EmployeeService) { }

  ngOnInit() {
      this._route.paramMap.subscribe( params => {
      this._id = +params.get('id');
     this._employeeService.getEmployee(this._id).subscribe(
      (employee) => this.employee = employee,
      (err : any) => console.log(err) 
       );
    });
    
  }

  viewNextEmployee() {
    if (this._id < 2 ) {
      this._id = this._id + 1;  
    } else {
      this._id = 1;
    }
    
    this._router.navigate(['/employees',this._id],{
      queryParamsHandling: 'preserve'
    });
  }

}
