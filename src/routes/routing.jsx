import { AboutPage } from "@pages/about.page"
import { HomePage } from "@pages/home.page"
import { Route, Routes } from "react-router-dom"

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    )
}