import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl inline">MERN Blog App</h1>
        <ul className="space-x-4">
          <Link to={"/"} className="text-2xl">
            Home
          </Link>
          <Link to={"/add-blog"} className="text-2xl">
            Add Blog
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Header;
