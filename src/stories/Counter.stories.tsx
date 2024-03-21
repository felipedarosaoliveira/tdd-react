
import type { Meta, StoryObj } from '@storybook/react';
import { Counter } from '../pages/counter/Counter';
import { useCounter } from '../pages/counter/useCounter';





  const ConterPage = ()=>{
    const repository = {
        findAll(){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve([{id:1,value:"João da silva"}])
                },3000)
            })
        }
    }
    const {count,data, increase,decrease, load} = useCounter(repository);
    return (
        <Counter count={count}  data={data} increase={increase} decrease={decrease} load={load}/>
    )
  }

  const meta = {
    title: 'Counter',
    component: ConterPage,

  } satisfies Meta<typeof ConterPage>;
  type Story = StoryObj<typeof meta>;
  
  export default meta;
  

  export const Primary: Story = {
    
  };
