import { describe,test,expect} from "vitest";
import{render,screen} from '@testing-library/react';
import {Login} from "./index"

describe('LogginErrorMessage',()=>{

    test('LoginErrorMessage must display a message',async()=>{
        render(<Login.ErrorMessage message="Login or password is empty"/>);
        const el = await screen.getByText('Login or password is empty');
        expect(el).toBeInTheDocument();
    });

    test('LoginErrorMessage must display the error icon',async()=>{
        render(<Login.ErrorMessage message="Login or password is empty"/>);
        const el = await screen.getByRole('error-icon');
        expect(el).toBeInTheDocument();
    });
})