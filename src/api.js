const URL = "http://localhost:8080";

export const getFiles = async () => {
  const data = await fetch(URL + "/getfiles", { method: "POST" });
  return data.json();
};

export const sendFileAPI = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  const data = await fetch(URL + "/upload", { method: "POST", body: formData });
  return data.json();
};
