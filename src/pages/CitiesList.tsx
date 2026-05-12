const CitiesList = () => {
  const cities: any[] = [];
  if (cities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">No cities found</h2>
        <p className="text-gray-400">Try adding some cities to your list.</p>
      </div>
    );
  }
  return (
    <ul>
      {cities.map((city) => (
        <li key={city.id}>{city.name}</li>
      ))}
    </ul>
  );    
};

export default CitiesList;
