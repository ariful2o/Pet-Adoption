import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../../assets/adopt-a-pet/Adopt_a_Pet8_generated.jpg";
import useAuth from "../../hooks/auth/useAuth";

const Login = () => {
  const { loginUser } =useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state.from.pathname);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signin Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state?.from?.pathname ? location?.state?.from?.pathname : "/");
      })
  };

  return (
    <div
      className="min-h-screen flex items-center"
    // style={{ backgroundImage: `url(${})` }}
    >
      <div
        className="flex flex-col lg:flex-row-reverse justify-between items-center pb-10 mx-auto max-h-[600px] w-[80%]"
        style={{ boxShadow: `10px 10px 10px 10px rgba(0, 0, 0, 0.25)` }}
      >
        <div className="w-1/2">
          <img src={loginImg} alt="" />
        </div>
        <div className="card w-full max-w-sm mx-auto">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center ">Login Now!</h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" >
                  You Don't have an account ?<span className="label-text-alt link link-hover hover:text-red-600 text-lg font-bold"><NavLink to="/register"> Register </NavLink></span>Now !
                </a>
              </label>
            </div>

            <div className="form-control mt-2">
              <button className="btn bg-[#D1A054B3]" type="submit">
                Login
              </button>
            </div>
          </form>
          {/* <SocialSignin /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;