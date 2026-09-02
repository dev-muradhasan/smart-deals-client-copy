import { use, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import MyContainer from "../../MyContainer/MyContainer";
import Swal from "sweetalert2";


const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([])
    console.log(user)

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`,{
                headers : {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBids(data)
                })
        }
    }, [user?.email, user.accessToken])

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed){
                fetch(`http://localhost:3000/bids/${_id}`,{
                    method: 'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    // console.log('after delete', data)
                    if (data.deletedCount){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const remainingBids = bids.filter(bid=> bid._id !== _id);
                        setBids(remainingBids)
                    }
                })
            }
        });
    }

    return (
        <MyContainer className="bg-base-200 py-14">
            <div>

                {/* Title */}
                <h1 className="mb-8 text-center text-3xl font-bold text-[#001931] md:text-4xl">
                    My Bids:
                    <span className="ml-2 text-[#632EE3]">
                        {bids.length}
                    </span>
                </h1>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <table className="table">
                        {/* Head */}
                        <thead>
                            <tr className="text-sm font-bold text-[#001931]">
                                <th>SL No</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {bids.map((bid, index) => (
                                <tr
                                    key={bid._id}
                                    className="hover:bg-base-200/50"
                                >
                                    {/* SL No */}
                                    <th className="text-[#001931]">
                                        {index + 1}
                                    </th>

                                    {/* Product */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            {/* Product Image */}
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded">
                                                <img
                                                    src={bid.productImage}
                                                    alt={bid.productTitle}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-bold text-[#001931]">
                                                    {bid.productTitle}
                                                </p>

                                                <p className="text-xs font-medium text-[#A1A1AA]">
                                                    ${bid.productPrice}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Seller */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            {/* Seller Image */}
                                            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                                <img
                                                    src={bid.sellerImage}
                                                    alt={bid.sellerName}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-bold text-[#001931]">
                                                    {bid.sellerName}
                                                </p>

                                                <p className="text-xs text-[#A1A1AA]">
                                                    {bid.sellerEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Bid Price */}
                                    <td className="font-bold text-[#001931]">
                                        ${bid.bid_price}
                                    </td>

                                    {/* Status */}
                                    <td>
                                        <span
                                            className={`badge border-0 text-xs font-semibold ${bid.status === "pending"
                                                ? "bg-yellow-400 text-[#001931]"
                                                : bid.status === "accepted"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                                }`}
                                        >
                                            {bid.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <button
                                            onClick={() => handleDeleteBid(bid._id)}
                                            className="btn btn-sm border border-red-400 bg-white text-xs text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
                                        >
                                            Remove Bid
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MyContainer>
    );
};

export default MyBids;