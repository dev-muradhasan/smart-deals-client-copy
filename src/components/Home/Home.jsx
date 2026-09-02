
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import LatestProducts from "../LatestProducts/LatestProducts";


const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());

const Home = () => {
    const { loading } = use(AuthContext)


    return (
        <div>
            {loading ? <p className="text-4xl text-gray-500 text-center mt-10">Loading.....</p> : <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>}

        </div>
    );
};

export default Home;