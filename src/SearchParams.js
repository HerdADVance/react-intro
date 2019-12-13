import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; // Parcel automatically loads this (cool)
import useDropdown from "./useDropdown";

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
            <form>
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
                {/*<label htmlFor="animal">
					Animal: 
					<select
						id="animal" 
						value={animal}
						onChange={e => setAnimal(e.target.value)}
						onBlur={e => setAnimal(e.target.value)} 
					>
						<option>All</option>
						{ANIMALS.map(animal => (
							<option 
								key={animal}
								value={animal}
							>
							{animal}
							</option>
						))}
					</select>	
				</label>
				<label htmlFor="breed">
					Breed:
					<select
						id="breed"
						value={breed}
						onChange={e => setBreed(e.target.value)}
						onBlur={e => setBreed(e.target.value)}
						disabled={breeds.length === 0}
					>
						<option>All</option>
						{breeds.map(breedString => (
							<option 
								key={breedString}
								value={breedString}
							>
							{breedString}
							</option>
						))}
					</select>
				</label>*/}
            </form>
        </div>
    );
};

export default SearchParams;
