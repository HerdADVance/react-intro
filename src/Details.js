import React from "react";
import Pet from "@frontendmasters/pet"
import { navigate } from '@reach/router'
import Modal from './Modal'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import ThemeContext from './ThemeContext'

class Details extends React.Component{ // all class components must have render method
	

	// constructor(props){
	// 	super(props)

	// 	this.state = {
	// 		loading: true
	// 	}
	// }

	// Commented out above is old way. This is brand new JS, needs Babel for the time being
	state = { loading: true, showModal: false }

	componentDidMount(){
		// throw new Error("lol") // throwing this error to illustrate ErrorBoundary
		Pet.animal(this.props.id).then(({ animal }) => {
			this.setState({
				url: animal.url,
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

	toggleModal = () => this.setState({ showModal: !this.state.showModal })

	adopt = () => navigate(this.state.url) // Navigate and Redirect both work well, matter of preference

	render(){
		if(this.state.loading){
			return <h1>Loading...</h1>
		}
		const {name, animal, location, description, media, showModal, breed, url} = this.state

		return(
			<div>
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					<p>{description}</p>
					
					{showModal ? (
						<Modal>
							<h1>Would you like to adopt {name}?</h1>
							<div className="buttons">
								<button onClick={this.adopt}>Yes</button>
								<button onClick={this.toggleModal}>No, I am a monster</button>
							</div>
						</Modal>
					) : null}
					
					<ThemeContext.Consumer>
						{(themeHook) => (<button onClick={this.toggleModal} style={{backgroundColor:themeHook[0]}}>Adopt {name}!</button>)}
					</ThemeContext.Consumer>
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