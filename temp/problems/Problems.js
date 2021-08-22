import React from 'react'

export default function Problems() {

    const constructQuery = () =>{
        console.log("doing the search based on", resultsQuery)
    }
    const [labels,setLabels] = useState([{
        name:"Nazwa komputera",
        queryName:"computerName",
        shown:true,
        sortedBy:true,
        widthClass:"20w"
    },
    {
        name:"Problem",
        queryName:"product-model",
        shown:true,
        sortedBy:false,
        widthClass:"50w"
    },
    ])

    const [searchQuery,setSearchQuery] = useState("")
    const [resultsData,setResultsData] = useState(()=>constructQuery())
    
    let [openedProblemModal, setOpenedProblemModal] = useState(false)
    let [modifyProblemModal, setModifyProblemModal] = useState(false)
    let [selectedProblem, setSelectedProblem] = useState()

    "Results would look something like this"
    
    let results = [{
        name:"Krzysiu 3-1251641251",
        problem:"Prawdopodobnie coś tam się zepsuło",
        wlasciciel:"Krzysztof Kuchta",
        value:this.quantity*this.nettoPrice,
        dataOddania:Date,
        deadline:Data
    },
    {
        name:"Krzysiu 3-1251641251",
        problem:"Prawdopodobnie coś tam się zepsuło",
        wlasciciel:"Krzysztof Kuchta",
        value:this.quantity*this.nettoPrice,
        dataOddania:Date,
        deadline:Data
    }]
    const onCellDoubleClick = () =>{
        "get data from this cell, set the selectedProblem to this one and modifyProblemModal to true "
        setModifyProblemModal
    } 
    const onCellSingleClick = () =>{
        "get data from this cell, make it a selection"
        setModifyProblemModal
    } 
    return (
        <div>
            <AddProblemButton setOpenedProblemModal = {setOpenedProblemModal}/>
            <FinishProblemButton selectedProblem = {selectedProblem}/>
            <SearchField setSearchQuery = {setSearchQuery}/>
            <TableBody results = {results} labels = {labels} onCellSingleClick = {onCellSingleClick} onCellDoubleClick = {onCellDoubleClick}/>
            <AddProblemModal openedProblemModal = {openedProblemModal}/>
            <ModifyProblemModal selectedProblem = {selectedProblem} modifyProblemModal = {modifyProblemModal}/>
        </div>
    )
}
