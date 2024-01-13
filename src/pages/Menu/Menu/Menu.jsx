import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory"


import dessertBg from "../../../assets/menu/dessert-bg.jpeg"
import soupBg from "../../../assets/menu/soup-bg.jpg"
import saladBg from "../../../assets/menu/salad-bg.jpg"
import pizzaBg from "../../../assets/menu/pizza-bg.jpg"
import banner from '../../../assets/menu/banner3.jpg'



const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Resturent | Menu</title>
            </Helmet>
            <div>
                <Cover
                    img={banner}
                    title={"Menu Items"}
                ></Cover>
                <SectionTitle
                    subHeading="Don't Miss this Offer"
                    heading="Today Items"
                ></SectionTitle>
                <MenuCategory
                    item={offered}
                ></MenuCategory>

                {/* desert */}
                <MenuCategory
                    coverImg={dessertBg}
                    item={dessert}
                    title={"desert"}
                ></MenuCategory>

                {/* soup */}
                <MenuCategory
                    coverImg={soupBg}
                    item={soup}
                    title={"soup"}
                ></MenuCategory>
                {/* salad */}
                <MenuCategory
                    coverImg={saladBg}
                    item={salad}
                    title={"salad"}
                ></MenuCategory>
                {/* pizza */}
                <MenuCategory
                    coverImg={pizzaBg}
                    item={pizza}
                    title={"pizza"}
                ></MenuCategory>


            </div>
        </div>
    );
};

export default Menu;