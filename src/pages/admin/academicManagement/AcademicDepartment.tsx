import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types";

type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty"> & {
  key: string;
};

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentQuery(undefined);

  const tableData: TTableData[] =
    departmentData?.data?.map(({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Department",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      render: (_, record) => record.academicFaculty?.name || "N/A",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
