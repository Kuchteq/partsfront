import React from 'react'

export default function PartField({partName, partQueryName, selectedPartInfo, selectClick}) {

    "Here there will be a query built based on stuff"
    const constructQuery = () =>{
        console.log("doing the search based on", resultsData)
    }

    const [resultsData,setResultsData] = useState(()=>constructQuery())
    "Results would look something like this"

    const [labels,setLabels] = useState([{
        name:"Segment",
        queryName:"segment",
        shown:true,
        sortedBy:true,
        widthClass:"40w"
    },
    {
        name:"Nazwa/model produktu",
        queryName:"product-model",
        shown:true,
        sortedBy:false,
        widthClass:"20w"
    }
    ])

    return (
        <div>
            <div>{computerState[partQueryName].name} Here will be parts info like płyta główna model, price</div>
            <TableBody result = {resultsData} labels = {labels} onSingleClick = {selectClick}/>
        </div>
    )
}
