import { useState } from "react"

export default function DemoArray(){

    const [cityArray,setCityArray] = useState([])
    const [city, setCity] = useState()


    const handlebtn=(e)=>{
        setCityArray((values)=>[...values,city])
        setCity('')
    }

    return(
        <div>
            <form>
                <input type="text"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="Enter City Name"
                />

                <input type="button" onClick={handlebtn} value="OK"/>
            </form>

            <ol>
                {cityArray.map((c)=>(
                    <li>{c}</li>
                ))}
                
            </ol>
        </div>
        
    )
}