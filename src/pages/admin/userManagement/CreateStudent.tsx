const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Fayjul",
      middleName: "Islam",
      lastName: "rayhan",
    },
    gender: "male",
    dateOfBirth: "2000-05-15",
    email: "fayjul@gmail.com",
    contactNo: "03",
    emergencyContactNo: "+0987654321",
    bloodGroup: "O+",
    presentAddress: "123 Main St, Springfield, IL, 62701",
    permanentAddress: "456 Elm St, Springfield, IL, 62702",
    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+1122334455",
      motherName: "Jane Doe",
      motherOccupation: "Teacher",
      motherContactNo: "+2233445566",
    },
    localGuardian: {
      name: "Samuel Green",
      occupation: "Doctor",
      contactNo: "+3344556677",
      address: "789 Maple St, Springfield, IL, 62703",
    },

    admissionSemester: "6659b78c7e177efe5fd49f5f",
    academicDepartment: "665ae696cd76a5e55314bfbf",
  },
};

const CreateStudent = () => {
  return <div>this is create student</div>;
};

export default CreateStudent;
