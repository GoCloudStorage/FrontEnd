import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/user/UserSlice";
import {fileAPI} from "../../service/file/file";
import {Button, Table} from "antd"

function Space() {
    const userState = useSelector(selectUser)
    const [dataSrc, setDataSrc] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: "文件名",
            dataIndex: 'filename',
            key: 'filename',
        },
        {
            title: "创建时间",
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
        },
        {
            title: '下载',
            key: 'download',
            render: (_, record) => {
                return <Button onClick={() => {
                    fileAPI.downloadFile(userState.token, record.ID).then(data=>{
                        console.log(data.data.url)
                        window.open(data.data.url)
                    }).catch(err => {
                        console.log(err)
                    })
                }}>
                    下载
                </Button>
            }
        }
    ]
    useEffect(() => {
        fileAPI.loadFile(userState.token).then(data => {
            setDataSrc(data.data.map(item => {
                console.log(item)
                return {
                    ID: item.ID,
                    filename: item.file_name + "." +item.ext,
                    UpdatedAt: item.UpdatedAt
                }
            }))
        }).catch(err=> {
            console.log(err)
        })
    }, [userState.token]);

    return (
        <div>
            <div>username:  {userState.username}</div>
            <div>email:  {userState.email}</div>
            <div>phone:  {userState.phone}</div>
            <Table dataSource={dataSrc} columns={columns}></Table>
        </div>

    );
}

export default Space
