import { useState } from "react";
import axios from "axios";

interface IProps {
  urlString: string;
  fileName: string;
}

const useDownloadFile = () => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async ({ urlString, fileName }: IProps) => {
    try {
      setLoading(true);
      const response = await axios.get(urlString, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      setLoading(false);
    }
  };

  return {
    loading,
    downloadFile,
  };
};

export default useDownloadFile;
