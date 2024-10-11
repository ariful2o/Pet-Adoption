import { updateProfile } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registerImg from "../../assets/adopt-a-pet/registerImage.jpg";
import auth from "../../firebase/firebase.conf";
import useAuth from "../../hooks/auth/useAuth";

const Register = () => {
  const { registerUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    registerUser(email, password)
      .then(async (res) => {
        setUser(res.data);
        console.log("User registration");
        await updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign Up Success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="flex flex-col lg:flex-row-reverse justify-between items-center pb-10 mx-auto lg:max-h-[600px] w-[90%] lg:w-[80%] bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="w-full lg:w-1/2">
          <img src={registerImg} alt="Register" className="object-cover w-full h-full" />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center p-4">
          <form className="card-body w-full max-w-sm" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-4">Register Here!</h1>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered w-full"
                required
              />
            </div>
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
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="text-blue-600 hover:text-red-600 font-bold"
                  >
                    Sign in
                  </NavLink>{" "}
                  now!
                </p>
              </label>
            </div>

            <div className="form-control mt-4">
              <button className="btn bg-[#D1A054B3] w-full" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          {/* <SocialSignin /> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
