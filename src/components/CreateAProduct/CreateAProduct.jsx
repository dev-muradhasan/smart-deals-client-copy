
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import MyContainer from "../../MyContainer/MyContainer";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxios from "../../hooks/useAxios";

const CreateAProduct = () => {
    const { user } = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const handleCreateAProduct = e => {
        e.preventDefault()
        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        console.log(title, image, price_min, price_max);
        const newProduct = { title, image, price_min, price_max, email: user.email, seller_image: user.photoURL, seller_name: user.displayName  }

        // axios.post('http://localhost:3000/products', newProduct)
        //     .then(data => {
        //         console.log(data.data);
        //         if (data.data.insertedId) {
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "success",
        //                 title: "Your product has been created",
        //                 showConfirmButton: false,
        //                 timer: 1900
        //             });
        //         }
        //     })
        axiosSecure.post('/products', newProduct)
        .then(data=>{
            console.log('after secure call',data.data)
            if (data.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your product has been created",
                            showConfirmButton: false,
                            timer: 1900
                        });
                    }
        })
    }

    return (
        <MyContainer className="min-h-screen bg-base-200 py-8 px-4">

            {/* Back Button */}
            <div className="max-w-5xl mx-auto mb-4">
                <Link to={'/allProducts'} className="flex items-center gap-2 text-sm font-semibold text-base-content hover:text-primary transition">
                    <FaArrowLeft className="text-xs" />
                    Back To Products
                </Link>
            </div>

            {/* Page Title */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#001931]">
                    Create{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#632EE3] to-[#9F62F2]">
                        A Product
                    </span>
                </h1>

                <div className="w-5 h-0.5 bg-pink-500 mx-auto mt-3"></div>
            </div>

            {/* Form Card */}
            <form onSubmit={handleCreateAProduct} className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-6 md:p-7">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Yamaha Fz Guitar for Sale"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Category
                        </label>

                        <div className="relative">
                            <select className="select select-bordered w-full h-10 text-xs appearance-none">
                                <option>Select a Category</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Vehicles</option>
                                <option>Fashion</option>
                                <option>Books</option>
                            </select>

                            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
                        </div>
                    </div>

                    {/* Min Price */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Min Price You want to Sale ($)
                        </label>

                        <input
                            type="number"
                            name="price_min"
                            placeholder="e.g. 18.5"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Max Price */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Max Price You want to Sale ($)
                        </label>

                        <input
                            type="number"
                            name="price_max"
                            placeholder="Optional (default = Min Price)"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Product Condition */}
                    <div>
                        <label className="block text-xs font-semibold mb-2">
                            Product Condition
                        </label>

                        <div className="flex items-center gap-5">

                            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                <input
                                    type="radio"
                                    name="condition"
                                    className="radio radio-primary radio-sm"
                                    defaultChecked
                                />
                                Brand New
                            </label>

                            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                <input
                                    type="radio"
                                    name="condition"
                                    className="radio radio-primary radio-sm"
                                />
                                Used
                            </label>

                        </div>
                    </div>

                    {/* Usage Time */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Product Usage time
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. 1 year 3 month"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                </div>

                {/* Product Image */}
                <div className="mt-4">
                    <label className="block text-xs font-semibold mb-1">
                        Your Product Image URL
                    </label>

                    <input
                        type="text"
                        name="image"
                        placeholder="https://..."
                        className="input input-bordered w-full h-10 text-xs"
                    />
                </div>

                {/* Seller Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                    {/* Seller Name */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Seller Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Artisan Roasters"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Seller Email */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Seller Email
                        </label>

                        <input
                            type="email"
                            placeholder="leli31955@nrlord.com"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Seller Contact */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Seller Contact
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. +1-555-1234"
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                    {/* Seller Image */}
                    <div>
                        <label className="block text-xs font-semibold mb-1">
                            Seller Image URL
                        </label>

                        <input
                            type="text"
                            placeholder="https://..."
                            className="input input-bordered w-full h-10 text-xs"
                        />
                    </div>

                </div>

                {/* Location */}
                <div className="mt-4">
                    <label className="block text-xs font-semibold mb-1">
                        Location
                    </label>

                    <input
                        type="text"
                        placeholder="City, Country"
                        className="input input-bordered w-full h-10 text-xs"
                    />
                </div>

                {/* Description */}
                <div className="mt-4">
                    <label className="block text-xs font-semibold mb-1">
                        Simple Description about your Product
                    </label>

                    <textarea
                        rows="4"
                        placeholder="e.g. I bought this product 3 month ago, did not used more than 1/2 time, actually learning guitar is so tough....."
                        className="textarea textarea-bordered w-full text-xs resize-none"
                    ></textarea>
                </div>

                {/* Create Button */}
                <button
                    type="submit"
                    className="btn w-full mt-4 border-none text-white btn-gradient hover:opacity-90"
                >
                    Create A Product
                </button>

            </form>
        </MyContainer>
    );
};

export default CreateAProduct;