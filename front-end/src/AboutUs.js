import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that shows the content of the about us page

 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutUs, setAboutUs] = useState({title: '', paragraphs: []})
  const [error, setError] = useState('')
  
  /**
  * A function that fetches the about us content from the back-end server.
  */
  const fetchAboutUs = () => {
    axios
    .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`)
    .then(response => {
        // axios bundles up all response data in response.data property
        setAboutUs(response.data)
    })
    .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
    })
  }
  useEffect(() => {
    fetchAboutUs()
  }, [])

  return (
    <>
      <h1>{aboutUs.title}</h1>
      <img src={aboutUs.image} alt="eastern bluebird"/>
      {aboutUs.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
