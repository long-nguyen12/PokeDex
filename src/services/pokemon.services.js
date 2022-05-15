import axios from "axios";
import { BASE_URL } from "../constants/commons";

export function getPokemonList() {
    return axios
        .get(BASE_URL + "/pokemon/?limit=898")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return null;
        });
}
