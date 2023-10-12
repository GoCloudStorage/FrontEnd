import axios from "axios";
import config from "../../config";

const api = axios.create({
    baseURL: `${config.fileAPI}`,
    timeout: 5000,
})

export const fileAPI = {
    loadFile: async (token) => {
        try {
            const resp = await api.get("/", {headers: {'Authorization': token}})
            return resp.data
        } catch (err) {
            console.log("failed to get all file: ", err)
        }

    },
    downloadFile: async (token, fileID) => {
        try {
            const resp = await api.get(`/${fileID}`, {headers:{'Authorization': token}})
            return resp.data
        } catch (err) {
            console.log("failed to download file: ", err)
        }
    },
    preUploadFile:async (token,fileData)=>{
        try {
            const resp=await api.post('/',fileData,{headers:{'Authorization':token}})

            return resp.data
        }catch (err){
            console.log("failed to preUpload file:",err)
        }
    }
}
