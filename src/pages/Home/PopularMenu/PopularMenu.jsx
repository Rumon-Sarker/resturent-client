
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState([])

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category == 'popular')
    //             setMenu(popularItems)
    //         })
    // }, [])
    return (
        <section className="mb-12 text-center">
            <SectionTitle
                subHeading={"From Our Menu"}
                heading={"Popular Items"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                ></MenuItem>)}

            </div>
            <Link to="/menu" ><button className="btn btn-outline border-0 border-b-4 mt-12">Vew Full Menu</button></Link>
        </section>
    );
};

export default PopularMenu;