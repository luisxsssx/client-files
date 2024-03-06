import { useEffect, useState } from "react";
import folderIcon from "../assets/folder.svg";
import { endpoints } from "../api/api";

interface GetFoldersProps {
  folders: string[];
}

export default function GetFolders({
  folders: initialFolders,
}: GetFoldersProps) {
  const [folders, setFolders] = useState<string[]>(initialFolders);

  const fetchFolders = async () => {
    try {
      const response = await fetch(endpoints.files.getFolders);
      if (response.ok) {
        const data = await response.json();
        setFolders(data);
      } else {
        console.error("Error getting folders");
      }
    } catch (error) {
      console.error("Error when making request:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [initialFolders]);

  const handleFolderClick = (folderName: string) => {
    console.log("Folder clicked:", folderName);
  };

  return (
    <div className="container-lg">
      <div>
        <h2 className="text-center">Folders</h2>
        {folders.map((folder, index) => (
          <div className="container text-center" key={index}>
            <button
              key={index}
              className="btn btn-primary btn-lg mt-4 w-50 text-start"
              onClick={() => handleFolderClick(folder)}
            >
              <img src={folderIcon} alt="Folder Incon" />
              {folder}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
