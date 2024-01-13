
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/users')
    //         .then(res => res.json())
    //         .then(data => setUsers(data))
    // }, [])
    const { refetch, data: users = [] } = useQuery({
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    })

    const handaleAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin Now `,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    }




    return (
        <div className="w-full">
            <Helmet>
                <title>Resturent | All Users</title>
            </Helmet>
            <h1 className="text-3xl font-semibold">All Users: {users.length} </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (<tr key={user._id}>
                                {console.log(user.role)}
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>{
                                    (user.role === "admin" ? "Admin" : <button onClick={() => handaleAdmin(user)} className="btn btn-ghost text-yellow-800"><FaUserShield /></button>)
                                }</td>

                                <td><button onClick={() => handaleDelete(user)} className="btn btn-ghost text-red-700"><FaTrash /></button></td>
                            </tr>))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;