import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SochalLogin from "../Shared/SochalLogin/SochalLogin";


const SignUp = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const createUser = result.user;
                console.log(createUser)
                updateUserProfile(data.photoUrl, data.name,)
                    .then(() => {
                        const users = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(users)
                        })
                            .then(res => res.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Success",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }

                            })
                        navigate("/");
                    })
                    .catch(errors => { console.log(errors) })

            })

    }
    return (
        <>
            <Helmet>
                <title>Resturent | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign_Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Input Your Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input type="text" name="photoUrl" {...register("photoUrl", { required: true })} placeholder="Input Your Photo Url" className="input input-bordered" />
                                {errors.photoUrl && <span className="text-red-600">Photo Url is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email")} placeholder="email" className="input input-bordered" />

                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password"
                                    {...register("password",
                                        {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

                                        })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is Required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Minimum 6 is Cheractar</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">MaxLength 20 is Cheractar</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600 text-sm">One Number One Uppercase One Lowercase One Special Cheractar</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignUp" />
                            </div>
                        </form>
                        <p className='p-4'><small>Already you have account plase...<Link className='font-bold underline text-green-700' to="/login">Login</Link></small></p>
                        <SochalLogin></SochalLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;