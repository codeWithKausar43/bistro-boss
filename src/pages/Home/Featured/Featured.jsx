import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from "../../../assets/home/featured.jpg"
import "./Featured.css"
const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
      <SectionTitle
        subHeading={"Check it out"}
        heading={"from our menu"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-60">
        <div>
          <img className="md:w-[500px]"  src={featured} alt="" />
        </div>
        <div className="md:ml-10">
          <p>March 0,2023</p>
          <h4 className="uppercase">where can i get some ?</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            fugiat ratione dolor facere sequi sed nesciunt consequatur
            cupiditate labore placeat.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
        </div> 
      </div>
    </div>
  );
};

export default Featured;
