import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/listProduct";
import { AppDispatch, RootState } from "@/redux/store";

const About = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {productResponse} = useSelector((state: RootState) => state.listProducts);

    console.log(productResponse?.products);

    return (
        <>
            <h1>About Page</h1>
            <button onClick={() => dispatch(fetchProducts())}>Fetch</button>
            <ul>
                {productResponse.products.map((item) => (
                     <li>{item.title}</li>
                ))}
                
            </ul>
        </>
    );
};

export default About;
