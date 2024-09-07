import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Semester {
  semester: string;
  subjects: string; // Adjust this type if subjects should be more structured
}

const SemesterList: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const router = useRouter();
  const { department, year } = router.query;

  useEffect(() => {
    if (department && year && typeof department === 'string' && typeof year === 'string') {
      fetch(`/${year}/${department}/semesters.json`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched semesters:', data.semesters);
          setSemesters(data.semesters);
        })
        .catch(error => console.error('Error fetching semesters:', error));
    } else {
      console.error('Department or Year is undefined or not a string');
    }
  }, [department, year]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Semesters for {year} - {department}</h1>
        <ul className="flex flex-col items-center gap-4">
          {semesters.map((semester) => (
            <li key={semester.semester} className="relative">
              <Link href={`/subjects?department=${department}&year=${year}&semester=${semester.semester}`}>
                <span className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer">
                  {semester.semester}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SemesterList;
