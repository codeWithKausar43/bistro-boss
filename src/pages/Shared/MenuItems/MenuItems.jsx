 

const MenuItems = ({items}) => {
    const {name,image, price, recipe} = items || {}
    return (
        <div className="flex space-y-4 gap-2">
            <img style={{borderRadius: ' 0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name} -----------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">{price}</p>
        </div>
    );
};

export default MenuItems;