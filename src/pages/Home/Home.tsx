/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export default function Home() {
    const [userName, setUserName] = useState<string>("");

    return (
        <div>
            <h1>Username: </h1>
            <input type="text" onChange={(e) => setUserName(e.target.value)} name="" id="" />
            <br />
            <button>Login</button>
            <br />
        </div>
    );
}
