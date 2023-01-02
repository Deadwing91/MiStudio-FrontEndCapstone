import { Repairs } from "./components/Repairs"
import { createRoot } from "react-dom/client"
import 'bootstrap/dist/css/bootstrap.css'
import "./index.css"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Repairs />
    </BrowserRouter>
)