
import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../../MyContainer/MyContainer";

const Register = () => {
    const { googleSignIn, setLoading, setUser } = use(AuthContext)

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const password = form.password.value;

        console.log({
            name,
            email,
            image,
            password,
        });
    };

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            setUser(result.user)
            console.log(result.user)

            const newUser = {
                name: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL
            }

            // set user data to database
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('data after user save',data)
            })

            setLoading(false)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    return (
        <MyContainer className="flex items-center justify-center py-10">
            <div className="w-full max-w-md rounded-xl bg-base-100 p-7 shadow-xl md:p-8">

                {/* Title */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold">
                        Register Now!
                    </h2>

                    <p className="mt-2 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Login Now
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister}>
                    <div className="space-y-3">

                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

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

                        {/* Image URL */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Image-URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                placeholder="Enter your image URL"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Password */}
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
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="btn btn-gradient w-full mt-3 text-white"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="divider my-5 text-sm">
                    OR
                </div>

                {/* Google */}
                <button onClick={handleGoogleSignIn} className="btn bg-white text-primary border-primary w-full">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign up with Google
                </button>
            </div>
        </MyContainer>
    );
};

export default Register;