import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employees } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})

export class DisplayEmployeeComponent implements OnInit {


  private selectedEmployeeId: number;
  @Input() employee: Employees;
  @Output() notify: EventEmitter<Employees> = new EventEmitter<Employees>();
  @Input() searchTerm: string; 
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  isHidden = false;



  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  handleClick() { 
    this.notify.emit(this.employee);
    // console.log(this.employee.name);
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    }
    );
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      ()=>console.log(`Employee with Id= ${this.employee.id} deleted`)
    );
    this.notifyDelete.emit(this.employee.id);
  }




  // private _employeeId : number;
  // private _employee : Employees;


  // @Input()
  // set employeeId(val: number) {
  //   this._employeeId = val;
  // }

  // get employeeId(): number {
  //   return this._employeeId;
  // }


  // @Input()
  // set employee(val: Employees) {
  //   this._employee = val;
  // }

  // get employee(): Employees {
  //   return this._employee;
  // }

}
