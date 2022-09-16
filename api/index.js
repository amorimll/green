import axios from "axios";

const testeUrl = "http://localhost:5000/teste"

export const getTeste = () => axios.get("http://192.168.1.93:5000/teste")