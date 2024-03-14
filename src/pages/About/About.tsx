import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/listProduct";
import { RootState } from "@/redux/store";

const About = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.listProducts.products);
    //     switch (status) {
    //         case "loading":
    //             return <div>Loading...</div>;
    //         case "succeeded":
    //             return <ul></ul>;
    //         case "failed":
    //             return <div>Opps...</div>;
    //         default:
    //             break;
    //     }
    // };

    console.log(products);

    return (
        <>
            <h1>About Page</h1>
            <button onClick={() => dispatch(fetchProducts())}>Fetch</button>
        </>
    );
};

export default About;
