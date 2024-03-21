import './Title.css'

export type TitleProps = {
    content:string
}

export function Title({content}:TitleProps){
    return (
        <h1 className="login-title">{content}</h1>
    )
}