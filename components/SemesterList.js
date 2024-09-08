import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SemesterList = () => {
  const [semesters, setSemesters] = useState([]);
  const router = useRouter();
  const { path } = router.query;
  
  useEffect(() => {
    if (path) {
      // Split the path to extract year and department
      const pathParts = path.split('/').filter(Boolean); // filter(Boolean) removes empty strings
      if (pathParts.length >= 3) {
        const year = pathParts[0];
        const department = pathParts[1];
        
        fetch(`/${year}/${department}/semesters.json`) // Adjust the path based on your directory structure
          .then(response => response.json())
          .then(data => {
            console.log('Fetched semesters:', data.semesters);
            setSemesters(data.semesters);
          })
          .catch(error => console.error('Error fetching semesters:', error));
      } else {
        console.log('Invalid path format:', path);
      }
    } else {
      console.log('Path is undefined');
    }
  }, [path]);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Semesters</h1>
        <ul className="flex flex-col items-center gap-4">
          {semesters.map((semester) => (
            <li key={semester.semester} className="relative">
              <Link href={`/subject?path=${semester.subjects}`}>
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
