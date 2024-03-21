import { describe, expect, test, vi } from 'vitest'
import {render, screen,fireEvent} from '@testing-library/react';
import {InputPassword} from './InputPassword';

describe('LoginInputPassword',()=>{

    

    test('LoginInputPassword must display a label',()=>{
        render(<InputPassword value=""  label="Senha" placeholder="" />);
        const label:HTMLElement = screen.getByText('Senha');
        expect(label).toBeDefined()
        expect(label.innerHTML).toBe('Senha')
    })

    test('LoginInputPassword should display a placeholder',()=>{
        render(<InputPassword value="" label="Senha" placeholder="Digite sua senha" />);
        const input:HTMLInputElement = screen.getByPlaceholderText('Digite sua senha');
        expect(input).toBeDefined()
    })

    test('LoginInputPassword must be an icon to show the password',()=>{
        render(<InputPassword value="123456" name="password" label="Senha" placeholder="Digite sua senha" />);
        const icon:HTMLElement = screen.getByRole('input-password-icon');
        expect(icon).toBeDefined();
    })

    
    test('LoginInputPassword  when showPassword is false then toggleIcon must be fired with value equals true',()=>{
        const onToggleIcon = vi.fn();
        render(<InputPassword value="123456"  label="Senha"  showPassword={false} placeholder="Digite sua senha" onToggleIcon={onToggleIcon}/>);
        const icon:HTMLElement = screen.getByRole('input-password-icon');
        expect(icon).toBeDefined();
        fireEvent.click(icon);
        expect(onToggleIcon).toBeCalledWith(true);
    })

    test('LoginInputPassword  when showPassword is true then toggleIcon must be fired with value equals false',()=>{
        const onToggleIcon = vi.fn();
        render(<InputPassword value="123456" name="password" label="Senha"  showPassword={true} placeholder="Digite sua senha" onToggleIcon={onToggleIcon}/>);
        const icon:HTMLElement = screen.getByRole('input-password-icon');
        expect(icon).toBeDefined();
        fireEvent.click(icon);
        expect(onToggleIcon).toBeCalledWith(false);
    })

    test('LoginInputPassword  must notify changes on type text',()=>{
        const onChangeHandler = vi.fn();
        const onToggleIcon = vi.fn();
        render(<InputPassword value="123456" name="password" label="Senha"  showPassword={true} placeholder="Digite sua senha" onPasswordChange={onChangeHandler} onToggleIcon={onToggleIcon}/>);
        const input:HTMLInputElement = screen.getByRole('input-password');
        expect(input).toBeDefined();
        fireEvent.change(input,{target: {value: '321456'}});
        expect(onChangeHandler).toBeCalledWith({value:"321456"});
    })



})