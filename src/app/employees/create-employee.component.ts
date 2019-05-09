import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/deparment.model';
import { Employees } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeService } from './employee.service';

@Component({
  // selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass']
})

export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  gender = 'female';
  isActive = true;
  previewImg = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  panel_title : string;

  employee: Employees;
  
  departments: Department[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Help Desk' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ]


  constructor(private _employeeService: EmployeeService,
     private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2018, 11, 31)
    });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });


  }

  getEmployee(id: number) {
    if (id == 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: '',
        phone: null,
        contactPerson: null,
        contactPreference: null,
        dateOfBirth: null,
        department: -1,
        isActive: null,
        photoPath: null,
        password: null,
        confirmPassword: null
      };
      this.panel_title = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panel_title = 'Update Employee';
      this.employee = Object.assign({},this._employeeService.getEmployee(id));
      
    }
  }

  saveEmployee(): void {
    const newEmployee: Employees = Object.assign({},this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset()
    this._router.navigate(['list']);
  }

  toggleImgPreview() {
    this.previewImg = !this.previewImg;
  }



}
