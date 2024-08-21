import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TCourse } from "../../../types";

type TTableData = Pick<TCourse, "title" | "preFix" | "code">;

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, preFix, code }) => ({
    key: _id,
    title,
    preFix: `${preFix} ${code}`,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Prefix",
      dataIndex: "preFix",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal item={item} />;
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const AddFacultyModal = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties, { isLoading }] = useAddFacultiesMutation();
  console.log(facultiesData?.data);

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = async (data: any) => {
    const facultyData = {
      courseId: item.key,
      data,
    };

    try {
      const res = await addFaculties(facultyData).unwrap();
      toast.success(res.message || "Faculties added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "An error occurred while adding faculties"
      );
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Assign Faculties"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
