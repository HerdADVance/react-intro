import React from "react";
import Pet from "@frontendmasters/pet"
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'

class Details extends React.Component{ // all class components must have render method
	

	// constructor(props){
	// 	super(props)

	// 	this.state = {
	// 		loading: true
	// 	}
	// }

	// Commented out above is old way. This is brand new JS, needs Babel for the time being
	state = { loading: true }

	componentDidMount(){
		// throw new Error("lol") // throwing this error to illustrate ErrorBoundary
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
		const {name, animal, location, description, media, breed} = this.state

		return(
			<div>
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					<p>{description}</p>
					<button>Adopt {name}</button>
				</div>
			</div>
		)
	}

}

// Only use the ... when passing through
export default function DetailsWithErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	)
}