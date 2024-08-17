import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export interface TStudent {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

//   export interface AdmissionSemester {
// 	_id: string
// 	name: string
// 	year: string
// 	code: string
// 	startMonth: string
// 	endMonth: string
// 	createdAt: string
// 	updatedAt: string
// 	__v: number
//   }

//   export interface AcademicDepartment {
// 	_id: string
// 	name: string
// 	academicFaculty: AcademicFaculty
// 	createdAt: string
// 	updatedAt: string
// 	__v: number
//   }

//   export interface AcademicFaculty {
// 	_id: string
// 	name: string
// 	createdAt: string
// 	updatedAt: string
// 	__v: number
//   }
