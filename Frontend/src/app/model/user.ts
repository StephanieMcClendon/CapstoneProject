import {Goal} from "../goal";

export class User
{
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    email!: string;
    phoneNumber!: string;
    role!: string;
    goals!: Goal[];
}
