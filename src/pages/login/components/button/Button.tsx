import './Button.css';

export type ButtonProps ={
    content:string
    disabled?:boolean
    onClick?:()=>void
}

export function Button({content,disabled,onClick}:ButtonProps){
    disabled = !!disabled;
    return (
        <button className="login-button" onClick={onClick} role="login-button" disabled={disabled}>{content}</button>
    )
}