import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../pages/login/components';

const meta = {
    title: 'Login/InputText',
    component: Login.InputText,

} satisfies Meta<typeof Login.InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: "",
        label: 'Email address',
        placeholder: "Digite seu email aqui"

    },
};