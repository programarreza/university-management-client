import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHForm from "../../../components/form/PHForm";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";

//! This is only for development
//! Should be removed
const adminDefaultValues = {
  //   designation: "Admin",
  name: {
    firstName: "Shafikul ",
    middleName: "Islam",
    lastName: "Reza",
  },
  gender: "male",
  //   dateOfBirth: "1985-05-20T00:00:00.000Z",
  bloodGroup: "B+",

  email: "programarreza@gmail.com",
  contactNo: "+0125454564",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 Main St, Anytown, AT 12345",
  permanentAddress: "456 Elm St, Othertown, OT 54321",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();

  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);

    addAdmin(formData);

    // This is for development just for checking
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.middleName"
                label=" Middle Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No." />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
