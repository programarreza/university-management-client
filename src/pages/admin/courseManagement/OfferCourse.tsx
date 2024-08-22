import { Button, Col, Row } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const [addOfferedCourse ] = useAddOfferedCourseMutation();
 

  const { data: registeredSemestersData } =
    useGetAllRegisteredSemestersQuery(undefined);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const { data: academicDepartmentsData } =
    useGetAcademicDepartmentQuery(undefined);
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);

  const registeredSemesterOptions = registeredSemestersData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.status,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentsData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const coursesOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title} (${item.code})`,
  }));

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const dayOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    console.log(data);
    
    const offeredCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
    };

    console.log(offeredCourseData);

    try {
      const res = await addOfferedCourse(offeredCourseData).unwrap();
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }


  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Semester Registration"
                name="semesterRegistration"
                options={registeredSemesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelectWithWatch
                onValueChange={setId}
                label="Academic Faculty"
                name="academicFaculty"
                options={academicFacultyOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Course" name="course" options={coursesOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Faculty"
                name="faculty"
                options={facultiesOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                disabled={!id}
                type="number"
                name="section"
                label="Section"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="number" name="maxCapacity" label="Max Capacity" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                mode="multiple"
                label="Days"
                name="days"
                options={dayOptions}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="time"
                name="startTime"
                label="Start Time"
                placeholder="HH:mm"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="time"
                name="endTime"
                label="End Time"
                placeholder="HH:mm"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default OfferCourse;
