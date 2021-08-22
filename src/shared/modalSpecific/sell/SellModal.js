import React from 'react'

export default function SellModal() {

    let [selectedParts, setSelectedParts] = useContext(sharedState)
    "once again call the get request for getting the fields data"
    const sellFunc = () =>{
        
    }
    const resetFunc = () =>{
        
    }

    return (
        <UniModal resetFunc = {resetFunc} mainFunc = {sellFunc}>
            <SearchField/>
            <TopPart/>
            <TableBody/>

            Wybrane do sprzedania
            {selectedParts.map((part)=><SellField piece = {part}/>)}
        </UniModal>
    )
}
