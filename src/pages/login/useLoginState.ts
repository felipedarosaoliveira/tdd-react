import { useState } from "react"
import { onPasswordChangeValue } from "./components/input-password/InputPassword"
import { onInputChangeValue } from "./components/input-text/InputText"
import { Service } from "./service/login-service"



export type LoginInitialProps = {
    service: Service,
    navigateTo: any
}

export interface LoginState  {
    username: string,
    password: string,
    loading: boolean,
    showPassword: boolean
    errorMessage: string | null
    onSetUsernameHandler: (event: onInputChangeValue) => void
    onSetPasswordHandler: (event: onPasswordChangeValue) => void
    onAuthenticateHandler: () => Promise<void>
    onChangePasswordHandler: () => void
    onTogglePasswordIcon: (value: boolean) => void
}

export function useLoginState({ service, navigateTo }: LoginInitialProps): LoginState {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    async function onAuthenticateHandler() {

        setLoading(true);
        try {
            const { status, data } = await service.authenticate({ username, password });
            if (status == 'SUCCESS') {
                navigateTo('/home');
            } else {
                setErrorMessage(data.message)

            }
        } finally {
            setLoading(false);
        }



    }
    function onSetUsernameHandler(event: onInputChangeValue) {
        if (errorMessage) {
            setErrorMessage(null);
        }
        setUsername(event.value)
    }
    function onSetPasswordHandler(event: onPasswordChangeValue) {
        if (errorMessage) {
            setErrorMessage(null);
        }
        setPassword(event.value)
    }
    function onChangePasswordHandler() {
        navigateTo('/changePassword');
    }

    function onTogglePasswordIcon(value: boolean) {
        setShowPassword(value);
    }

    return {
        username,
        password,
        loading,
        errorMessage,
        showPassword,
        onSetUsernameHandler,
        onSetPasswordHandler,
        onAuthenticateHandler,
        onChangePasswordHandler,
        onTogglePasswordIcon
    };

}