const FoodCard = ({item}) => {
    const {name, image, price, recipe} = item || {}
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
        <button className="btn btn-outline border-0 border-b-4 mt-4 hover:text-orange-400 hover:bg-slate-200 hover:border-orange-400  ">Add To Card</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
