import { useState } from "react"
import { BsPlusCircleFill , BsDashCircleFill } from "react-icons/bs";

function ItemModifier ({item , defaultLot}) {
    const [amount , setAmount] = useState(defaultLot)
    return (
        <div className="input-group">
            <span className="input-group-text">
                {item}
            </span>
            <input className="form-control" type="number" value={amount} name={`inputSer${item.replace(/\s/g,'')}`} onChange={e=>e}/>
            <button 
                className="btn btn-outline-secondary restar-1 d-flex align-items-center" 
                onClick={e=> setAmount(amount-1)} 
                type="button"
                >
                <BsDashCircleFill />
            </button>
            <button                         
                className="btn btn-outline-secondary sumar-1 d-flex align-items-center" 
                onClick={e=> setAmount(amount+1)} 
                type="button">
                <BsPlusCircleFill />
            </button>
        </div>

    )
}

export default ItemModifier