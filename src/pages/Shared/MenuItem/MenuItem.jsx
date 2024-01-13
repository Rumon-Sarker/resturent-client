

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex gap-5">
            <img style={{ borderRadius: "200px 200px 200px 0px" }} className="w-[90px]" src={image} alt="" />
            <div>
                <h1 className="uppercase">----{name}---</h1>
                <p>{recipe}</p>

            </div>
            <p className="text-yellow-600">{price}</p>
        </div>
    );
};

export default MenuItem;