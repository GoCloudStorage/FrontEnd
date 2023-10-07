import React from "react";
import axios from "axios";
import config from "../config";

function Space() {
    function initData() {
        instance = axios.create({
            baseURL: `${config.fileAPI}/`
            headers: {
                'Authorization': ""
            }
        })
    }
    return (
        <div>
            Space
        </div>
    );
}

export default Space