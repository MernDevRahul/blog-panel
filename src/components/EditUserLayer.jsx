import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditUserLayer = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { userById } = useSelector((state)=>state.user)
  const [loading, setLoading ] = useState(false);
  const [form, setForm] = useState({name: '', email:'', password:''});
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if(form.password){
        formData.append("password", form.password.trim());
      }
    if (imageFile) {
      formData.append("profile", imageFile);
    }
    dispatch(updateUser({id:userId, data:formData})).unwrap();
      navigate('/')
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }finally{
    setLoading(false)
    }
  }

  // 1️⃣ Fetch user
useEffect(() => {
  if (userId) {
    dispatch(fetchUserById(userId));
  }
}, [dispatch, userId]);

// 2️⃣ When userById updates, populate form
useEffect(() => {
  if (userById) {
    setForm({
      name: userById.name || "",
      email: userById.email || "",
      password: "",
    });

    setImagePreviewUrl(userById.profile || "");
    setImageFile(null); // Important: do NOT set file from URL
  }
}, [userById]);

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-body p-24'>
        <div className='row justify-content-center'>
          <div className='col-xxl-6 col-xl-8 col-lg-10'>
            <div className='card border'>
              <div className='card-body'>
                <h6 className='text-md text-primary-light mb-16'>
                  Profile Image
                </h6>
                {/* Upload Image End */}
                <form onSubmit={handleSubmit}>
                  {/* Upload Image Start */}
                <div className='mb-24 mt-16'>
                  <div className='avatar-upload'>
                    <div className='avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer'>
                      <input
                        type='file'
                        id='imageUpload'
                        accept='.png, .jpg, .jpeg'
                        hidden
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor='imageUpload'
                        className='w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle'
                      >
                        <Icon
                          icon='solar:camera-outline'
                          className='icon'
                        ></Icon>
                      </label>
                    </div>
                    <div className='avatar-preview'>
                      <div
                        id='imagePreview'
                        style={{
                          backgroundImage: imagePreviewUrl
                            ? `url(${imagePreviewUrl})`
                            : "",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='name'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Full Name <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      name="name"
                      type='text'
                      value={form.name}
                      className='form-control radius-8'
                      id='name'
                      placeholder='Enter Full Name'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='email'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Email <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      name="email"
                      type='email'
                      value={form.email}
                      className='form-control radius-8'
                      id='email'
                      placeholder='Enter email address'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='password'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Password <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      name="password"
                      type='text'
                      value={form.password}
                      className='form-control radius-8'
                      id='password'
                      placeholder='Enter Password'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='d-flex align-items-center justify-content-center gap-3'>
                    <button
                      type='button'
                      className='border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8'
                      onClick={()=>{
                        setForm({name:'',email:'',password:''});
                          setImagePreviewUrl("");
                          setImageFile(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      { loading ? "Submiting..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserLayer;
