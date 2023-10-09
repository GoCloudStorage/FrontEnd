import axios from "axios";
import config from "../../config";

const api = axios.create({
    baseURL: `${config.userAPI}`,
    timeout: 5000,
})


export const userAPI = {
    login: async (phone, password) => {
        try {
            const resp = await api.post("/login", {
                phone_number: phone,
                pass_word: password,
            })
            return resp.data
        } catch (err) {
            console.log("Failed to login: ", err)
            throw err
        }
    }
}
