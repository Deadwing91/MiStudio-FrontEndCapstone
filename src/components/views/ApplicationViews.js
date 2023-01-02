import { Outlet, Route, Routes } from "react-router-dom"
import { DrumAdd } from "../DrumRoom/DrumAddForm"
import { DrumContainer } from "../DrumRoom/DrumContainer"
import { DrumRoomEquipmentForm } from "../DrumRoom/DrumRoomEditForm"
import { GuitarAdd } from "../GuitarRoom/GuitarRoomAddForm"
import { GuitarRoomContainer } from "../GuitarRoom/GuitarRoomContainer"
import { GuitarRoomEquipmentForm } from "../GuitarRoom/GuitarRoomEditForm"
import { MicrophoneAdd } from "../MicLocker/MicAddForm"
import { MicContainer } from "../MicLocker/MicContainer"
import { EquipmentForm } from "../MicLocker/MicEditForm"
import { Studio } from "../Studio/Studio"
import { SynthAdd } from "../SynthRoom/SynthAddForm"
import { SynthContainer } from "../SynthRoom/SynthContainer"
import { SynthEquipmentForm } from "../SynthRoom/SynthEdit"
import { NoteContainer } from "../tickets/TicketContainer"
import { NoteEditForm } from "../tickets/TicketEdit"
import { NewNote } from "../tickets/TicketForm"

/*export const ApplicationViews = () => {
	return <>
		<h1 className="title--main">MiStudio</h1>
	</>
}*/

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   

                    <Outlet />
                </>
            }>
                <Route path="studio" element={ <Studio />} />
              	<Route path="guitarRoom" element={ <GuitarRoomContainer />} />
                <Route path="guitars/edit/:guitarId" element={ <GuitarRoomEquipmentForm />} />
                <Route path="guitarRoom/guitars/add" element={ <GuitarAdd />} />
				<Route path="drumRoom" element={ <DrumContainer/>} />
                <Route path="drums/edit/:drumId" element={ <DrumRoomEquipmentForm />} />
                <Route path="drumRoom/drums/add" element={ <DrumAdd />} />
				<Route path="micLocker" element={ <MicContainer />} />
                <Route path="microphones/edit/:micId" element={ <EquipmentForm />} />
                <Route path="micLocker/microphones/add" element={ <MicrophoneAdd />} />
				<Route path="synthRoom" element={ <SynthContainer />} />
                <Route path="synths/edit/:synthId" element={ <SynthEquipmentForm />} />
                <Route path="synthRoom/synths/add" element={ <SynthAdd />} />
                <Route path="tasks" element={ <NoteContainer />} />
                <Route path="tasks/tasks/add" element={ <NewNote />} />
                <Route path="notes/edit/:noteId" element={ <NoteEditForm />} />

               
                
				
               
              
            </Route>
        </Routes>
    )
}