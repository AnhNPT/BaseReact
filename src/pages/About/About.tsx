/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const handleCurrentPage = (page: number) => {
        setPage(page);
        return page;
    };

    const totalPageCount = useMemo(() => {
        return Math.ceil(totalResultCount / limit);
    }, [productResponse?.products]);

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
                <div style={{ display: "flex", gap: "16px", minWidth: "210px", justifyContent: "center" }}>
                    {page >= 3 ? (
                        <span className="abc" onClick={() => handleCurrentPage(1)}>
                            {1}
                        </span>
                    ) : (
                        ""
                    )}
                    {page < 4 ? "" : <span>...</span>}
                    {page < 2 ? (
                        ""
                    ) : (
                        <>
                            <span className="sadasd" onClick={() => handleCurrentPage(page - 1)}>
                                {page - 1}
                            </span>
                        </>
                    )}

                    <span style={{ fontWeight: 700 }} onClick={() => handleCurrentPage(page)}>
                        {page}
                    </span>
                    {page === totalPageCount ? (
                        ""
                    ) : (
                        <>
                            <span onClick={() => handleCurrentPage(page + 1)}>{page + 1}</span>
                        </>
                    )}

                    {page > totalPageCount - 3 ? "" : <span>...</span>}
                    {page < totalPageCount - 1 ? (
                        <span className="kllk" onClick={() => handleCurrentPage(totalPageCount)}>
                            {totalPageCount}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <button style={{ cursor: "pointer" }} disabled={page > totalPageCount - 1} onClick={() => handleNextPage()}>
                    Next Page
                </button>
            </div>
        </>
    );
};

export default About;
