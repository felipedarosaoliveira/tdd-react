import { describe,test,expect,vi} from "vitest";
import{fireEvent, render,screen} from '@testing-library/react';
import { InputText } from "./InputText";


describe('Login InputText',()=>{


    test('LoginInputText must render the label',async()=>{

        const label = 'Email address';
        render(<InputText label={label} value=""/>);
        const el = await screen.getByText(label);
        expect(el).toBeInTheDocument()
    })

    test('LoginInputText must render the placeholder',async()=>{

        const label = 'Email address';
        const placeholder = 'Digite seu email aqui';
        render(<InputText label={label} placeholder={placeholder} value=""/>);
        const el = await screen.getByPlaceholderText(placeholder);
        expect(el).toBeInTheDocument()
    })

    test('LoginInputText must render the value',async()=>{

        const label = 'Email address';
        const placeholder = 'Digite seu email aqui';
        const value = "john@test.com";
        render(<InputText label={label} placeholder={placeholder} value={value}/>);
        const el = await screen.getByDisplayValue(value);
        expect(el).toBeInTheDocument()
    })

    test('LoginInputText must notify about the changes into your value',async()=>{

        const label = 'Email address';
        const placeholder = 'Digite seu email aqui';
        const value = "john@test.com";
        const  changeHandlerMock = vi.fn();
        render(<InputText label={label} placeholder={placeholder} value={value}  onInputChange={changeHandlerMock}/>);
        const el = await screen.getByDisplayValue(value);
        expect(el).toBeInTheDocument()
        fireEvent.change(el,{target:{value:"marie@test.com"}})
        expect(changeHandlerMock).toBeCalledWith({value:"marie@test.com"})
    })
})