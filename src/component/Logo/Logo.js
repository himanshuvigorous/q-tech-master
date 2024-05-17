import { useState } from 'react';

const Logo = ({ width, height }) => {
   

    

    return (
        <div className="d-flex align-items-center">
            <div 
                className={`rounded-circle d-flex justify-content-center align-items-center`} 
                style={{ width: width, height: height, cursor: 'pointer', backgroundColor:"rgb(25, 47, 59)"  }} 
               
            >
                <h3 style={{ fontSize: width }}  className="text-white m-0">Q</h3>
            </div>
            <h3 style={{ color: "rgb(25, 47, 59)" }}  className="ml-2 mb-0">Tech</h3>
        </div>
    );
};

export default Logo;
