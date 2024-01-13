import Cover from "../../Shared/Cover/Cover";
import orderimg from "../../../assets/shop/banner2.jpg"
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";

import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
    const categores = ['salad', 'pizza', 'soup', 'desert', 'drinks'];
    const { category } = useParams();
    const initailIndex = categores.indexOf(category)
    const [menu] = useMenu()
    const [tabIndex, setTabIndex] = useState(initailIndex);

    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>Resturent | Order</title>
            </Helmet>
            <Cover
                img={orderimg}
                title={"Order Items"}
            ></Cover>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab item={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={drinks}></OrderTab>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;