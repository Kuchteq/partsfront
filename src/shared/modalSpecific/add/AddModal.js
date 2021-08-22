import React from 'react'

export default function AddModal() {

    const [addData, setAddData] = useState({
        segment:"",
        nazwaProduktu:"",
        ilosc:"",
        cena:"",
        dataZakupu:"",
        dostawca:"",
        krótkaNotka:"",
    })

    const addInventory = () =>{
        "here construct a request to a server where you post the data "
    }


    return (
        <div>
            
        </div>
    )
}
