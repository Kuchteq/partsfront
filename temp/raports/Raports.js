import React from 'react'

export default function Raports() {

    const constructQuery = () =>{
        console.log("doing the search based on", resultsQuery)
    }
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

    const [searchQuery,setSearchQuery] = useState("")
    const [resultsData,setResultsData] = useState(()=>constructQuery())
    "Results would look something like this"
    
    let results = [{
        segment:"Karta Graficzna",
        partName:"Gigabyt Płyta główna coś tam coś tam",
        quantity:6,
        nettoPrice:2600,
        value:this.quantity*this.nettoPrice,
        dataZakupu:Date,
        dostawca:"ks edmunt"
    },
    {
        segment:"Karta asfa",
        partName:"Gigabyt Płyta główna coś tam coś tam",
        quantity:6,
        nettoPrice:2600,
        value:this.quantity*this.nettoPrice,
        dataZakupu:Date,
        dostawca:"ks edmunt"
    }]
    
    return (
        <RaportDataProvider>
            <RaportButton/>
            <SearchField/>
            <TimeChoseButton/>
            <TopPart/>
            { resultsData.map((data)=>(<section>
                 <h1>{data.month + data.year}</h1>
                 <TableBody results = {data.sales}/>
                 </section>
            ))}
           <RaportModal/>

        </RaportDataProvider>
    )
}
