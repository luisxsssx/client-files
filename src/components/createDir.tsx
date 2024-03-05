import React, { useState } from "react";
import { endpoints } from "../api/api";

export default function CreateDir() {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const createFolder = async () => {
    if (!folderName.trim()) {
      setError("El nombre del directorio no puede estar vacío");
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
        console.log("Carpeta creada exitosamente");
        setFolderName("");
        setError("");
      } else {
        console.error("Error al crear la carpeta");
        setError("Error al crear la carpeta. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError(
        "Error al realizar la solicitud. Por favor, inténtalo de nuevo."
      );
    }
  };    

  return (
    <div className="container">
      <input
        type="text"
        value={folderName}
        onChange={handleInputChange}
        placeholder="Nombre del directorio"
      />
      <button onClick={createFolder}>Crear Carpeta</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
