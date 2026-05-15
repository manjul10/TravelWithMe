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

const BASE_URL = "https://nominatim.openstreetmap.org/reverse";
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
    if (!lat && !lng) return;

    const fetchCityName = async () => {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError(null);

        const res = await fetch(
          `${BASE_URL}?format=json&lat=${lat}&lon=${lng}&accept-language=en`,
        );

        if (!res.ok) {
          throw new Error(
            "Could not reach the location service. Please try again later.",
          );
        }

        const data = await res.json();

        // Broaden the check: Nominatim uses many keys for "locality"
        const locationName = 
          data.address.city || 
          data.address.town || 
          data.address.village || 
          data.address.suburb || 
          data.address.hamlet || 
          data.address.municipality ||
          "";

        if (!data.address || (!locationName && !data.address.country)) {
          throw new Error("That doesn't seem to be a city. Click somewhere else! 😉");
        }

        const cityName = locationName || data.display_name.split(',')[0];
        const countryName = data.address.country || "";
        const countryCode = data.address.country_code || "";

        setCityName(cityName);
        setCountry(countryName);
        setEmoji(convertToEmoji(countryCode));
      } catch (err: any) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };
    fetchCityName();
  }, [lat, lng]);

  if (isLoadingGeoCoding)
    return (
      <div className="flex flex-col items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-gray-400 text-sm">Identifying location...</p>
      </div>
    );

  if (geoCodingError)
    return (
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
        <p className="text-red-600 text-sm font-medium">{geoCodingError}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 text-xs font-bold text-red-700 underline uppercase tracking-widest"
        >
          &larr; Go Back
        </button>
      </div>
    );

  if (!lat && !lng)
    return (
      <div className="p-10 text-center bg-purple-50 rounded-2xl border border-purple-100">
        <p className="text-purple-700 text-sm font-medium">
          Click on the map to start your journey!
        </p>
      </div>
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
    <form onSubmit={handleSubmit} className="bg-white p-2 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          City Name
        </label>
        <div className="relative group">
          <input
            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl filter grayscale group-focus-within:grayscale-0 transition-all">
            {emoji}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          When did you visit?
        </label>
        <DatePicker
          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          onChange={(date: Date | null) => setDateVisited(date || new Date())}
          selected={dateVisited}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          Notes & Memories
        </label>
        <textarea
          rows={3}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What made this place special?"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 px-4 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] px-4 py-3 bg-purple-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-purple-100 hover:bg-purple-700 active:scale-[0.98] transition-all"
        >
          Save Journey
        </button>
      </div>
    </form>
  );
};

export default Form;
