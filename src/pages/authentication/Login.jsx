import loginImg from "../../assets/vecteezy_adopt-a-pet-cute-puppies-in-the-box-vector-illustration-in-flat-style_2172289/Adopt_a_Pet8_generated.jpg"
import { NavLink, useNavigate } from "react-router-dom";


// import { updateProfile } from "firebase/auth";
// import { useContext } from "react";
// import Swal from "sweetalert2";
// import authentication from "../../../assets/others/authentication.png";
// import authentication1 from "../../../assets/others/authentication2-removebg-preview.png";
// import { AuthContext } from "../../../authProvider/AuthProvider";
// import SocialSignin from "../../../components/socialSignIn/SocialSignin";
// import auth from "../../../firebase/firebase.config";

const Login = () => {
  // const { signupUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signupUser(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signin Success",
          showConfirmButton: false,
          timer: 1500,
        });
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigate("/");
      })
      .then((err) => console.log(err));
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