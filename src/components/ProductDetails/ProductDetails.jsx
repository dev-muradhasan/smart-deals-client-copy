import { Link, useLoaderData } from "react-router";
import MyContainer from '../../MyContainer/MyContainer'
import {
    FiArrowLeft,
    FiMapPin,
    FiCalendar,
    FiTag,
} from "react-icons/fi";
import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetails = () => {
    const [bids, setBids] = useState([]);
    const { user } = use(AuthContext)
    const product = useLoaderData();
    const bidModalRef = useRef(null);

    useEffect(() => {
        axios(`http://localhost:3000/products/bids/${product._id}`)
        .then(data=>{
            console.log('after axios get', data.data);
            setBids(data.data)
        })
    }, [product._id])
    // useEffect(() => {
    //     fetch(`http://localhost:3000/products/bids/${product._id}`, {
    //         headers:{
    //             authorization: `Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setBids(data)
    //         })
    // }, [product._id, user])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }
    const handleBidModalClose = () => {
        bidModalRef.current.close();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const productId = product._id;
        const buyer_name = e.target.buyer_name.value
        const buyer_email = e.target.buyer_email.value
        const bid_price = e.target.bid_price.value
        const buyer_contact = e.target.buyer_contact.value
        const buyer_image = user.photoURL
        const status = 'pending';
        const newBid = {
            productId,
            buyer_name,
            buyer_email,
            bid_price,
            buyer_contact,
            buyer_image,
            status
        }
        
        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1900
                    });
                    e.target.reset()
                    bidModalRef.current.close()
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid]
                    newBids.sort((a,b)=>b.bid_price - a.bid_price)
                    setBids(newBids)
                }
            })
    }

    return (
        <MyContainer className="bg-base-200 py-12">
            <div>

                {/* Back Button */}
                <Link
                    to="/allProducts"
                    className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#001931] hover:text-[#632EE3]"
                >
                    <FiArrowLeft />
                    Back To Products
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* Left Side */}
                    <div>
                        {/* Product Image */}
                        <div className="h-75 overflow-hidden rounded-lg bg-base-300 md:h-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Description */}
                        <div className="mt-5 rounded-lg bg-base-100 p-5 shadow">
                            <h2 className="text-lg font-bold text-[#001931]">
                                Product Description
                            </h2>

                            <div className="my-5 grid grid-cols-2 border-b border-[#A1A1AA]/50 pb-3">
                                <p className="text-sm font-semibold">
                                    <span className="text-[#632EE3]">
                                        Condition :
                                    </span>{" "}
                                    {product.condition}
                                </p>

                                <p className="text-right text-sm font-semibold">
                                    <span className="text-[#632EE3]">
                                        Usage Time :
                                    </span>{" "}
                                    {product.usage}
                                </p>
                            </div>

                            <p className="text-sm leading-5 text-[#A1A1AA]">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div>
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-[#001931] md:text-4xl">
                            {product.title}
                        </h1>

                        {/* Category */}
                        <div className="mt-3">
                            <span className="rounded-full bg-[#632EE3]/10 px-3 py-1 text-xs font-semibold text-[#632EE3]">
                                {product.category}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 rounded-lg bg-base-100 p-4 shadow">
                            <h2 className="text-xl font-bold text-green-700">
                                $ {product.price_min} - {product.price_max}
                            </h2>

                            <p className="mt-1 text-sm text-[#A1A1AA]">
                                Price starts from
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="mt-4 rounded-lg bg-base-100 p-4 shadow">
                            <h2 className="mb-4 text-lg font-bold text-[#001931]">
                                Product Details
                            </h2>

                            <div className="space-y-3 text-sm">
                                <p className="font-medium text-[#001931]">
                                    Product ID:{" "}
                                    <span className="font-bold">
                                        {product._id}
                                    </span>
                                </p>

                                <p className="flex items-center gap-2">
                                    <FiCalendar />
                                    Posted: {product.created_at}
                                </p>
                            </div>
                        </div>

                        {/* Seller Information */}
                        <div className="mt-4 rounded-lg bg-base-100 p-4 shadow">
                            <h2 className="mb-4 text-lg font-bold text-[#001931]">
                                Seller Information
                            </h2>

                            {/* Seller */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={product.seller_image}
                                    alt={product.seller_name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-[#001931]">
                                        {product.seller_name}
                                    </h3>

                                    <p className="text-xs text-[#A1A1AA]">
                                        {product.seller_email}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3 text-sm">
                                <p className="flex items-center gap-2">
                                    <FiMapPin className="text-[#632EE3]" />
                                    <span>
                                        Location:{" "}
                                        <b>{product.location}</b>
                                    </span>
                                </p>

                                <p className="flex items-center gap-2">
                                    <FiTag className="text-[#632EE3]" />
                                    <span>
                                        Contact:{" "}
                                        <b>{product.seller_contact}</b>
                                    </span>
                                </p>

                                <p>
                                    Status:{" "}
                                    <span className="badge border-0 bg-yellow-400 text-xs font-bold text-black">
                                        {product.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Buy Button */}
                        <button
                            onClick={handleBidModalOpen}
                            className="btn mt-4 w-full border-0 btn-gradient text-white hover:opacity-90"
                        >
                            I Want Buy This Product
                        </button>
                    </div>
                </div>
            </div>

            {/* DaisyUI Modal */}
            {/* DaisyUI Modal */}
            <dialog ref={bidModalRef} className="modal">
                <div className="modal-box max-w-xl rounded-lg bg-white p-6 md:p-7">

                    {/* Modal Title */}
                    <h3 className="mb-6 text-center text-2xl font-bold text-[#001931]">
                        Give Seller Your Offered Price
                    </h3>

                    <form onSubmit={handleBidSubmit}>

                        {/* Buyer Name & Email */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* Buyer Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#001931]">
                                    Buyer Name
                                </label>

                                <input
                                    type="text"
                                    name="buyer_name"
                                    defaultValue={user?.displayName || ""}
                                    readOnly
                                    className="input input-bordered w-full text-[#001931] placeholder:text-[#A1A1AA] focus:outline-[#632EE3]"
                                />
                            </div>

                            {/* Buyer Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#001931]">
                                    Buyer Email
                                </label>

                                <input
                                    type="email"
                                    name="buyer_email"
                                    defaultValue={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full text-[#001931] placeholder:text-[#A1A1AA] focus:outline-[#632EE3]"
                                />
                            </div>
                        </div>

                        {/* Offered Price */}
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-semibold text-[#001931]">
                                Place your Price
                            </label>

                            <input
                                type="number"
                                name="bid_price"
                                placeholder="e.g. 2500"
                                required
                                className="input input-bordered w-full text-[#001931] placeholder:text-[#A1A1AA] focus:outline-[#632EE3]"
                            />
                        </div>

                        {/* Contact */}
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-semibold text-[#001931]">
                                Contact Info
                            </label>

                            <input
                                type="text"
                                name="buyer_contact"
                                placeholder="e.g. +880 123 456 789"
                                required
                                className="input input-bordered w-full text-[#001931] placeholder:text-[#A1A1AA] focus:outline-[#632EE3]"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="mt-24 flex justify-end gap-3">

                            {/* Cancel Button */}
                            <button
                                onClick={handleBidModalClose}
                                type="button"
                                className="btn border-[#9F62F2] bg-white px-5 text-[#632EE3] hover:border-[#632EE3] hover:bg-[#632EE3]/5"
                            >
                                Cancel
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-gradient border-0 px-5 text-white hover:opacity-90"
                            >
                                Submit Bid
                            </button>
                        </div>
                    </form>
                </div>

                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* footer content */}
            <h1 className="mt-16 mb-6 font-bold text-5xl text-[#001931]">Bids for this product: <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">{bids.length}</span></h1>
            <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100 shadow mb-12">
                <table className="table">
                    <thead>
                        <tr className="text-[#001931]">
                            <th>SL No</th>
                            <th>Buyer</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={bid._id}>
                                <th>{index + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="h-10 w-10 rounded-full">
                                                <img
                                                    src={bid.buyer_image}
                                                    alt={bid.buyer_name}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-bold text-[#001931]">
                                                {bid.buyer_name}
                                            </p>

                                            <p className="text-xs text-[#A1A1AA]">
                                                {bid.buyer_email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="font-bold">
                                    ${bid.bid_price}
                                </td>

                                <td>
                                    <span className="badge badge-warning badge-sm">
                                        {bid.status}
                                    </span>
                                </td>

                                <td className="flex gap-2">
                                    <button className="btn btn-sm border-green-400 bg-white text-green-700">
                                        Accept Offer
                                    </button>

                                    <button className="btn btn-sm border-red-400 bg-white text-red-600">
                                        Reject Offer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MyContainer>
    );
};

export default ProductDetails;