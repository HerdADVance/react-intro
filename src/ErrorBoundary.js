import React from 'react' 
import { Link, Redirect } from '@reach/router'

class ErrorBoundary extends React.Component {
	state = {hasError: false, redirect: false}
	
	static getDerivedStateFromError () {
		return {hasError: true}
	}

	componentDidCatch(error, info) {
		console.error("ErrorBoundary caught an error: ", error, info)
	}

	// runs if getting new state or props
	componentDidUpdate() {
		if(this.state.hasError) {
			setTimeout(() => this.setState({redirect: true}), 3000)
		}
	}

	render() {
		if(this.state.redirect) {
			return <Redirect to="/" />
		}
		if(this.state.hasError) {
			return (
				<h1>
					There was an error with this listing. <Link to="/">Click here</Link> 
					{" "}
					to go back or wait 3 seconds.
				</h1>
			)
		}

		// Allows pass through if no error because render must return something
		return this.props.children
	}
}

export default ErrorBoundary