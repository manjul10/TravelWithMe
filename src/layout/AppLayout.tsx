import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader";
import Navbar from "../component/Navbar";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading"
    const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  return (
    <div>
        {isLoading && <Loader/>}
       {!isLoggedIn && <Navbar/>}
            <main>
                <Outlet/>
            </main>
    </div>
  )
}

export default AppLayout