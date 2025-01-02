import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItems from "../../Shared/MenuItems/MenuItems";
import useMenu from "../../../hooks/useMenu";

 

const PopularMenu = () => {
    const [menu] = useMenu()
    const popularItems = menu.filter(popular => popular.category === 'popular')
    // const [menu, setMenu] = useState([])
    // useEffect(()=>{
    //     fetch("menu.json")
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(items => items.category === "popular")
    //         setMenu(popularItems)
    //     })
    // },[])
    
    
    return (
        <section className="mb-12">
            <SectionTitle subHeading={'Popular Items'} heading={'From Our Menu'}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
        {
            popularItems.map(items => <MenuItems items={items} key={items._id}></MenuItems>)
        }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;