import { describe, expect, test, vi } from 'vitest'
import {render, screen,fireEvent} from '@testing-library/react';
import { LinkButton } from './LinkButton';

describe('LoginLinkButton',()=>{

    test('LoginLinkButton must render the content',async()=>{
        const content = "Forgot password?";
        render(<LinkButton content={content}/>);
        const el = screen.getByRole('link-button');
        expect(el).toBeInTheDocument();
    });

    test('LoginLinkButton must notify when click has fired',async()=>{
        const content = "Forgot password?";
        const onClickHandlerMock = vi.fn();
        render(<LinkButton content={content} onClick={onClickHandlerMock}/>);
        const el = screen.getByRole('link-button');
        expect(el).toBeInTheDocument();
        fireEvent.click(el);
        expect(onClickHandlerMock).toBeCalled();
    })
})