import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Addblog = () => {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveBlogToDatabase = async () => {
    setIsEdit(false);
    const response = isEdit
      ? await axios.put(
          `https://mern-blog-app-api-ashy.vercel.app/api/blogs/update/${location.state.getCurrentBlog._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post(
          "https://mern-blog-app-api-ashy.vercel.app/api/blogs/add",
          {
            title: formData.title,
            description: formData.description,
          }
        );
    const result = await response.data;
    console.log(result);

    result ??
      setFormData({
        title: "",
        description: "",
      });
    navigate("/");
    setIsEdit(false);
  };

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlog } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlog.title,
        description: getCurrentBlog.description,
      });
    }
  }, [location]);
  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-2">
        {isEdit ? "Edit a Blog" : "Add Blog"}
      </h1>
      <input
        className="px-2 w-1/2 block border-[#2989ff] border-2 mb-2"
        name="title"
        placeholder="Enter title"
        id="title"
        type="text"
        required
        value={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
      />
      <textarea
        className=" px-2 w-full h-[50vh] border-[#2989ff] border-2"
        autoCapitalize="on"
        name="description"
        placeholder="Enter description"
        id="description"
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
        required
      />
      <button
        className=" bg-[#0011ff] p-2 rounded text-white"
        onClick={handleSaveBlogToDatabase}
      >
        Save
      </button>
    </>
  );
};

export default Addblog;
