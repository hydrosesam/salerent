'use client'

interface RadioProps {
    id:string,
  
    items:{value: string, label: string}[],
    value: string | null,
    onChange: (value:string) =>void,
}


const RadioGroup :React.FC<RadioProps> =({
    id,

    items,
    value,
    onChange
}) =>{
    return(<div className="flex flex-row font-semibold gap-10">
    {items.map(item=>(
        <div 
       
        
        
        
        key={item.value}>
            <input
          
            type="radio"
            value={item.value}
            id= {id}
            checked={value===item.value}
            onChange={e=>onChange(e.target.value)}
            
            /> <label htmlFor={name+item.value}>{item.value}</label>


        </div>



    ))}
    
    
    
    </div>)



}

export default RadioGroup;