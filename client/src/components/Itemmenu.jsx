import React from 'react'
import { Link } from 'react-router-dom';

export const Itemmenu = ({ mode }) => {
    return (
        <>
            <hr className={`h-px my-2 bg-white-200 border-0 dark:bg-gray-700`}></hr >
            <ul className='flex ml-20 list-none gap-20'>
                <li> <Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>Khariya</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>mongfali</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>chana</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>chana</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>chana</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>tuver</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>sukla</Link></li>
                <li><Link className={`text-xl mr-10 ${mode === 'dark' ? 'text-white' : ''} `} to={'/'}>kadiyawadi</Link></li>
            </ul>
            <hr className="h-px my-2 bg-white-200 border-0 dark:bg-gray-700"></hr>
        </>

    )
}
