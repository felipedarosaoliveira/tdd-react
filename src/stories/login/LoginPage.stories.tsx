import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from '../../pages/login/LoginPage';
import { Service ,Credential,AuthenticationResult} from '../../pages/login/service/login-service';
import { LoginInitialProps, useLoginState } from '../../pages/login/useLoginState';


const LoginPageWrapper = ({navigateTo,service}:LoginInitialProps)=>{
    
    const state = useLoginState({navigateTo,service});
    return (
        <LoginPage {...state} />
    )
  }


const meta = {
    title: 'Login/LoginPage',
    component: LoginPageWrapper,

  } satisfies Meta<typeof LoginPageWrapper>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  const serviceSuccess:Service = {
    async authenticate(credential:Credential):Promise<AuthenticationResult>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve( {
                    status:'SUCCESS',
                    data:{token:"blablabla"}
                })
            },3000)
        })
    }
}

const serviceError:Service = {
    async authenticate(credential:Credential):Promise<AuthenticationResult>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve( {
                    status:'NO_CREDENTIAL',
                    data:{message:"Login ou senha não informado"}
                })
            },3000)
        })
    }
}
function navigateTo(path:string){
    alert(`Navegar para ${path}`);
}
  
  export const Primary: Story = {
    args:{
        navigateTo,
        service:serviceSuccess
    }
  };

  export const Secundary: Story = {
    args:{
        navigateTo,
        service:serviceError
    }
  };