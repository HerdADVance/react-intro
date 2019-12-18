import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; // Parcel automatically loads this (cool)
import Results from "./Results";
import useDropdown from "./useDropdown";
import "babel-polyfill";

const SearchParams = () => {
    // This is a hook (new). All Hooks begin with "use" (useState/Effect/CallBack/Memo/etc...)
    // Hooks have mostly replaced setState
    // Hooks NEVER go inside of if statements, for loops, etc...
    // First param (location) is the current state
    // Second param (setLocation) is the updater function for the original state

    const [location, setLocation] = useState("Seattle, WA");
    // const [animal, setAnimal] = useState("cat")
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    // const [breed, setBreed] = useState("")
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds); //setBreed is coming from the 3rd param returned in useDropDown
    const [pets, setPets] = useState([]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        setPets(animals || []); // set pets to animals returned from API or empty array if error
    }

    // useEffect replaces componentDidMount componentWillMount componentDidUpdate
    // scheduled after render, both initial render and every other render
    useEffect(() => {
        // pet.breeds("dog").then(console.log, console.error) consoles API result or error if fail
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds: apiBreeds }) => {
            const breedStrings = apiBreeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds]); // useEffect will only run when any of these array of variables changes. Empty array will run once (useful for D3 integration), no arg will always update

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}
            >
                <label htmlFor="location">
                    Location:
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
