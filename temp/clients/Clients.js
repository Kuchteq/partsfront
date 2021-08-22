import React from 'react'

export default function Clients() {

    let [selectedClients, setSelectedClients]  = useState()
    let [clientModalData, setClientModalData] = useState()
    let [addClientsModal, setAddClientsModal] = useState()

    const constructQuery = () =>{
        console.log("doing the search based on", labels, searchQuery)
    }
    const [labels,setLabels] = useState([{
        name:"id",
        queryName:"id",
        shown:true,
        sortedBy:true,
        widthClass:"10w"
    },
    {
        name:"Nazwa klienta",
        queryName:"name",
        shown:true,
        sortedBy:false,
        widthClass:"20w"
    }
    ])

    const [searchQuery,setSearchQuery] = useState("")
    const [resultsData,setResultsData] = useState(()=>constructQuery())
    "Results would look something like this"
    
    let results = [
        {
            name:"ABC company",
            latestPurchase:"Something",
            amountOfPurchases:421,
            purchasesValue:12515,
            lastPurchase:Date
        },
        {
            name:"ABC company",
            latestPurchase:"Something",
            amountOfPurchases:421,
            purchasesValue:12515,
            lastPurchase:Date
        }
    ]

    useEffect(()=>{
        constructQuery()
    }, [labels])

    useEffect(()=>{
        constructQuery()
    },[searchQuery])

    const onSingleClick = (e) =>
    {
        setSelectedItems(e)
    }

    const onDoubleClick = (e) =>
    {
        setClientModalData({someData})
    }


    return (
        <div>
            <AddClientButton setOpen = {setAddClientsModal}/>
            <DeleteClientButton/>
            <SearchField setSearchQuery = {setSearchQuery}/>
            <TableTopPart labels = {labels}/>
            <TableBody resutls = {resultsData} labels = {labels}/>
            {clientModalData && <ClientDetailsModal data = {clientModalData}/>}
        </div>
    )
}
