import { axios } from "../../../lib/axios";

export const store = () => {
    axios
        .post("/api/example")
        .then((response) => console.log("OK"))
        .catch((error) => console.log(error));
};
