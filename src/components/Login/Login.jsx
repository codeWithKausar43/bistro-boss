import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate()
const location = useLocation()
const from = location?.state?.from?.pathname || "/"

  const {signInUser} = useContext(AuthContext)
  const [disable, setDisable] = useState(true);
 
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleFromSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    signInUser(email, password)
    .then(result => {
      const user = result.user
      Swal.fire({
        title: "Successful Login!",
        icon: "success",
        draggable: true
      });
    })
    navigate(from, { replace: true })
  };
  const handleValidation = (e) => {
    const user_captcha_value =e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  return (
    <>
    <Helmet>
        <title>Bistro Boos | Login</title>
      </Helmet>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center  w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-1/2 max-w-sm  shadow-2xl">
          <form onSubmit={handleFromSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidation}
                type="text"
                placeholder="type teh text above"
                name="captcha"
                className="input input-bordered"
                required
              />
            </div>
          
            <div className="form-control mt-6">
              <input
                disabled={disable}
                className="btn btn-primary"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p><small><Link to="/signUp">Create Account ? SignUp</Link></small></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
