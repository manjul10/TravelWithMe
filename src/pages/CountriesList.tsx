import { useAppSelector } from "../hooks/hooks";

const CountriesList = ()=>{

const {cities, isLoading} = useAppSelector(state => state.cities);

if (isLoading) return <p className="text-white text-center">Loading Country...</p>;




  if(cities.length === 0){
        return (
            <div className="flex items-center justify-center h-full">
                <h2 className="text-2xl font-semibold text-gray-200">No countries found.</h2>
            </div>
        )
    }

const countries = cities.reduce((arr:any[], city)=>{
  if(!arr.map((el)=>el.country).includes(city.country)){
    return [...arr, {country: city.country, id: city.id, emoji: city.emoji}]
  }else{
    return arr;
  }
},[])

    return (
      <ul className="grid grid-cols-2 gap-3">
       {countries.map((country)=>{
        return (
          <li key={country.id} className="bg-[#42484d] border-l-4 border-[#ffb545] p-3 rounded flex
       items-center justify-between hover:bg-[#4d5359] transition-all">
        <span className="text-xl">{country.emoji}</span>
            <span className="font-semibold">{country.country}</span>
          </li>
        )
       })}
      </ul>
    ) 
}
export default CountriesList;