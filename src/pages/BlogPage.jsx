import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BlogLayer from "../components/BlogLayer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllBlogs } from "../redux/slice/blogSlice";
import { useEffect } from "react";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.user);

  useEffect(() => {
    if (allBlogs == null) {
      dispatch(getAllBlogs());
    }
  }, [allBlogs]);
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blog" />

        {/* BlogLayer */}
        <BlogLayer />
      </MasterLayout>
    </>
  );
};

export default BlogPage;
