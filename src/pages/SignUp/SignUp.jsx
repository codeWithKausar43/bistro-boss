import { Helmet } from "react-helmet";
import { useForm} from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import userAxiosPublic from "../../hooks/userAxiosPublic";
import GoogleLogin from "../../components/SocialLogin/GoogleLogin";

const SignUp = () => {
  const axiosPublic = userAxiosPublic()
const {createUser,updateUserProfile} = useContext(AuthContext)
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    createUser(data.email, data.password)
    .then( result => {
        const loggedUser = result.user 
        console.log(loggedUser)
        updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // console.log("user profile info updated")
          const userInfo = {
            name:data.name,
            email: data.email
          }
          axiosPublic.post('/users', userInfo )
          .then(res => {
            if(res.data.insertedId){
              console.log("user added to the database")
              Swal.fire({
                title: "successful user login ",
                text: "That thing is still around?",
                icon: "question"
              });
              navigate("/")
            }
          }) 
        })
        .catch(error => console.log(error))
    })

  };

  return (
    <>
    <Helmet>
        <title>Bistro Boos | SignUP</title>
      </Helmet>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name :</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="user name"
                className="input input-bordered"
                required
              />
              {errors.name && <span className="text-red-600">name is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url:</span>
              </label>
              <input
                type="text"
                {...register("photo", { required: true })}
                name="photo"
                placeholder="photo"
                className="input input-bordered"
                required
              />
              {errors.photo && <span className="text-red-600">photo is required</span>}
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })} name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              {errors.email && <span className="text-red-600">email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength:6, pattern:/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/ })}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
              {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character</span>}
              {errors.password?.type === 'pattern' && <span className="text-red-600">Password must be uppercase and lowercase and special character</span>}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              <p className="text-center"><small><Link to="/login">Already have a account? Signin</Link></small></p>
              <p className="text-center"><small><Link to="/">back to home ? Home</Link></small></p>
            </div>
          </form>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
