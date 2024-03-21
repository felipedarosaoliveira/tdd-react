import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/Button',
    component: Login.Button,

  } satisfies Meta<typeof Login.Button>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
      content: 'Sign in',
      onClick:()=>alert("Sign in pressed")
    },
  };