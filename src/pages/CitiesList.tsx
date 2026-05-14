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
    return <p className="text-white text-center">Loading list...</p>;

  if (cities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">No cities found</h2>
        <p className="text-gray-400">Try adding some cities to your list.</p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {cities.map((city) => (
        <li key={city.id}>
          <Link
           to={`/app/city/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
            className="bg-[#42484d] border-l-4 border-[#ffb545] p-3 rounded flex
      items-center justify-between hover:bg-[#4d5359] transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{city.emoji}</span>
              <span className="font-semibold">{city.cityName}</span>
            </div>
            <div className="flex items-center gap-4">
              <time className="text-xs text-gray-400">
                {new Date(city.dateVisited).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <button
                onClick={(e) => handleDelete(e, city.id)}
                className="bg-black/20 hover:bg-red-900/40 w-6 h-6 rounded-full
      text-xs transition-colors"
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
