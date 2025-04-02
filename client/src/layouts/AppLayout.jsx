import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import { Outlet } from "react-router-dom"

function AppLayout() {

    return (
        <main>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </main>
    )
}

export default AppLayout;