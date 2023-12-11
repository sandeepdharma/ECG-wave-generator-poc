import axios from "axios";
const dataUrl = "http://localhost:3000/AnnotatedECG";

export const _getEcgData = () => {
    return axios.get(dataUrl)
}