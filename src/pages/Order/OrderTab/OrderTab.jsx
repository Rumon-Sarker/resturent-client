import OrderCart from "../../../components/OrderCart/OrderCart";


const OrderTab = ({ item }) => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {item?.map(item => <OrderCart
                key={item._id}
                item={item}
            ></OrderCart>)}
        </div>
    );
};

export default OrderTab;