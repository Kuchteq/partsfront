import React from 'react'
import ComputerModal from './comps/computerModal/ComputerModal'

export default function Sets() {

    let [selectedItems, setSelectedItems] = useContext()
    let [computerModalData, setComputerModalData] = useState()

    const constructQuery = () =>{
        console.log("doing the search based on", labels, searchQuery)
    }
    const [labels,setLabels] = useState([{
        name:"Id",
        queryName:"id",
        shown:true,
        sortedBy:true,
        widthClass:"40w"
    },
    {
        name:"Nazwa komputera",
        queryName:"computerName",
        shown:true,
        sortedBy:false,
        widthClass:"20w"
    }
    ])

    const [searchQuery,setSearchQuery] = useState("")
    const [resultsData,setResultsData] = useState(()=>constructQuery())
    "Results would look something like this"
    
    let results = [{
        id:151,
        computerName:"ChadComputer",
        motherBoard:"Gigabyt1241",
        processor:"Kintel I5 6 generacji",
        ram:"16GB 444dr",
        value:1251,
        assembleDate:Date
    },
    {
        id:151,
        computerName:"ChadComputer",
        motherBoard:"Gigabyt1241",
        processor:"Kintel I5 6 generacji",
        ram:"16GB 444dr",
        value:1251,
        assembleDate:Date
    }]

    useEffect(()=>{
        constructQuery()
    }, [labels])

    useEffect(()=>{
        constructQuery()
    },[searchQuery])

    const onSingleClick = (e) =>
    {
        setSelectedParts(e)
    }

    const onDoubleClick = (e) =>
    {
        setComputerModalData({someData})
    }

    return (
        <>
            <AssembleComputerButton/>
            <DisassembleButton/>
            <ShowFields labels = {labels}/>
            <SearchField setSearchQuery = {setSearchQuery}/>

            <TableTopPart labels = {labels}/>
            <TableBody results = {resultsData} labels = {labels}/>
            {computerModalData && <ComputerModal data = {computerModalData}/>}
    </>
    )
}
