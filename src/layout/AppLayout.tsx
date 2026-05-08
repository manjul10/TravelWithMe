import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader";
import Navbar from "../component/Navbar";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading"
  return (
    <div>
        {isLoading && <Loader/>}
        <Navbar/>
            <main>
                <Outlet/>
            </main>
    </div>
  )
}

export default AppLayout