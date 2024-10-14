import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../../assets/adopt-a-pet/Adopt_a_Pet8_generated.jpg";
import SocialLogin from "../../componts/SocialLogin";
import useAuth from "../../hooks/auth/useAuth";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="flex flex-col lg:flex-row-reverse justify-between items-center pb-10 mx-auto lg:max-h-[600px] w-[90%] lg:w-[80%] bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="w-full lg:w-1/2">
          <img src={loginImg} alt="Login" className="object-cover w-full h-full" />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center p-4">
          <form className="card-body w-full max-w-sm" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-4">Login Now!</h1>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                required
              />
              <label className="label mt-2">
                <p className="text-sm">
                  You don&apos;t have an account?{" "}
                  <NavLink
                    to="/register"
                    className="text-blue-600 hover:text-red-600 font-bold"
                  >
                    Register
                  </NavLink>{" "}
                  now!
                </p>
              </label>
            </div>

            <div className="form-control mt-4">
              <button className="btn bg-[#D1A054B3] w-full" type="submit">
                Login
              </button>
            </div>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
