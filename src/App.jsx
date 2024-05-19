import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import getRandomNumber from "./utils/getRandomNumber";
import { LocationInfo } from "./components/LocationInfo";
import { ResidentCard } from "./components/ResidentCard";

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, hasError] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [locationId]);

  const inputId = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationId(inputId.current.value.trim());
  };

  return (
    <div>
      <div className="banner"></div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          ref={inputId}
          className="form__input"
          placeholder="Search from 1 to 126"
        />
        <button className="form__btn">Search</button>
      </form>

      {hasError ? (
        <h2>Enter a number between 1 and 126</h2>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className="card__container">
            {location?.residents.map((url) => (
              <ResidentCard url={url} key={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
