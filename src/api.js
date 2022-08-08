const URL = "http://localhost:8080";

export const sendFileAPI = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  const data = await fetch(URL + "/upload", { method: "POST", body: formData });
  return data.json();
};

export const getLines = async (fileName) => {
  const data = await fetch(URL + "/load", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName: fileName }),
  });
  return data.json();
};
