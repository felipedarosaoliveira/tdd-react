import { Eye, EyeOff } from "react-feather"
import './InputPassword.css'

export type onPasswordChangeValue = {

    value: string
}

export type InputPasswordProps = {
    label: string
    value: string
    placeholder?: string
    showPassword?: boolean
    onPasswordChange?: (value: onPasswordChangeValue) => void
    onToggleIcon?: (value: boolean) => void
}

export function InputPassword({ label, placeholder, value, showPassword, onToggleIcon, onPasswordChange }: InputPasswordProps) {
    showPassword == !!showPassword;
    const inputType = showPassword ? "value" : "password";

    function onChange(event: any) {
        const { value } = event.target;
        onPasswordChange && onPasswordChange({ value });
    }

    function onToggle() {
        onToggleIcon && onToggleIcon(!showPassword)
    }
    return (
        <div className="login-input-password">
            <label>{label}</label>
            <input type={inputType} placeholder={placeholder} value={value} onChange={onChange} role="input-password" />
            <span className="login-input-password__icon">
                {showPassword ?
                    (<Eye onClick={onToggle} role="input-password-icon" size={12} />) :
                    (<EyeOff onClick={onToggle} role="input-password-icon" size={12} />)
                }
            </span>
        </div>

    )

}