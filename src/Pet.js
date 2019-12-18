import React from "react";

export default function Pet({ name, animal, breed, media, location, id}) {

	let hero = 'http://placecorgi.com/300/300'

	if(media.length){
		hero = media[0].small
	}

    return (
        <div>
        	<img src={hero} />
            <a href={`/details/${id}`}>{name}</a>
            <h2>{animal}</h2>
            <h3>{breed}</h3>
            <h4>{location}</h4>
        </div>
    )
}
