export type CounterProps = {
    count: number,
    increase:()=>void,
    decrease:()=>void
    load:()=>void
    data:any[]
}
export function Counter({count,data,increase,decrease,load}:CounterProps){

    return (
        <div>
        <p>{count}</p>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
        <div>
            <button onClick={load}>Carregar</button>
            <ul>
            {data.map((item)=><li key={item.id}>{item.value}</li>)}
            </ul>
        </div>
        </div>
    )
}