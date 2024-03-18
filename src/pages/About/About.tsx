import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/listProduct";
import { AppDispatch, RootState } from "@/redux/store";

const About = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.listProducts.products);

    console.log(products);

    return (
        <>
            <h1>About Page</h1>
            <button onClick={() => dispatch(fetchProducts())}>Fetch</button>
        </>
    );
};

export default About;
