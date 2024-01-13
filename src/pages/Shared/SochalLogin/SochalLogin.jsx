import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SochalLogin = () => {
    const { SochailLogin } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    const handaleSochailLogin = () => {
        SochailLogin()
            .then(result => {
                const loggeduser = result.user;
                console.log(loggeduser)
                const users = { name: loggeduser.displayName, email: loggeduser.email }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(users)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })

            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className="m-8">
                <button onClick={handaleSochailLogin} className="btn w-full   hover:bg-gray-500  btn-circle btn-outline">
                    <p className="font-bold text-2xl text-red-300 "><FaGoogle></FaGoogle></p>
                </button>
            </div>
        </div>
    );
};

export default SochalLogin;