import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/listProduct";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";

const About = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const dispatch = useDispatch<AppDispatch>();
    const { productResponse, isLoading, totalResultCount } = useSelector((state: RootState) => state.listProducts);

    // page 1 = limit =10 skip 0
    // page 2 = skip 10 limit = 10
    // page x = skip = (X - 1 ) * limit

    const handleNextPage = () => {
        setPage(page + 1);
    };
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const totalPageCount = useMemo(() => {
        return Math.ceil(totalResultCount / limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productResponse?.products]);

    useEffect(() => {
        dispatch(fetchProducts({ limit, page }));
    }, [limit, page, dispatch]);

    console.log(totalPageCount);

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
                <button style={{ cursor: "pointer" }} disabled={page > totalPageCount - 1} onClick={() => handleNextPage()}>
                    Next Page
                </button>
            </div>
        </>
    );
};

export default About;
