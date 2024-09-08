import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const YearList = () => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch('/years.json')
      .then(response => response.json())
      .then(data => setYears(data.years));
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Years</h1>
        <ul className="flex flex-col items-center gap-4">
          {years.map((year) => (
            <li key={year.year} className="relative">
              <Link href={`/department?year=${year.year}`}>
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
