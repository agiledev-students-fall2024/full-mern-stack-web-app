import { useState, useEffect } from 'react'
import './AboutUs.css'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
    
    const aboutUs = fetch('/about-us')
    .then(response => {
        console.log(response)
        console.log("returning response.json()")
        return response.json()
    })
    .then(data => {console.log('response.json() returned'); return data})

    return (
    <>
      <h1>{aboutUs.title} </h1>
      <img src={aboutUs.image} alt="me"/>
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
