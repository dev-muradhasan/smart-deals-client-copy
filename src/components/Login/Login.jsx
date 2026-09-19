
import { Link } from "react-router";
import MyContainer from "../../MyContainer/MyContainer";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

    const { setLoading, googleSignIn } = use(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        // console.log({
        //     email,
        //     password,
        // });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user)

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

                // set user data to database
                fetch('https://smart-deals-server-copy.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('data after user save', data)
                    })

                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    return (
        <MyContainer className="flex items-center justify-center py-10">
            <div className="w-full max-w-md rounded-xl bg-base-100 p-7 shadow-xl md:p-8">

                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold">
                        Login
                    </h2>

                    <p className="mt-2 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    <div className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
 
                        {/*Password */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />

                            <Link
                                to="/forgot-password"
                                className="mt-2 inline-block text-sm text-base-content/60 hover:text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-gradient w-full text-white"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="divider my-5 text-sm">
                    OR
                </div>

                {/* Google Login */}
                <button onClick={handleGoogleSignIn} className="btn bg-white border-primary w-full text-primary">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign in with Google
                </button>
            </div>
        </MyContainer>
    );
};

export default Login;