import { Route, Routes } from "react-router-dom"
import { SearchBar } from "./components/SearchBar"
import { Header } from "./components/Header"
import { Login } from "./components/Login"

export const RouterLinks = ()=>{

    return (
        <Routes>
            <Route element={<Header/>}>
                <Route path="/" element={<SearchBar/>} />
                <Route path="/login" element={<Login/>} />
            </Route>
        </Routes>
    )
}