import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const OrderCart = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const navigate = useNavigate()
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();

    const handaleAddToCart = (item) => {
        console.log("mainItem", item)
        const cartItems = { orderid: _id, name, image, price, email: user?.email };
        console.log(cartItems);
        if (user && user?.email) {
            fetch("http://localhost:5000/carts", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(cartItems)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Cart to Added Success",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                })
        }
        else {
            Swal.fire({
                title: "Plase Login then Added to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-5 bg-gray-600 text-white px-5 font-bold rounded mt-4">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => { handaleAddToCart(item) }} className="btn btn-outline border-0 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCart;