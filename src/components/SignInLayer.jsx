import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser, login } from "../redux/slice/userSlice";
import { useSelector } from "react-redux";

const SignInLayer = () => {
  const { user } = useSelector((state)=> state.user)
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(login(form)).unwrap();
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false)
    }
  }

    useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      dispatch(fetchUser());
    }
  }, [user]);
  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/logo.png" alt="WowDash React Vite" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="#" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="WowDash React Vite" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                name="email"
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  name="password"
                  type="password"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <span
                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                data-toggle="#your-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {" "}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
