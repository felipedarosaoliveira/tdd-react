import { describe, expect, test, vi } from 'vitest'
import {render, screen,fireEvent} from '@testing-library/react';
import { Button } from './Button';

describe('LoginButton',()=>{

    test('LoginButton must render the content',async()=>{
        const content = "Forgot password?";
        render(<Button content={content}/>);
        const el = screen.getByRole('login-button');
        expect(el).toBeInTheDocument();
    });

    test('LoginButton must notify when click has fired',async()=>{
        const content = "Forgot password?";
        const onClickHandlerMock = vi.fn();
        render(<Button content={content} onClick={onClickHandlerMock}/>);
        const el = screen.getByRole('login-button');
        expect(el).toBeInTheDocument();
        fireEvent.click(el);
        expect(onClickHandlerMock).toBeCalled();
    })

    test('LoginButton must not fire click event when disable is true',async()=>{
        const content = "Forgot password?";
        const onClickHandlerMock = vi.fn();
        render(<Button content={content} onClick={onClickHandlerMock} disabled/>);
        const el = screen.getByRole('login-button');
        expect(el).toBeInTheDocument();
        fireEvent.click(el);
        expect(onClickHandlerMock).not.toBeCalled();
    })
})