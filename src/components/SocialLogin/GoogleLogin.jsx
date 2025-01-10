import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import userAxiosPublic from "../../hooks/userAxiosPublic";
import { useNavigate } from "react-router-dom";

 

const GoogleLogin = () => {
    const {googleSignIn} = useAuth()
    const axiosPublic = userAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo = {
                email: result.user.email,
                name: result.user.displayName
            }
            axiosPublic.post("/users", userInfo)
            .then(res => {
                console.log(res.data)
                navigate("/")
            })
        })
    }
    return (
         
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle className="mr-2"></FaGoogle>
                Google
                </button>
            </div>
         
    );
};

export default GoogleLogin;