import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaBook, FaCalendarAlt, FaHome, FaList, FaShopify, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()

    //To do  
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div className="bg-gray-200">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div id="dashboard" className="drawer-side bg-gray-300">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full text-base-content">
                        {/* Sidebar content here */}


                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/adminhome" ><FaHome />Admin Home</NavLink ></li>
                                <li><NavLink to="/dashboard/additem" ><FaUtensils />Add Items</NavLink ></li>
                                <li><NavLink to="/dashboard/manageitems" ><FaList /> Manage Item</NavLink ></li>
                                <li><NavLink to="/dashboard/history" ><FaBook />Manage Booking</NavLink ></li>
                                <li><NavLink to="/dashboard/allusers"><FaUsers />All Users</NavLink ></li>

                                <div className="divider"></div>

                                <li><NavLink to="/"><FaHome />Home</NavLink ></li>
                                <li><NavLink to="/menu"><FaBars />Menu</NavLink ></li>
                                <li><NavLink to="/order/salad"><FaShopify />Order</NavLink ></li>
                            </>
                                : <>
                                    <li><NavLink to="/dashboard/userhome" ><FaHome />User Home</NavLink ></li>
                                    <li><NavLink to="/dashboard/resarvithions" ><FaCalendarAlt />Resarvithions</NavLink ></li>
                                    <li><NavLink to="/dashboard/history" ><FaWallet />Pement History</NavLink ></li>
                                    <li><NavLink to="/dashboard/mycart"><FaShoppingCart />My Cart  <span className="badge badge-secondary">+{cart.length || 0}</span></NavLink ></li>

                                    <div className="divider"></div>

                                    <li><NavLink to="/"><FaHome />Home</NavLink ></li>
                                    <li><NavLink to="/menu"><FaBars />Menu</NavLink ></li>
                                    <li><NavLink to="/order/salad"><FaShopify />Order</NavLink ></li>
                                </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;