
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { MdArrowBack } from 'react-icons/md';

function ShowFullDataModal({ isShowUserDataModale, closeModal, userData }) {
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    const [modalStyle, setModalStyle] = useState({
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        maxHeight: '100vh', // Set max height to viewport height
        overflowY: 'auto', // Make modal body scrollable if content exceeds viewport height
        display: 'flex', // Set display to flex
        alignItems: 'center', // Vertically center the content
        justifyContent: 'center' // Horizontally center the content
    });

    useEffect(() => {
        if (!isShowUserDataModale) {
            setModalStyle({ ...modalStyle, display: 'none' });
        } else {
            setModalStyle({ ...modalStyle, display: 'flex' });
        }
    }, [isShowUserDataModale]);
    console.log("userData",userData);
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const formattedData = convertData(userData);
        setFormattedData(formattedData);
    }, [userData]);

    const convertData = (userData) => {
        const formattedData = [];
        for (const key in userData) {
            if (userData.hasOwnProperty(key) && key !== 'Admin'&& key !== '_id' && key !== 'Pm' && key !== 'Company' && key !== 'CreatedById' && key !== 'CompanyId' && key !== 'password' && key !== 'createdAt' && key !== '__v') {
                const value = userData[key];
                if (Array.isArray(value)) {
                    formattedData.push({ key, value: value.join(', ') });
                } else if (typeof value === 'object') {
                    formattedData.push({ key, value: convertNestedObject(value) });
                } else {
                    formattedData.push({ key, value });
                }
            }
        }
        return formattedData;
    };

    const convertNestedObject = (obj) => {
        const nestedData = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                nestedData.push(<><strong>{key.charAt(0).toUpperCase() + key.slice(1)} : </strong> {obj[key]}<br /></>);
            }
        }
        return nestedData;
    };

 useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

console.log(formattedData);
    return (
        <>

              {isShowUserDataModale && (
                <div className='pop'>
                    <div className='popMain' ref={modalRef}>
                      <div className='popHeader'>
                      <MdArrowBack onClick={() => closeModal()} size={20} />
                     <h5 className="">Company Details</h5>
                      </div>
                      <div className='popContainer'>
                      {formattedData.map((item, index) => (
                                        <div className="row mb-2" key={index}>
                                            <div className="col-5">
                                                <strong>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}:</strong>
                                            </div>
                                        <div className='col-7'> {item.value.length === 0 ? "data not available" : item.value !== true || false ? item.value : item.value === false? "active": " inactive" }</div>

                                        </div>
                                    ))}
                      </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowFullDataModal;
