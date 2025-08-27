import mongoose from "mongoose";

export enum Role {
  superAdmin = "superAdmin",
  managment = "management",
  staff = "STAFF",
  student = "STUDENT",
}

export const onlySuperAdmin = Role.superAdmin;
export const onlyManagment = Role.student;
export const onlyStudent = Role.student;
export const onlyStaff = Role.staff;

export interface IPayload {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}
