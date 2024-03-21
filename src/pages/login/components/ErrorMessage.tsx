import { XCircle } from "react-feather"
import './ErrorMessage.css'

export type ErrorMessageProps = {
    message:string
}
export function ErrorMessage({message}:ErrorMessageProps){
    return (
        <div className="error-message">
            <span className="error-icon"><XCircle role="error-icon" size={14}/></span>
            {message}</div>
    )
}