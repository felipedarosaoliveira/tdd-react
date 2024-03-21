
import { Loader } from "react-feather";
import { Login } from "./components";
import { LoginState } from "./useLoginState";
import './LoginPage.css';


export function LoginPage({
    errorMessage,
    username,
    password,
    showPassword,
    loading,
    onSetUsernameHandler,
    onSetPasswordHandler,
    onTogglePasswordIcon,
    onChangePasswordHandler,
    onAuthenticateHandler
}:LoginState){

    return (
        <div className="login-page">
            <div className="login-error-container">
            {errorMessage &&<Login.ErrorMessage message={errorMessage} />}
            </div>
            <Login.Title content="Sign in to your account"/>
            <div className="login-page__panel">
                <Login.InputText
                 label="Email address"
                 placeholder="Digite seu email aqui"
                 value={username}
                 onInputChange={onSetUsernameHandler}
                />
                <Login.InputPassword 
                    label="Password"
                    value={password}
                    showPassword={showPassword}
                    placeholder="Digite sua senha aqui"
                    onToggleIcon={onTogglePasswordIcon}
                    onPasswordChange={onSetPasswordHandler}
                />
                <div className="login-page__actions">
                    <Login.LinkButton 
                     onClick={onChangePasswordHandler}
                     content="Forgot password?"
                    />
                    <Login.Button
                     content="Sign in"
                     disabled={loading}
                     onClick={onAuthenticateHandler}
                    />
                    {loading && <Loader className="loader"/>}
                </div>

            </div>
        </div>
    )
}