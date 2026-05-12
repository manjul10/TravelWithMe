import { useSearchParams } from "react-router-dom"

export const useUrlPosition = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return [parseFloat(lat || "0"), parseFloat(lng || "0")] as const;
}