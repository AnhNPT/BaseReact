import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/listProduct";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const About = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const dispatch = useDispatch<AppDispatch>();
    const { productResponse, isLoading } = useSelector((state: RootState) => state.listProducts);

    const handleNextPage = () => {
        setPage(page + 1);
    };
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    console.log(limit - 1);

    useEffect(() => {
        dispatch(fetchProducts({ limit, page }));
    }, [limit, page, dispatch]);

    return (
        <>
            <h1>About Page</h1>
            {isLoading === true ? (
                <div>Loading......</div>
            ) : (
                <ul>
                    {productResponse?.products.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button style={{ cursor: "pointer" }} disabled={page === 1} onClick={() => handlePrevPage()}>
                    Previous Page
                </button>
                <button style={{ cursor: "pointer" }} disabled={productResponse?.products?.length < limit - 1} onClick={() => handleNextPage()}>
                    Next Page
                </button>
            </div>
        </>
    );
};

export default About;
