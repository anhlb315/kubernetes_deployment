import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components";
import { Home, Login, Register } from "../pages";

export function Router() {
    return (
        <div className="routes-container">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Navigate replace to={ROUTE.ROOT} />} />

                <Route
                    exact
                    path={ROUTE.ROOT}
                    element={<Navigate replace to={`${ROUTE.ROOT}/profile`} />} />

                <Route
                    path={`${ROUTE.ROOT}/*`}
                    element={<RequireAuth>
                        <Home />
                    </RequireAuth>} />

                <Route
                    exact
                    path={ROUTE.LOGIN}
                    element={<Login />} />

                <Route
                    exact
                    path={ROUTE.REGISTER}
                    element={<Register />} />
            </Routes>
        </div>)
}

export const ROUTE = {
    ROOT: '/home',
    REGISTER: '/register',
    LOGIN: '/login',
    TEST: '/test'
}
