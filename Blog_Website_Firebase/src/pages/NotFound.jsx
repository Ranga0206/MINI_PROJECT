import React from 'react'
import Heading from '../components/Heading'
import { Link } from 'react-router-dom'
import Button from '../components/Button'


const NotFound = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
            <div>
                <Heading headingText="404" text="Page Not Found" />
                <p className='text-slate-500 mb-8'>

                    The page you are looking for doesn't exit or has been moved.</p>
                <Link to="/" >
                    <Button text="Go Back Home" />
                </Link>
            </div>
        </div>
    )
}

export default NotFound