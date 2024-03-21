

export type StatusType = 'SUCCESS' | "NOT_AUTHORIZED" | "REDENTIAL_EXPIRED" | "NO_CREDENTIAL" | "SERVER_ERROR";
export type AuthenticationResult = {
    status: StatusType,
    data: any
}

export type Credential = {
    username: string,
    password: string
}

export interface Service {
    authenticate(credential: Credential): Promise<AuthenticationResult>
}

class LoginService implements Service {


    async authenticate(credential: Credential): Promise<AuthenticationResult> {
        if(!credential || isEmptyValue(credential.username) ||isEmptyValue(credential.password) ){
            return {
                status:"NO_CREDENTIAL",
                data:{message:"Login ou senha não informado."}
            }
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch('/api/authenticate', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credential)
        })
        let data: any = { message: "Login ou senha inválido." };
        let status: StatusType = "NOT_AUTHORIZED";
        switch (response.status) {
            case 200:
                data = await response.json();
                status = "SUCCESS";
                break;
            case 470:
                status = "REDENTIAL_EXPIRED";
                data = await response.json();
                break;
            case 503:
                status = "SERVER_ERROR";
                data = { message: "Estamos com uma instabilidade no nosso servicor. Por favor tente mais tarde." }
                break;
        }

        return {
            status,
            data
        }
    }
}


function isEmptyValue(value:string){
    return !value || value.trim().length === 0;
}
export const service = new LoginService();