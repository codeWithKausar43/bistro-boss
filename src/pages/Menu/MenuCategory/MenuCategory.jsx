import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover/Cover";
import MenuItems from "../../Shared/MenuItems/MenuItems";

const MenuCategory = ({items, title,coverImg}) => {
  return (
    <div className="pt-8">
    {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 my-16">
        {items.map((items) => (
          <MenuItems items={items} key={items._id}></MenuItems>
        ))}
      </div>
        <Link to={`/order/${title}`}
      ><button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button></Link>
    </div>
  );
};

export default MenuCategory;
