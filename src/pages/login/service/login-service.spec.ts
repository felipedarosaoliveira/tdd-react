import { describe,test,expect, afterEach, afterAll} from "vitest";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {service} from './login-service';

describe('LoginService',()=>{

    const server = setupServer();

    afterEach(()=>{
        server.resetHandlers();
    })

    afterAll(()=>{
        server.close();
    })

    test('LoginService must indicate the authentication success and return the userToken',async()=>{
        server.use(http.post('/api/authenticate',()=>{
            return  HttpResponse.json({token:"blablabla"})
               }
         ))
         server.listen();

         const result = await service.authenticate({username:"john",password:"123456"});
         expect(result.status).toBe("SUCCESS");
         expect(result.data).toEqual({token:"blablabla"});
    })

    test('LoginService must indicate the authentication fail with not authorized status when send invalid credential',async()=>{
        server.use(http.post('/api/authenticate',()=>{
            return  new HttpResponse('NOT AUTHORIZED', {
                 status: 401,
                 headers: {
                   'Content-Type': 'text/plain',
                 },
               })
         }))
         server.listen();

         const result = await service.authenticate({username:"john",password:"654321"});
         expect(result.status).toBe("NOT_AUTHORIZED");
         expect(result.data).toEqual({message:"Login ou senha inválido."});
    })

    test('LoginService must indicate the authentication fail with credential expired status',async()=>{
        server.use(http.post('/api/authenticate',()=>{
            return  new HttpResponse(JSON.stringify({userId:"123456789"}), {
                 status: 470,

                 headers: {
                   'Content-Type': 'application/json',
                 },
               })
         }))
         server.listen();

         const result = await service.authenticate({username:"john",password:"123456"});
         expect(result.status).toBe("REDENTIAL_EXPIRED");
         expect(result.data).toEqual({userId:"123456789"})
    })

    test('LoginService must indicate the authentication fail with server error',async()=>{
        server.use(http.post('/api/authenticate',()=>{
            return  new HttpResponse('INTERNAL SERVER ERROR', {
                 status: 503,
                 headers: {
                   'Content-Type': 'text/plain',
                 },
               })
         }))
         server.listen();

         const result = await service.authenticate({username:"john",password:"654321"});
         expect(result.status).toBe("SERVER_ERROR");
         expect(result.data).toEqual({message:"Estamos com uma instabilidade no nosso servicor. Por favor tente mais tarde."});
    })

    test("LoginService must indicate that credential values can't  be empty",async()=>{
        server.use(http.post('/api/authenticate',()=>{
            return  HttpResponse.json({token:"blablabla"})
               }
         ))
         server.listen();

         let result = await service.authenticate({username:"",password:""});
         expect(result.status).toBe("NO_CREDENTIAL");
         expect(result.data).toEqual({message:"Login ou senha não informado."});

         result = await service.authenticate({username:"    ",password:"   "});
         expect(result.status).toBe("NO_CREDENTIAL");
         expect(result.data).toEqual({message:"Login ou senha não informado."});

         result = await service.authenticate({username:"",password:"123456"});
         expect(result.status).toBe("NO_CREDENTIAL");
         expect(result.data).toEqual({message:"Login ou senha não informado."});

         result = await service.authenticate({username:"John",password:""});
         expect(result.status).toBe("NO_CREDENTIAL");
         expect(result.data).toEqual({message:"Login ou senha não informado."});
    })
})