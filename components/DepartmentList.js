import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const router = useRouter();
  const { year } = router.query;

  useEffect(() => {
    if (year) {
      fetch(`/${year}/departments.json`) // Adjust the path based on your directory structure
        .then(response => response.json())
        .then(data => setDepartments(data.departments))
        .catch(error => console.error('Error fetching departments:', error));
    }
  }, [year]);
  return (
    <div className=" justify-center min-h-screen bg-black-800 text-white">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Departments for Year {year}</h1>
        <ul className="flex flex-col items-center gap-4">
          {departments.map((department) => (
            <li key={department.department} className="relative">
              <Link href={`/semesters?path=${department.semester}`}>
                <span className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md">
                  {department.department}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default DepartmentList;
