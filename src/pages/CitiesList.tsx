import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { deleteCity } from "../redux/citiesSlice";

const CitiesList = () => {
  const { cities, isLoading } = useAppSelector((state) => state.cities);
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteCity(id));
  };

  if (isLoading)
    return <p className="text-gray-400 text-center py-10">Loading list...</p>;

  if (cities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 px-4 text-center">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
           </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Start your journey!</h2>
        <p className="text-gray-400 text-sm">Add your first city by clicking on the map.</p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-2 p-1">
      {cities.map((city) => (
        <li key={city.id}>
          <Link
           to={`/app/city/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
            className="bg-white border border-gray-100 p-3 rounded-xl flex
      items-center justify-between hover:border-purple-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-lg">{city.emoji}</span>
              <span className="font-bold text-gray-700 group-hover:text-purple-700 transition-colors">{city.cityName}</span>
            </div>
            <div className="flex items-center gap-4">
              <time className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                {new Date(city.dateVisited).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <button
                onClick={(e) => handleDelete(e, city.id)}
                className="text-gray-300 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg
      text-lg transition-all flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;
