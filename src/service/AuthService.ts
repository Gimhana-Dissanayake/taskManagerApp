import axios from "axios";

class AuthService {


    
    setUpAxiosInterceptors(user:any){

        let username = "Gim";
        let password = "gim";
    
        let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    

        axios.interceptors.request.use((config) =>{
            if(user && config.headers){
                config.headers.authorization = basicAuthHeader
            }
            return config
        })
    }

}

export default new AuthService();