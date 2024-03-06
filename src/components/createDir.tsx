import React, { useState } from "react";
import { endpoints } from "../api/api";

interface CreateDirProps {
  onFolderCreated: (newFolder: string) => void;
}

export default function CreateDir({ onFolderCreated }: CreateDirProps) {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const createFolder = async () => {
    if (!folderName.trim()) {
      setError("Directory name cannot be empty");
      return;
    }

    try {
      const response = await fetch(endpoints.files.createDir, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `dir=${encodeURIComponent(folderName)}`,
      });

      if (response.ok) {
        console.log("Folder created successfully");
        setFolderName("");
        setError("");
        onFolderCreated(folderName);
      } else {
        console.error("Error loading folder");
        setError("Error creating folder please try again.");
      }
    } catch (error) {
      console.error("Error when making request", error);
      setError("Error when making the request. Please try again.");
    }
  };

  return (
    <div className="container">
      <div>
        <label className="form-label mt-5">Upload Files</label>
        <input className="form-control w-25" type="file" />
      </div>
      <div>
        <label className="form-label mt-4">Create Dir</label>
        <input
          className="form-control w-50"
          value={folderName}
          onChange={handleInputChange}
          placeholder="Directory name"
        />
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={createFolder}
        >
          Create
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
