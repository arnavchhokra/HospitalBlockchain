import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Itemmenu } from '../components/Itemmenu';
import { Mainsection } from '../components/Mainsection';

export const HomePage = () => {
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark')
            document.body.style.backgroundColor = '#042743';
        }
        else {
            setMode('light')
            document.body.style.backgroundColor = 'white';
        }
    }
    return (
        <main>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <Itemmenu mode={mode} />
            <Mainsection mode={mode} />
        </main>
    )
}
