import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import NavbarMenu from '../components/layout/NavbarMenu'

const ProtectedRoute = ({ children }) => {
    const {
        authState: { authLoading, isAuthenticated }
    } = useContext(AuthContext)

    if (isAuthenticated) {
        return (
            <>
                <NavbarMenu />
                {children}
            </>
        )
    }

    return (
        <Navigate to='/login' replace />
    )
}

export default ProtectedRoute