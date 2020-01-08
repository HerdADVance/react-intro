import React, { useEffect, useRef } from 'react'
import { createPortal  } from 'react-dom'

const Modal = ({ children }) => {
	
	const elRef = useRef(null) // useRef allows you to clean up markup to prevent memory leak

	if(!elRef.current) {
		const div = document.createElement('div')
		elRef.current = div
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal')
		modalRoot.appendChild(elRef.current)

		// Return is the cleanup function for useEffect. Will only run when modal root gets closed
		return () => modalRoot.removeChild(elRef.current)
		
	}, []) // The empty array here makes it only run once

	
	return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal