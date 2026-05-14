import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCity } from "../redux/citiesSlice";
const City = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCity, isLoading } = useAppSelector((state) => state.cities);

  useEffect(() => {
    if (id) dispatch(getCity(id));
  }, [id, dispatch]);

  if (isLoading || !currentCity)
    return <p className="text-white text-center">Loading city...</p>;
  const { cityName, emoji, dateVisited, notes } = currentCity;

  return (
    <div className="bg-[#42484d] p-6 rounded-lg text-white flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h6 className="uppercase text-[10px] font-bold text-gray-400">
          City name
        </h6>
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="uppercase text-[10px] font-bold text-gray-400">
          You went to {cityName} on
        </h6>
        <p className="text-lg">
          {new Date(dateVisited).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {notes && (
        <div className="flex flex-col gap-1">
          <h6 className="uppercase text-[10px] font-bold text-gray-400">
            Your notes
          </h6>
          <p className="italic text-gray-200">{notes}</p>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h6 className="uppercase text-[10px] font-bold text-gray-400">
          Learn more
        </h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className="text-[#ffb545] underline text-sm"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 border border-gray-500 rounded hover:bg-gray-600
      transition-colors self-start"
      >
        &larr; Back
      </button>
    </div>
  );
};

export default City;
