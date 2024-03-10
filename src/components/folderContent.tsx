import { Link } from "react-router-dom";
import backIcon from "../assets/back.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateDir from "./createDir";
import GetFiles from "./getFiles";
import Upload from "./upload";
import Header from "./header";
import FileManipulator from "./fileManipulator";

interface GetFilesProps {
  files: string[];
  onSelectFile: (fileName: string) => void; // Cambiar el nombre de la propiedad a onSelectFile
}

export default function FolderContent() {
  const { folderName } = useParams<{ folderName?: string }>();
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (folderName) {
      document.title = `${folderName} - HomeCloud`;
    }
  }, [folderName]);

  const handleFileUploaded = (fileName: string) => {
    if (!files.includes(fileName)) {
      setFiles((prevFiles) => [...prevFiles, fileName]);
    }
  };

  const handleFileSelected = (fileName: string) => {
    setSelectedFile(fileName);
  };

  return (
    <div className="container ">
      <div className="d-flex align-items-center">
        <Link to="/" className="mr-3">
          <img src={backIcon} alt="BackIcon" />
        </Link>
        {folderName && <Header title={folderName} />}
      </div>
      <hr />
      {folderName && (
        <Upload folderName={folderName} onFileUploaded={handleFileUploaded} />
      )}
      <CreateDir
        onFolderCreated={(newFolder: string): void => {
          console.log("New folder created:", newFolder);
        }}
      />
      <hr />
      {/* Corregir el manejo de la selección de archivos */}
      <GetFiles files={files} onSelectFile={handleFileSelected} />
      <hr />
      {/* Renderizar el FileManipulator solo si hay un archivo seleccionado */}
      {selectedFile && (
        <FileManipulator
          fileName={selectedFile}
          folderName={folderName || ""}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}
