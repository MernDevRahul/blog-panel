import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlog } from "../redux/slice/blogSlice";

const BlogLayer = () => {
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  
  const getPreviewText = (htmlContent, wordLimit = 10) => {
    // Remove HTML tags
    const plainText = htmlContent.replace(/<[^>]+>/g, "");

    // Split into words
    const words = plainText.trim().split(/\s+/);

    // Take first 10 words
    const limitedWords = words.slice(0, wordLimit).join(" ");

    return limitedWords + (words.length > wordLimit ? "..." : "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;
    try {
      await dispatch(deleteBlog(id)).unwrap();
    } catch (error) {
      toast.error(error?.message || "Delete failed");
    }
  };
  return (
    <div className="row gy-4">
      {allBlogs?.length > 0 &&
        allBlogs.map((blog, ind) => (
          <div key={ind} className="col-xxl-3 col-lg-4 col-sm-6">
            <div className="card h-100 p-0 radius-12 overflow-hidden">
              <div className="card-body p-24">
                <Link
                  to="#"
                  className="w-100 max-h-194-px radius-8 overflow-hidden"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                </Link>

                <div className="mt-20">
                  <div className="d-flex align-items-center gap-6 justify-content-between flex-wrap mb-16">
                    <Link
                      to="#"
                      className="px-20 py-6 bg-neutral-100 rounded-pill bg-hover-neutral-300 text-neutral-600 fw-medium"
                    >
                      {blog.category}
                    </Link>

                    <div className="d-flex align-items-center gap-8 text-neutral-500 fw-medium">
                      <i className="ri-calendar-2-line" />
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <h6 className="mb-16">
                    <Link
                      to="#"
                      className="text-line-2 text-hover-primary-600 text-xl transition-2"
                    >
                      {blog.title}
                    </Link>
                  </h6>

                  <p className="text-line-3 text-neutral-500">
                    {getPreviewText(blog.content, 10)}
                  </p>
                  <div className="d-flex align-items-center gap-10">
                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/edit-blog/${blog.id}`);
                      }}
                      className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                    >
                      <Icon icon="lucide:edit" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      // disabled={isCurrentUser}
                      className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Icon icon="fluent:delete-24-regular" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogLayer;
