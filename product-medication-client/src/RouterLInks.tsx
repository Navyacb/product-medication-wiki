import { Route, Routes } from "react-router-dom"
import { SearchBar } from "./components/SearchBar"

export const RouterLinks = (props: any)=>{

    return (
        <Routes>
            <Route path="/" element={<SearchBar/>} />
        </Routes>
    )
}