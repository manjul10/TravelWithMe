import Map from "./Map";
import Sidebar from "./Sidebar";

const MainContainer = () => {
  return (
    <div className="flex h-[98vh] p-2 overflow-hidden">
      <div className="w-1/3">
        <Sidebar />
      </div>
        <div className="flex-1 relative">
          <Map />
        </div>
    </div>
  );
};

export default MainContainer;
