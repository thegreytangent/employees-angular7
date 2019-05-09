export class Employees {
    id: number;
    name: string;
    gender: string;
    email?:string;
    phone:string;
    contactPerson: string;
    contactPreference: string;
    dateOfBirth: Date;
    department:number;
    isActive: boolean;
    photoPath?:string;
    password?:string;
    confirmPassword?:string;
}