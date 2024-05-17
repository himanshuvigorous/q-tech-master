import { useState } from 'react';
import { useParams } from 'react-router-dom';
function CasinoPlayer({vid}) {
    // const [videoUrl, setVideoUrl] = useState('https://stream.1ex99.in/casinoVideo/video?id=3033');
    // const vid = useParams()
    // console.log("vid" ,vid)
      
      return (
        <div className='allPageMainView'>
          <h2>Video Frame</h2>
            <div>
              <iframe
                title="Video Player"
                width="560"
                height="315"
                src={'https://stream.1ex99.in/casinoVideo/video?id=3033'}

    
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
         
        </div>
      )
}

export default CasinoPlayer
