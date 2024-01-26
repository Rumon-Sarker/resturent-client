import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash } from "react-icons/fa";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyCart = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handaleDelete = (item) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://resturent-server-seven.vercel.app/carts/${item._id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted Success",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });

    }
    return (
        <div className="w-full">
            <Helmet>
                <title>Resturent | My Cart</title>
            </Helmet>
            <SectionTitle

                subHeading='Order Cart'
                heading="Dashboard"
            >

            </SectionTitle>
            <div className="uppercase my-8 font-bold flex justify-evenly text-center">
                <h1>Total Items:- {cart.length}</h1>
                <h1>Total Price:- ${total}</h1>
                <Link to="/dashboard/payment"> <button className="btn btn-sm btn-warning">Pay</button></Link>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => <tr key={item._id}>
                            <td>
                                <label>
                                    {index + 1}
                                </label>
                            </td>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => handaleDelete(item)} className="btn btn-ghost text-red-700"><FaTrash /></button>
                            </td>
                        </tr>)}

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyCart;