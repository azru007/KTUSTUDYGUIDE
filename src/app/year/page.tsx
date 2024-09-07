import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Year {
  year: string;
  semesters: string;
}

interface YearsResponse {
  years: Year[];
}

const fetchYears = async (): Promise<YearsResponse> => {
  const response = await fetch('/CS/years.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const YearList: React.FC = () => {
  const router = useRouter();
  const { department } = router.query;

  const { data, isError, isLoading } = useQuery<YearsResponse, Error>(
    ['years', department],
    fetchYears,
    {
      enabled: !!department, // Only fetch data if department is available
    }
  );

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Error fetching data</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Select Year for {department}</h1>
        <ul className="flex flex-col items-center gap-4">
          {data?.years.map((year) => (
            <li key={year.year} className="relative">
              <Link href={`/semesters?department=${department}&year=${year.year}`}>
                <span className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer">
                  {year.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YearList;
