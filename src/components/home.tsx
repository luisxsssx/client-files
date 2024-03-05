import { useEffect, useState } from "react";
import { endpoints } from "../api/api";
import folderIcon from "../assets/folder.svg";

export default function Home() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(endpoints.files.getFolders);
        if (response.ok) {
          const data = await response.json();
          setFolders(data);
        } else {
          console.error("Error al obtener los folders");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderClick = (folderName: string) => {
    console.log("Folder clicked:", folderName);
  };

  return (
    <div className="container-lg">
      <div>
        <label className="form-label mt-5">Upload Files</label>
        <input className="form-control w-25" type="file" />
      </div>
      <div>
        <label className="form-label mt-4">Create Dir</label>
        <input className="form-control w-50" />
        <button type="button" className="btn btn-primary mt-2">
          Create
        </button>
      </div>
      <hr />

      <div>
        <h2 className="text-center">Folders</h2>
        {folders.map((folder, index) => (
          <div className="container text-center">
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
