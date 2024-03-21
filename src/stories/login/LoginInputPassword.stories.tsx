import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/InputPassword',
    component: Login.InputPassword,

  } satisfies Meta<typeof Login.InputPassword>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
        value: "",
        label: 'Password',
        placeholder: "Digite sua senha aqui",
    },
  };