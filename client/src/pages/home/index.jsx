import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  // fetch blogs
  const fetchListOfBlogs = async () => {
    setPending(true);
    const response = await axios.get(
      "https://mern-blog-app-ten.vercel.app/api/blogs"
    );
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };

  // delete blog
  const handleDeleteBlog = async (getCurrentId) => {
    console.log(getCurrentId);
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if (result.message) {
      fetchListOfBlogs();
    }
  };

  // edit blog
  const handleEdit = (getCurrentBlog) => {
    // console.log(getCurrentBlog);
    navigate("/add-blog", { state: { getCurrentBlog } });
  };

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center font-bold">Blog List</h1>
        {pending ? (
          <h1>Loading Blogs</h1>
        ) : (
          <div className="">
            {blogList.length ? (
              blogList.map((blogItem) => (
                <div key={blogItem._id} className="border-2 m-5 p-2">
                  <p className="text-blue-500 text-xl text-center">
                    {blogItem.title}
                  </p>
                  <p className="p-2 ">{blogItem.description}</p>
                  <FaEdit
                    className="inline"
                    onClick={() => handleEdit(blogItem)}
                    size={30}
                  />
                  <FaTrash
                    className=" inline"
                    onClick={() => handleDeleteBlog(blogItem._id)}
                    size={30}
                  />
                </div>
              ))
            ) : (
              <h3> No blogs Listed</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
