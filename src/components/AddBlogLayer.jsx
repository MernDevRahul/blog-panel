import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBlog } from "../redux/slice/blogSlice";

const AddBlogLayer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(""); // To store error messages
  const [imageDimensions, setImageDimensions] = useState(""); // To show width x height
  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    tags: [],
    image: null,
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file); // temporary URL

      const img = new Image();
      img.src = objectUrl;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        setImageDimensions(`${width} x ${height}`);

        if (width === 1000 && height === 707) {
          setImagePreview(objectUrl); // set preview
          setImageError("");
          setForm((prev) => ({ ...prev, image: file }));
        } else {
          setImagePreview(null);
          setImageError("Image must be 1000 x 707 pixels");
          setForm((prev) => ({ ...prev, image: null }));
        }

        // Only revoke if image is invalid; valid images need URL to show preview
        if (width !== 1000 || height !== 707) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special case for tags: convert comma-separated string to array
    if (name === "tags") {
      setForm((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      // Default case: update other fields
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("slug", form.slug);
    data.append("category", form.category);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content);
    data.append("tags", JSON.stringify(form.tags));
    data.append("blogImage", form.image);

    try {
      if (!form.image) {
        alert("Please upload a valid image with 1000 x 707 dimensions");
        return;
      }
      dispatch(createBlog(data));
      navigate('/blog')
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm((prev) => ({ ...prev, image: null }));
    setImageError("");
    setImageDimensions("");
  };

  const quillRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [isHighlightReady, setIsHighlightReady] = useState(false);

  useEffect(() => {
    // Load highlight.js configuration and signal when ready
    hljs?.configure({
      languages: [
        "javascript",
        "ruby",
        "python",
        "java",
        "csharp",
        "cpp",
        "go",
        "php",
        "swift",
      ],
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleSave = () => {
    const editorContent = quillRef.current.getEditor().root.innerHTML;
    console.log("Editor content:", editorContent);
  };

  // Quill editor modules with syntax highlighting (only load if highlight.js is ready)
  const modules = isHighlightReady
    ? {
        syntax: {
          highlight: (text) => hljs?.highlightAuto(text).value, // Enable highlight.js in Quill
        },
        toolbar: {
          container: "#toolbar-container", // Custom toolbar container
        },
      }
    : {
        toolbar: {
          container: "#toolbar-container", // Custom toolbar container
        },
      };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card mt-24">
          <div className="card-header border-bottom">
            <h6 className="text-xl mb-0">Add New Blog</h6>
          </div>
          <div className="card-body p-24">
            <form className="d-flex flex-column gap-20" onSubmit={handleSubmit}>
              <div>
                <label
                  className="form-label fw-bold text-neutral-900"
                  htmlFor="title"
                >
                  Blog Title:{" "}
                </label>
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  className="form-control border border-neutral-200 radius-8"
                  id="title"
                  placeholder="Enter Post Title"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="form-label fw-bold text-neutral-900"
                  htmlFor="category"
                >
                  Blog Category:{" "}
                </label>
                <input
                  name="category"
                  type="text"
                  value={form.category}
                  className="form-control border border-neutral-200 radius-8"
                  id="category"
                  placeholder="Enter Blog Category"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="form-label fw-bold text-neutral-900"
                  htmlFor="excerpt"
                >
                  Blog Excerpt:{" "}
                </label>
                <input
                  name="excerpt"
                  type="text"
                  value={form.excerpt}
                  className="form-control border border-neutral-200 radius-8"
                  id="excerpt"
                  placeholder="Enter Blog Category"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="form-label fw-bold text-neutral-900"
                  htmlFor="tags"
                >
                  Blog Tags:{" "}
                </label>
                <input
                  name="tags"
                  type="text"
                  className="form-control border border-neutral-200 radius-8"
                  id="tags"
                  placeholder="Enter Blog tags, Use comma to seperate the tags"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label fw-bold text-neutral-900">
                  Blog Content:{" "}
                </label>
                <div className="border border-neutral-200 radius-8 overflow-hidden">
                  <div className="height-200">
                    {/* Toolbar */}
                    <div id="toolbar-container">
                      <span className="ql-formats">
                        <select className="ql-font"></select>
                        <select className="ql-size"></select>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                        <button className="ql-strike"></button>
                      </span>
                      <span className="ql-formats">
                        <select className="ql-color"></select>
                        <select className="ql-background"></select>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-script" value="sub"></button>
                        <button className="ql-script" value="super"></button>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-header" value="1"></button>
                        <button className="ql-header" value="2"></button>
                        <button className="ql-blockquote"></button>
                        <button className="ql-code-block"></button>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                        <button className="ql-indent" value="-1"></button>
                        <button className="ql-indent" value="+1"></button>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-direction" value="rtl"></button>
                        <select className="ql-align"></select>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-link"></button>
                        <button className="ql-image"></button>
                        <button className="ql-video"></button>
                        <button className="ql-formula"></button>
                      </span>
                      <span className="ql-formats">
                        <button className="ql-clean"></button>
                      </span>
                    </div>

                    {/* Editor */}
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={form.content}
                      onChange={(content) => setForm({ ...form, content })}
                      modules={modules}
                      formats={formats}
                      placeholder="Write your content..."
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label fw-bold text-neutral-900">
                  Upload Thumbnail:{" "}
                </label>
                <div className="upload-image-wrapper">
                  {imagePreview ? (
                    <div
                      className="uploaded-img position-relative w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50"
                      style={{
                        aspectRatio: "1000 / 707",
                        maxWidth: "1000px",
                        margin: "0 auto",
                      }}
                    >
                      <button
                        type="button"
                        className="uploaded-img__remove position-absolute top-0 end-0 z-1 me-8 mt-8 d-flex bg-danger-600 w-40-px h-40-px justify-content-center align-items-center rounded-circle"
                        onClick={handleRemoveImage}
                      >
                        <Icon
                          icon="radix-icons:cross-1"
                          width="25"
                          height="25"
                          color="white"
                        />
                      </button>

                      {imagePreview && (
                        <img
                          className="w-100 h-100 object-fit-cover"
                          src={imagePreview}
                          alt="Uploaded"
                        />
                      )}
                    </div>
                  ) : (
                    <label
                      className="upload-file h-160-px w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1"
                      htmlFor="upload-file"
                    >
                      <Icon
                        icon="solar:camera-outline"
                        className="text-xl"
                        color="white"
                      />
                      <span className="fw-semibold text-secondary-light">
                        Upload
                      </span>
                      <input
                        id="upload-file"
                        type="file"
                        hidden
                        onChange={handleFileChange}
                      />
                    </label>
                  )}

                  {/* Small tag to show dimensions or error */}
                  <p
                    className={`mt-2 text-sm ${imageError ? "text-danger" : "text-neutral-600"}`}
                  >
                    {imageError
                      ? imageError
                      : imageDimensions
                        ? `Image dimensions: ${imageDimensions}`
                        : "Recommended: 1000 x 707"}
                  </p>
                </div>
              </div>
              <button type="submit" className="btn btn-primary-600 radius-8">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogLayer;
