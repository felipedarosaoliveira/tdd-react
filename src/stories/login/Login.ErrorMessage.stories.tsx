import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/ErrorMessage',
    component: Login.ErrorMessage,

  } satisfies Meta<typeof Login.ErrorMessage>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
      message: 'Login inválido',
    },
  };