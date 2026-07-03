import useFetchQuery from "../../../hooks/useFetchQuery"


export const useDashboard=()=>{
    return useFetchQuery("/admin/dashboard", ["dashboard"])
}
