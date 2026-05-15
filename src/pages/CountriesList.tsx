import { useAppSelector } from "../hooks/hooks";

const CountriesList = ()=>{

const {cities, isLoading} = useAppSelector(state => state.cities);

if (isLoading) return <p className="text-gray-400 text-center py-10">Loading Countries...</p>;




  if(cities.length === 0){
        return (
          <div className="flex flex-col items-center justify-center h-full py-20 px-4 text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No countries yet</h2>
            <p className="text-gray-400 text-sm">Explore the world and pin your favorite spots!</p>
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
      <ul className="grid grid-cols-2 gap-3 p-1">
       {countries.map((country)=>{
        return (
          <li key={country.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex
       flex-col items-center gap-2 hover:border-purple-200 hover:shadow-md transition-all group">
            <span className="text-3xl bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl mb-1 group-hover:scale-110 transition-transform">{country.emoji}</span>
            <span className="font-bold text-gray-700 text-sm group-hover:text-purple-700 transition-colors">{country.country}</span>
          </li>
        )
       })}
      </ul>
    ) 
}
export default CountriesList;