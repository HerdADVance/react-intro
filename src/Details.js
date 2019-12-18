import React from "react";
import Pet from "@frontendmasters/pet"

class Details extends React.Component{ // all class components must have render method
	
	constructor(props){
		super(props)

		this.state = {
			loading: true
		}
	}

	componentDidMount(){
		Pet.animal(this.props.id).then(({ animal }) => {
			this.setState({
				name: animal.name,
				animal: animal.type,
				location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
				description: animal.description,
				media: animal.photos,
				breed: animal.breeds.primary,
				loading: false
			})
		}, console.error)
	}

	render(){
		if(this.state.loading){
			return <h1>Loading...</h1>
		}
		const {name, animal, location, description, breed} = this.state

		return(
			<div>
				<h1>{name}</h1>
				<h2>{`${animal} - ${breed} - ${location}`}</h2>
				<p>{description}</p>
				<button>Adopt {name}</button>
			</div>
		)
	}

}

export default Details