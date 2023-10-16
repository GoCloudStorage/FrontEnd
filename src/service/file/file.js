import axios, {toFormData} from "axios";
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
    },
    updateFile:async (token,fileId,storageId,fileName,ext,path,isPrivate)=>{
        const formData=new FormData();
        formData.append('file_id',fileId)
        formData.append('ext',ext)
        formData.append('path',path)
        formData.append('is_private',isPrivate)
        formData.append('storage_id',storageId)
        try{
            const resp=await api.post(`/update`,formData,{headers:{'Authorization':token}})
            return resp.data
        }catch (err){
            console.log("failed to updateFile:",err)
        }
    }
}
