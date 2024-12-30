import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItems from "../../Shared/MenuItems/MenuItems";

 

const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(()=>{
        fetch("menu.json")
        .then(res => res.json())
        .then(data => {
            const popularItems = data.filter(items => items.category === "popular")
            setMenu(popularItems)
        })
    },[])
    return (
        <section className="mb-12">
            <SectionTitle subHeading={'Popular Items'} heading={'From Our Menu'}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
        {
            menu.map(items => <MenuItems items={items} key={items._id}></MenuItems>)
        }
            </div>
        </section>
    );
};

export default PopularMenu;