const uploadToCloudinary =
  async (file) => {
    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      "craftnest"
    );

    formData.append(
      "cloud_name",
      "de7zmwode"
    );

    const response =
      await fetch(
        "https://api.cloudinary.com/v1_1/de7zmwode/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    return data.secure_url;
  };

export default uploadToCloudinary;