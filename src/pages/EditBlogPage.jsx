import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlogById } from "../redux/slice/blogSlice";
import EditBlogLayer from "../components/EditBlogLayer";

const EditBlogPage = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) {
      dispatch(getBlogById(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blog Details" />

        {/* AddBlogLayer */}
        <EditBlogLayer />
      </MasterLayout>
    </>
  );
};

export default EditBlogPage;
