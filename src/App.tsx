import { PublicRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            {PublicRoutes.map((item, index) => {
                const Page = item.component;
                return <Route key={index} path={item.path} element={<Page></Page>} />;
            })}
        </Routes>
    );
}

export default App;
