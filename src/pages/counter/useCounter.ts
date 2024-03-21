import { useState } from "react";


export function useCounter(repository:any){
    const [count,setCount] = useState<number>(0);
    const [data,setData] = useState<any[]>([])

    function increase(){
        setCount((val)=>{
            return val+1;
        })
    }

    function decrease(){
        setCount((val)=>{
            return val-1;
        })
    }

    function load(){
        repository.findAll().then((data:any[])=>{
            setData(data)
        })
    }

    return {
        count,
        data,
        increase,
        decrease,
        load
    }
}