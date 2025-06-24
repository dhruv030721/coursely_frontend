export const getToken = () => {
    const authToken = localStorage.getItem("authToken")
    const refreshToken = localStorage.getItem("refreshToken")
    return { authToken, refreshToken }
}