import {useState} from "React"

const contextName = React.createContext()
{
    let [openedProblemModal, setOpenedProblemModal] = useState(false)
    let [modifyProblemModal, setModifyProblemModal] = useState(false)
    let [selectedProblem, setSelectedProblem] = useState()
}