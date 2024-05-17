import React, { useState, useEffect, useRef } from 'react';
import { MdArrowBack } from 'react-icons/md';

function ShowFullDataModal2({ isShowUserDataModale, closeModal, userData, itemtype }) {
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    const [modalStyle, setModalStyle] = useState({
        display: 'none', // Initially hide the modal
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        maxHeight: '100vh',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    useEffect(() => {
        if (isShowUserDataModale) {
            setModalStyle({ ...modalStyle, display: 'flex' });
        } else {
            setModalStyle({ ...modalStyle, display: 'none' });
        }
    }, [isShowUserDataModale]);

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {isShowUserDataModale && (
                  <div className='pop'>
                  <div className='popMainvid'  ref={modalRef} >
                    <div className='popHeadervid'>
                    <MdArrowBack onClick={() => closeModal()} size={20} />
                   <h5 className="">Video</h5>
                    </div>
                    <div className='popContainervid'>
                                                      <iframe
                                                          title="Video Player"
                                                          width="800"
                                                          height="500"
                                                          src={userData}
                                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                          allowFullScreen
                                                      ></iframe>
                    </div>
                  </div>
              </div>
            )}
        </>
    );
}

export default ShowFullDataModal2;

// import React, { useState, useEffect } from 'react';
// import { MdArrowBack } from 'react-icons/md';

// function ShowFullDataModal2({ isShowUserDataModale, closeModal, userData , itemtype }) {
//     const [modalStyle, setModalStyle] = useState({
//         display: 'block',
//         backgroundColor: 'rgba(0, 0, 0, 0.65)',
//         maxHeight: '100vh', // Set max height to viewport height
//         overflowY: 'auto', // Make modal body scrollable if content exceeds viewport height
//         display: 'flex', // Set display to flex
//         alignItems: 'center', // Vertically center the content
//         justifyContent: 'center' // Horizontally center the content
//     });

//     useEffect(() => {
//         if (!isShowUserDataModale) {
//             setModalStyle({ ...modalStyle, display: 'none' });
//         } else {
//             setModalStyle({ ...modalStyle, display: 'flex' });
//         }
//     }, [isShowUserDataModale]);
   

//     return (
//         <>
//             {isShowUserDataModale && (
//                 <div onClick={() => closeModal()} className="  modal fade show" tabIndex="-1" style={modalStyle}>
//                     <div className="m-5" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <MdArrowBack onClick={() => closeModal()} size={20} />
//                                 <h5 className="modal-title">Data Details</h5>
//                             </div>
//                             <div className="modal-body h-500">
//                                 <div className="container">
//                                    <div className='allPageMainView'>
                                        
//                                         <div>
//                                             <iframe
//                                                 title="Video Player"
//                                                 width="560"
//                                                 height="315"
//                                                 src={userData}
//                                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                                 allowFullScreen
//                                             ></iframe>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default ShowFullDataModal2;
