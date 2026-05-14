import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createCity } from "../redux/citiesSlice";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const Form = () => {
  const dispatch = useAppDispatch();
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [dateVisited, setDateVisited] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState<string | null>(null);

useEffect(() => {
  if(!lat || !lng) return;

  const fetchCityName = async () => {
try{
  setIsLoadingGeoCoding(true);
  setGeoCodingError(null);

const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`);

const data = await res.json();


console.log(data);
if(!data.countryCode){
  setGeoCodingError("That doesn't seem to be a city. Click somewhere else!😉");
  return;
}
setCityName(data.city || data.locality || "");
setCountry(data.countryName || "");
setEmoji(convertToEmoji(data.countryCode));
}catch(err){
  setGeoCodingError("An error occurred while fetching city name");
} finally {
  setIsLoadingGeoCoding(false);
}

}
fetchCityName();
},[lat,lng]);


  if (isLoadingGeoCoding)
    return <p className="text-white text-center">Loading city info...</p>;
  if (geoCodingError)
    return (
      <p
        className="text-red-400
       text-center"
      >
        {geoCodingError}
      </p>
    );
  if (!lat && !lng)
    return (
      <p className="text-white text-center">Click on the map to get started!</p>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newCity = {
      cityName,
      country,
      dateVisited: dateVisited.toISOString(),
      notes,
      emoji,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };
    await dispatch(createCity(newCity));
    navigate("/app/cities");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#42484d] p-6 rounded-lg flex flex-col gap-4 text-white "
    >
      <div className="flex flex-col gap-1">
        <label className="font-semibold">City Name</label>
        <div className="relative">
          <input
            className="p-2 rounded bg-gray-700 border-none w-full"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <span className="absolute right-3 top-2 text-xl">{emoji}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">When did you go to {cityName}?</label>
        <DatePicker
          className="p-2 rounded bg-gray-700 border-none w-full"
          onChange={(date: Date | null) => setDateVisited(date || new Date())}
          selected={dateVisited}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold">Notes about {cityName}</label>
        <textarea
          className="p-2 rounded bg-gray-700 border-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-500 rounded"
        >
          &larr; Back
        </button>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-[#ffb545] text-black font-bold rounded"
      >
        Add City
      </button>
    </form>
  );
};

export default Form;
