import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { path } = router.query;

  // Function to convert the Google Drive link into a direct download link
  const convertToDownloadLink = (googleDriveLink) => {
    const fileIdMatch = googleDriveLink.match(/[-\w]{25,}/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[0];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return googleDriveLink; // Return original link if no match is found (as fallback)
  };

  useEffect(() => {
    console.log("Path from query:", path); // Debugging path

    if (path) {
      const pathParts = path.split("/").filter(Boolean);
      console.log("Path parts:", pathParts); // Debugging path parts

      if (pathParts.length >= 4) {
        const [year, department, semester, subject] = pathParts;
        const fetchURL = `/${year}/${department}/${semester}/${subject}/sections.json`;
        console.log("Fetch URL:", fetchURL);

        fetch(fetchURL)
          .then((response) => {
            console.log("Response status:", response.status); // Debugging response status
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Fetched data:", data); // Debugging fetched data
            setSections(data.sections);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
            setError(error);
            setLoading(false);
          });
      } else {
        console.log("Invalid path format:", path);
        setLoading(false);
      }
    } else {
      console.log("Path is undefined");
      setLoading(false);
    }
  }, [path]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="my-4 text-2xl font-bold">Sections</h1>
        <ul className="flex flex-col items-center gap-4">
          {sections.map((section) => (
            <li key={section.file} className="relative">
              <a
                href={convertToDownloadLink(section.file)} // Use the converted link for direct download
                className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md"
                download // HTML5 download attribute triggers the download
              >
                {section.section}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionList;
