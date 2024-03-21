import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/Title',
    component: Login.Title,

  } satisfies Meta<typeof Login.Title>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
      content: 'Sign in to your account',
    },
  };