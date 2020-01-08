import React from "react"

class Carousel extends React.Component{

	state = {
		photos: [],
		active: 0
	}

	// special React method, must be static
	static getDerivedStateFromProps ({ media }) {

		// Placeholder if no media.length
		let photos = ['http://placecorgi.com/600/600']

		// Pulling out only the large option of the photo object. Now string
		if(media.length) {
			photos = media.map(({ large }) => large)
		}

		// Merge object into state
		return { photos }
	}

	// Use arrow functions when passing event listeners to children
	// Dataset.index is getting data-index
	handleIndexClick = event => {
		this.setState({
			active: +event.target.dataset.index // the plus coerces str to int
		})
	}

	render() {
		const {photos, active} = this.state

		return (
			<div className="carousel">
				<img src={photos[active]} alt="animal" />
				<div className="carousel-smaller">
					{photos.map((photo, index) => (
						<img
							key={photo}
							onClick={this.handleIndexClick}
							data-index={index}
							src={photo}
							className={index === active ? "active": ""}
							alt="animal thumbnail"
						/>
					))}
				</div>
			</div>
		)

	}
}

export default Carousel

