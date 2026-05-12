const CountriesList = ()=>{
    const countries:any[] =[];
    if(countries.length === 0){
        return (
            <div className="flex items-center justify-center h-full">
                <h2 className="text-2xl font-semibold text-gray-200">No countries found.</h2>
            </div>
        )
    }
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    ) 
}
export default CountriesList;