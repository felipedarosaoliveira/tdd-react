import './InputText.css';

export type onInputChangeValue = {

    value:string
}

export type InputTextProps = {
    label:string
    value:string
    placeholder?:string
    onInputChange?:(value:onInputChangeValue)=>void
}

export function InputText({label, placeholder="", value, onInputChange}:InputTextProps){
    function onChange(event:any){
        const {value} = event.target;
        onInputChange && onInputChange({value})
    }
    placeholder = placeholder || "";
    value = value || "";
    return(
        <div className='login-input-text'>
            <label>{label}</label>
            <input placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    )
}