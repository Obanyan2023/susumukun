import { read } from "../api/read"
import { store } from "../api/store"

export const Layout = () => {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => read()}>Read data</button>
            <br />
            <button className="btn btn-primary" onClick={() => store()}>Store data</button>
        </div>
    )
}