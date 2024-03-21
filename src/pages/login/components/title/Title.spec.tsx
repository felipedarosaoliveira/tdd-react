import { describe,test,expect} from "vitest";
import{render,screen} from '@testing-library/react';
import { Title } from "./Title";


describe('Login Title',()=>{


    test('LoginTitle must render the title content',async()=>{

        const content = 'Sign in to your account';
        render(<Title content={content}/>);
        const el = await screen.getByRole('heading');
        expect(el).toBeInTheDocument()
        expect(el.innerHTML).toBe(content);
    })
})