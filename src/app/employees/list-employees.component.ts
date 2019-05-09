import { Component, OnInit } from '@angular/core';
import { Employees } from '../models/employee.model';
// import { EmployeeService } from '../employees/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { query } from '@angular/core/src/render3';
import { ResolveEmployeeList } from './resolved-employeelist.model';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  public employees: Employees[];
  public employeeToDisplay: Employees;
  // private arrayIndex = 1;
  public dataFromChild : Employees;
  error: string;

   filteredEmployees : Employees[];

  private _searchTerm : string;

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
     this._searchTerm = value;
     this.filteredEmployees = this.filteredEmployee(value);
  }

  filteredEmployee(searchString : string) {
    return this.employees.filter(employee => 
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 );
  }
  

  constructor(
    private _route: ActivatedRoute, 
    // private employeeService: EmployeeService,
    private _router:Router) { 
      // this.employees = this._route.snapshot.data['employeeList'];
      const resolvedData : Employees[] | string = this._route.snapshot.data['employeeList'];
      if (Array.isArray(resolvedData)) {
        this.employees = resolvedData;
      } else {
        this.error = resolvedData;
        
      }

      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      } else {
        this.filteredEmployees = this.employees;
      }
    }

  ngOnInit() {

    // this.employees = this.employeeService.getEmployees();
    // this.employeeService.getEmployees().subscribe( (empList) => {
    //   this.employees = empList  
    //   if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   } else {
    //     this.filteredEmployees = this.employees;
    //   }
  // });

    
 
    // this.employeeToDisplay = this.employees[0];
  }

  handleNotify(eventData: Employees) {
    this.dataFromChild = eventData;
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex( e => e.id === id);
    if ( i !== -1 ) {
      this.filteredEmployees.splice(i,1);
    }
  }

  // onClick( employeeId: number ) {
  //   this._router.navigate(['/employees',employeeId],{
  //     queryParams:{'searchTerm': this.searchTerm,'testParam':'testValue'}
  //   }
  //   );
  // }

  // changeEmployeeName() {
  //   this.employees[0].name = "Testingz";
    
  //   // const newEmployeArray: Employees[] = Object.assign([],this.employees);
  //   // newEmployeArray[0].name = "Testing";
  //   // this.employees = newEmployeArray;
  // }




  // nextEmployee(): void {
  //   if (this.arrayIndex <= 2) {
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   } else {
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  //   console.log(this.arrayIndex);

  // }





}
