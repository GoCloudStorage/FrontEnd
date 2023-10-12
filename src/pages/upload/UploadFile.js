import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../../store/user/UserSlice";
import {fileAPI} from "../../service/file/file";

//计算文件hash值
async function calculateHash(file){
    const buffer=await file.arrayBuffer();
    const crypto=window.crypto;
    const hashBuffer=await crypto.subtle.digest('SHA-256',buffer);

    const hashArray=Array.from(new Uint8Array(hashBuffer));
    const hashHex=hashArray.map(byte=>byte.toString(16).padStart(2,'0')).join('');
    return hashHex;

}

function UploadFile(){
    const [file,setFile]=useState(null);
    const [dataSrc, setDataSrc] = useState(null)
    const userState = useSelector(selectUser)
    const [fileHash,setFileHash]=useState(null);
    //获取文件
    const handleFileChange=(e)=>{
        const selectedFile=e.target.files[0];
        setFile(selectedFile);

    };

    useEffect(() => {
        if (file) {
            calculateHash(file).then((hash) => {
                setFileHash(hash); // 确保哈希值是一个字符串
            });
        }
    }, [file]);
    console.log("file hash:",fileHash)
    // 获取文件名和后缀
    const filename = file ? file.name : "No file selected";
    const fileExtension = filename.split('.').pop();
    const fileNameWithoutExt = filename.replace(`.${fileExtension}`, '');

    //获取文件链接
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (file){
            const formData=new FormData();
            formData.append('file_name',fileNameWithoutExt);
            formData.append('ext',fileExtension)
            formData.append('size',file?file.size:0)
            formData.append('path','/home/test')
            formData.append('hash',fileHash)

            fileAPI.preUploadFile(userState.token,formData)
                .then(response=>{
                    const {data,msg,status}=response;
                    if (status===200){
                        setDataSrc(data)
                    }else{
                        console.error("上传失败: ", msg);
                    }

                })

                .catch(error=>console.error('Error:',error));

        }

    }

    //根据链接上传文件
    useEffect(() => {
        if (dataSrc){
            console.log("数据:",dataSrc)

            //将文件分块
            const chunks=[];
            let offset=0;
            while (offset<file.size){
                const chunk=file.slice(offset,offset+dataSrc.chunk_size);
                chunks.push(chunk);
                offset+=dataSrc.chunk_size;
            }

            //上传每个分块
            const uploadChunks=async ()=>{
                for(let i=1;i<dataSrc.chunks_nums;i++){
                    const response=await fetch(dataSrc,{
                        method:'PUT',
                        headers:{
                            'OSS-Chunk-Number':i,
                            'Content-Range':"bytes ",
                            'OSS-Content-Length':1,
                            'OSS-Key':1
                        },
                        body:file.slice(offset,offset+dataSrc.chunks_size),
                    })
                }
            }
        }
    }, [dataSrc]);

    return(
        <div>
            <h2>upload file</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">Choose a file:</label>
                    <input type="file" id="file" onChange={handleFileChange} />
                </div>
                {/* 其他表单字段和按钮 */}
                <p>Selected File: {fileNameWithoutExt}</p>
                <p>Selected File ext: {fileExtension}</p>
                <p>Selected File size: {file?file.size:0}</p>
                <p>token:{userState?userState.token:"null token"}</p>
                <button type="submit" onClick={handleSubmit}>Upload</button>
            </form>
        </div>
    );
}

export default UploadFile;