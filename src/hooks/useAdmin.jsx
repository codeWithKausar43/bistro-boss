import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

 

const useAdmin = () => {
    const {user} = useAuth()
    console.log(user.email)
const axiosSecure = useAxiosSecure()
  const {data: isAdmin, isPending: isAdminLoading} = useQuery({
    queryKey:[user?.email, 'isAdmin'],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/users/admin/${encodeURIComponent(user?.email)}`)
        return res.data?.admin;
    }
  })
  return [isAdmin,isAdminLoading]
};

export default useAdmin;