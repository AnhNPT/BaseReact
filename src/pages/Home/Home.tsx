const Home = () => {
    const dummyApi = () => {
        fetch("https://dummyjson.com/products/1")
            .then((res) => res.json())
            .then((json) => console.log(json));
    };
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => dummyApi()}>Get</button>
        </div>
    );
};

export default Home;
