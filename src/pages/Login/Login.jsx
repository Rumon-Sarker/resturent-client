import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SochalLogin from '../Shared/SochalLogin/SochalLogin';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext)

    const handaleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })

    }


    const handaleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }
        else {
            setDisabled(true)

        }

    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    return (
        <div>
            <Helmet>
                <title>Resturent | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handaleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    < LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={handaleValidateCaptcha} name="captcha" placeholder="Please Captcha matching" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='p-4'><small>Create a new Account....<Link className='font-bold underline text-green-700' to="/signup">Sign_Up</Link></small></p>
                        <SochalLogin></SochalLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;