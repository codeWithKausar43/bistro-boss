import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center md:w-4/12 mx-auto my-8'>
            <p className='text-yellow-700 mb-2'>--- {subHeading} ---</p>
            <h3 className='text-4xl uppercase border-y-2 py-4 '>{heading}</h3>
        </div>
    );
};

export default SectionTitle;