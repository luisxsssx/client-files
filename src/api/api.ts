const API_BASE_URL = "http://localhost:8080";

export const endpoints = {
  files: {
    createDir: `${API_BASE_URL}/createDir`,
    upload: (folderPaht: string) =>
      `${API_BASE_URL}/upload?dir=${encodeURIComponent(folderPaht)}/`,
    getFolders: `${API_BASE_URL}/getAllFiles`,
    download: (filePath: string) =>
      `${API_BASE_URL}/download/?file${encodeURIComponent(filePath)}`,
    delete: (deleteFile: string) =>
      `${API_BASE_URL}/deleteDir/${encodeURIComponent(deleteFile)}`,
  },
};
