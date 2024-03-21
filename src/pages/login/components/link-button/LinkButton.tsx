import './LinkButton.css';

export type  LinkButtonProps =  {
    content:string
    onClick?:()=>void
}

export function LinkButton({content, onClick}:LinkButtonProps){
    return(
        <a onClick={onClick} className="login-link-button" role="link-button">{content}</a>
    )
}