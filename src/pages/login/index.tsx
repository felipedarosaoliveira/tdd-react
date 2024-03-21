import { useNavigate } from "react-router-dom";
import { useLoginState } from "./useLoginState";
import {service} from './service/login-service';
import { LoginPage } from "./LoginPage";

export function Login(){
    const navigate = useNavigate();
    function navigateTo(path:string){
        navigate(path);
    }
    const state = useLoginState({navigateTo,service});

    return (
        <LoginPage {...state}/>
    )
}