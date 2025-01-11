import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import userAxiosPublic from "../../../hooks/userAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = userAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an rul
    const imageFile = { image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers:{
            'content-type': 'multipart/form-data'
        }
    })
    if(res.data.success){
        // now send the menu item data to the server with the image url 
        const menuItem = {
            name: data.name,
            category:data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
          image: res.data.data.display_url
        }
        const menuRes = await axiosSecure.post('/menu', menuItem)
        // console.log(menuRes.data)
        if(menuRes.data.insertedId){
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is added to the menu`,
              showConfirmButton: false,
              timer: 1500
            });
        }
    }
 
  };
  return (
    <div>
      <SectionTitle
        heading="add an item"
        subHeading="what's new?"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/*category  */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/*  Price*/}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              placeholder="Details"
              className="textarea textarea-bordered textarea-sm w-full"
            ></textarea>
          </div>
          {/* input file */}
          <div className="form-control my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">
            {" "}
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
