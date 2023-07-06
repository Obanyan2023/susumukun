import { axios } from "../../../lib/axios";

export const read = () => {
    axios
        .get("/api/example")
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
};
