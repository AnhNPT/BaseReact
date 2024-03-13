import { login, logout } from "@/redux/features/user";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const user = useSelector((state: any) => state.user.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Email: {user.email}</h1>
            <button
                onClick={() =>
                    dispatch(
                        login({
                            name: "asdcxv",
                            age: 12,
                            email: "asdfasdfsdf",
                        })
                    )
                }>
                Login
            </button>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
}
