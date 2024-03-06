import { useState } from "react";
import CreateDir from "./createDir";
import GetFolders from "../components/getFolders";

export default function Home() {
  const [folders, setFolders] = useState<string[]>([]);

  const handleFolderCreated = (newFolder: string) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  return (
    <div className="container-lg">
      <CreateDir onFolderCreated={handleFolderCreated} />
      <hr />
      <GetFolders folders={folders} />
      <hr />
    </div>
  );
}
