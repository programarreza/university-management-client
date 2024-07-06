import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data)
  return (
    <div>
      <h2>AcademicSemester Component Coming Soon</h2>
    </div>
  );
};

export default AcademicSemester;
