export const uploadJson = async <T extends object>(file: File): Promise<T> => {
  const abUploaded = await uploadFile(file);
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(abUploaded));
};

export const uploadImage = async (file: File) => {
  const abUploaded = await uploadFile(file);
  return btoa(String.fromCharCode(...new Uint8Array(abUploaded)));
};

function uploadFile(file: File): Promise<ArrayBuffer> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) {
        rej("Error loading file");
        return;
      }
      res(event.target.result as ArrayBuffer);
    };
    reader.onerror = (event) => {
      rej(event.target?.error);
    };
    reader.readAsArrayBuffer(file);
  });
}
