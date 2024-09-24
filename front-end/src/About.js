import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */


const About = props => {
    const [aboutMe, setAboutMe] = useState("")
    const [pic, setPic] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [feedback, setFeedback] = useState('')
    
    /**
     * A nested function that fetches messages from the back-end server.
     */
    const fetchData = () => {
        // setMessages([])
        // setLoaded(false)
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
        .then(response => {
            // axios bundles up all response data in response.data property
            const text = response.data.text
            setAboutMe(text)
            const image = response.data.image
            setPic(image)
        })
        .catch(err => {
            const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
            setError(errMsg)
        })
        .finally(() => {
            // the response has been received, so remove the loading icon
            setLoaded(true)
        })
    }
    // set up loading data from server when the component first loads
    useEffect(() => {
        fetchData()
    }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Me!</h1>
      <p>{aboutMe}</p>
      <img src={pic} alt="pic not found" width="200" height="200"></img>
    </>
  )
}

// make this component available to be imported into any other file
export default About