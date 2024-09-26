import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5002/about')
      .then(response => setAboutData(response.data))
      .catch(error => console.error('Error fetching the About Us data:', error));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <div>
      <h1>About Us</h1>
      <p>{aboutData.bio}</p>
      <img src={aboutData.imageUrl} alt={aboutData.name} style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default About;
