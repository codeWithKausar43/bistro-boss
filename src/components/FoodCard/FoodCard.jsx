import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure"

 

const FoodCard = ({item}) => {
    const {_id,name, image, price, recipe} = item || {}
    const {user} = useAuth();
  const location = useLocation()
  const axiosSecure = useAxiosSecure()

 const navigate = useNavigate()
    const handleAddToCard = food => {
      if(user && user?.email){
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price
        }

        axiosSecure.post("/carts", cartItem)
        .then(res => {
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title:`${name} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })

      }else{
        Swal.fire({
          title: "You are not Logged?",
          text: "please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login"
        }).then((result) => {
          if (result.isConfirmed) {
             navigate("/login", {state: {from: location}})
          }
        });
      }

    }
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mt-4 px-4">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
        <button onClick={()=> handleAddToCard(item)}   className="btn btn-outline border-0 border-b-4 mt-4 hover:text-orange-400 hover:bg-slate-200 hover:border-orange-400  ">Add To Card</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
