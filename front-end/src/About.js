import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const About = () => {
  const [about, setAbout] = useState({})
  const [error, setError] = useState('')

  /**
   * A nested function that fetches about page from the back-end server.
   */
useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setAbout(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
  }, [])

  return (
    <>
      <h1>{about.name}</h1>
      <p>{about.description}</p>
      <img class="Profile-pic" src={about.url} alt="Edison Chen" />
    </>
  )
}

// make this component available to be imported into any other file
export default About
