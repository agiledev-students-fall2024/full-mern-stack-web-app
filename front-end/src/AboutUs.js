// *Template from App.JS

// import './AboutUs.css'

// const AboutUs = props => { // Used template from APP.js
//   return (
//     <>
//       <h1>About Me!</h1>
//       <p>i will put my about me here</p>
//       <p>More stuff here</p>
//     </>
//   )
// }
// export default AboutUs;








// import React, { useEffect, useState } from 'react';
// import './AboutUs.css';

// const AboutUs = () => {
//   const [aboutData, setAboutData] = useState({ title: '', content: '' });

//   useEffect(() => {
//     // Fetch the data from the backend
//     fetch('/api/about')
//       .then(response => response.json())
//       .then(data => setAboutData(data))
//       .catch(error => console.error('Error fetching about data:', error));
//   }, []);

//   return (
//     <>
//       <h1>{aboutData.title}</h1>
//       <p>{aboutData.content}</p>
//     </>
//   );
// };

// export default AboutUs;








// import React, { useEffect, useState } from 'react';
// import './AboutUs.css';

// const AboutUs = () => {
//   const [aboutData, setAboutData] = useState({ title: '', content: '' });

//   useEffect(() => {
//     // Fetch the data from the backend
//     fetch('http://localhost:7003/AboutUs')  // Make sure the URL is correct
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setAboutData(data))
//       .catch(error => console.error('Error fetching about data:', error));
//   }, []);

//   return (
//     <>
//       <h1>{aboutData.title}</h1>
//       <p>{aboutData.content}</p>
//     </>
//   );
// };

// export default AboutUs;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutUs.css';

const AboutUs = () => {
  const [aboutData, setAboutData] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    axios.get('http://localhost:7003/api/about')
      .then(response => {
        setAboutData(response.data);
      })
      .catch(error => {
        console.error('Error fetching about data:', error);
        setAboutData({
            title: 'About Me',
            content: "Hi, my name is Mohamed. I am a Sophomore majoring in Mathematics and Data Science. I am from the\n United Arab Emirates (UAE), specifically in the city of Abu Dhabi. One of my favorite things about\n my major is solving math problems, with coffee, while listening to a genre of my choice. It hits\n the right spot! In my free time, I love to hike. This is a picture of me at the Blue Mountains in \nAustralia, while taking a semester at NYU Sydney. I highly reccomend it!",
            image: 'http://localhost:7003/photo.jpg'
          });
      });
  }, []);


  const MultiLineContent = aboutData.content.split('\n').map((line, index) => (
    <p key={index}>{line}</p>


  ));

  return (
    <>
      <h1>{aboutData.title}</h1>
      <p className="Multiline-Content">{MultiLineContent}</p>
      <p>              </p>
      {aboutData.image && <img src={aboutData.image} alt="About Us" style={{ width: '378px', height: '504px', marginTop: '30px' }} />}

    </>
  );
};

export default AboutUs;






