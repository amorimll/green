import axios from "axios";

export const getTeste = () => axios.get("http://192.168.1.93:5000/teste")
export const postImagem = (data) => axios.post("http://192.168.1.93:5000/postImagem", data)