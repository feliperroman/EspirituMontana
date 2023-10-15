import axios from "axios";
export default class MakeRequestService {
    async getRequest(url) {
        // let token = localStorage.getItem("token");
        let response = await axios.get(url, {
            // headers: {
            //     token
            // }
        }).catch((error) => {
            return error
        });
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }
    }

    async getRequestA(url) {
        let token = localStorage.getItem("tkn");
        let response = await axios.get(url, {
            headers: {
                token: token
            }
        }).catch((error) => {
            return error
        });
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }
    }

    async getRequestQuery(url, params) {
        // let token = localStorage.getItem("token");
        let response = await axios.get(url, {
            // headers: {
            //     token
            // },
            params: {
                params
            }
        }).catch((error) => {
            return error
        });
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }
    }

    async postRequest(url, data) {
        // let token = localStorage.getItem("token");
        let response = await axios.post(url, data, {
            // headers: {
            //     token
            // },
            body: data,
        }).catch((error) => {
            return error
        })
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }

    }

    async postRequestA(url, data) {
        let token = localStorage.getItem("tkn");
        let response = await axios.post(url, data, {
            headers: {
                token: token
            },
            body: data,
        }).catch((error) => {
            return error
        })
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }

    }

    async postRequestFormData(url, data) {
        // let token = localStorage.getItem("token");
        let response = await axios.post(url, data, {
            headers: {
                // token,
                'Content-Type':'multipart/form-data',
            },
        }).catch((error) => {
            return error
        });
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }
    }

    async postRequestFormDataA(url, data) {
        console.log("🚀 ~ file: httpServices.js:108 ~ MakeRequestService ~ postRequestFormDataA ~ data:", data)
        let token = localStorage.getItem("tkn");
        let response = await axios.post(url, data, {
            headers: {
                token: token,
                'Content-Type':'multipart/form-data',
            },
        }).catch((error) => {
            return error
        });
        console.log("🚀 ~ file: httpServices.js:118 ~ MakeRequestService ~ postRequestFormDataA ~ response:", response)
        if (response.name == 'AxiosError') {
            return response
        } else {
            return response.data
        }
    }
    

    async putRequest(url, data) {
        await axios.put(url, data, {
            // headers: {
            //     token: token,
            // },
        }).then(response => {
            // Handle response

            console.log(response.data);
            return response.data;
        })
            .catch(err => {
                // Handle errors
                console.error(err);
                return err
            });
    }

    async deleteRequest(url) {
        await axios.delete(url, {
            // headers: {
            //     "Access-Control-Allow-Methods": "DELETE",
            //     "Content-Type": "application/json",
            //     token: token,
            // },
        }).then(response => {
            // Handle response

            console.log(response.data);
            return response.data;
        })
            .catch(err => {
                // Handle errors
                console.error(err);
                return err
            });
    }
}
