import React from 'react'

export default function ProblemModal() {
    "Displays the fields like computer id add date and the problem and adds it by simple post"
    let [openedProblemModal, setOpenedProblemModal] = useState(false)
    
    return (
        openedProblemModal && 
            <UniModal>

        </UniModal>
    )
}
