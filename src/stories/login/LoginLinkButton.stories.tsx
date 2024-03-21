import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/LinkButton',
    component: Login.LinkButton,

  } satisfies Meta<typeof Login.LinkButton>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
      content: 'Forgot password?',
      onClick:()=>alert("Evento capturado")
    },
  };