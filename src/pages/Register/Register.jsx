/* eslint-disable no-useless-escape */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { signUp, googleLogin, githubLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSocialLogin = (media) => {
    media()
      .then(() => {
        Swal.fire(
          "Registration Successful!",
          "Welcome to our website!",
          "success"
        );
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.fname.value;
    const email = e.target.email.value;
    const img = e.target.img.value;
    const password = e.target.password.value;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " Password must be 6 characters, at least one uppercase and one special character",
      });
    }
    else {
       signUp(email, password)
      .then((result) => {
        Swal.fire(
          "Registration Successful!",
          "Welcome to our website!",
          "success"
        );
        updateProfile(result.user, {
          displayName: name,
          photoURL: img,
        })
          .then(() => {
          console.log('Profile Updated');
           window.location.reload();
          })
          .catch(() => {
           console.log('Not update');
          });
        
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      });
    }
   
  };
  return (
    <>
    <Helmet>
      <title>Registration</title>
    </Helmet>
      <div className="relative py-20 flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-red-500 uppercase">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                name="fname"
                required
                placeholder="Enter your Full Name"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Photo URL
              </label>
              <input
                type="text"
                name="img"
                required
                placeholder="Enter your Photo URL"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-red-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Register
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <div className="flex mt-4 gap-x-2">
            <button
              type="button"
              onClick={() => handleSocialLogin(googleLogin)}
              className="flex items-center justify-center w-full p-2 border border-gray-600 hover:border-blue-400 hover:text-white hover:bg-blue-400 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            <button 
            onClick={() => handleSocialLogin(githubLogin)}
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md hover:border-blue-400 hover:text-white hover:bg-blue-400 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>

          <p className="mt-8 text-sm font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
