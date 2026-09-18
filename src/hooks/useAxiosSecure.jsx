import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react"

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth()
    useEffect(() => {
        // set token in the header for all the api call using AxiosSecure hook
        const requestInterceptor = instance.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })

        // response interceptor
        instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403){
                signOutUser()
                .then(()=>{
                    // navigate user to login page
                })
            }
         })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
        }
    }, [user, signOutUser])

    return instance
}

export default useAxiosSecure 