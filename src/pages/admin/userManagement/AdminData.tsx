import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";

export type TTableData = Pick<TStudent, "fullName" | "id">;

const AdminData = () => {
  const [page, setPage] = useState(1);

  const { data: adminData, isFetching } = useGetAllAdminsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const metaData = adminData?.meta;
  const tableData = adminData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Id No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Update</Button>
            <Button>Delete</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default AdminData;
