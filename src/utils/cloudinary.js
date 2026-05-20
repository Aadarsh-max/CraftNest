const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "craftnest");

    formData.append("folder", "craftnest");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvt4q61oh/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    console.log("Cloudinary Response:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default uploadToCloudinary;
