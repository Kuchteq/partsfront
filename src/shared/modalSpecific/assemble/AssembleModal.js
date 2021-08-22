import React, { useState } from "react";

export default function AssembleModal() {
  let [preSelectedParts, setPreSelectedParts] = useContext(
    sahredState
  );
  
  let [computerState, setComputerState] = useState({
    motherboard: {
      id: 12,
      name: "Itel Core 9800K 7.1 GHz",
      price: 2600,
    },
    processor: {
      id: 14,
      name: "Core 9800K 7.1 GHz",
      price: 2600,
    },
  });

  const addPreSelected = () =>{
    "This function adds preselected parts from state and puts it in computer state"
  }

  let partNames = ["Płyta główna","Procesor"]

  const selectClick = (e) => {
    e.target;
    ("setComputerStateBased on that");
  };
  return (
    <UniModal>
      Główne komponenty
      {Object.keys(computerState).map((column, index) =>
      <PartField
        partName={partNames[index]}
        partQueryName={column}
        selectedPartInfo={computerState[column]}
        selectClick={selectClick}
      />)}

   
    </UniModal>
  );
}
