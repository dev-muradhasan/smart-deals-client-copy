import { useLoaderData } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import MyContainer from "../../MyContainer/MyContainer";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const AllProducts = () => {
    const data = useLoaderData();
    const { loading } = use(AuthContext)
    return (
        <MyContainer className={'py-12'}>
            {loading ? <p className="text-4xl text-gray-500 text-center mt-10">Loading.....</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    data.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>}

        </MyContainer>
    );
};

export default AllProducts;