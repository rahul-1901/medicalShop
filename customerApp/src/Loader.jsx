import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import webLogo from './assets/webLogo.png';

const Loader = ({ onLoadingComplete }) => {
    const [isDisappearing, setIsDisappearing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDisappearing(true);
            setTimeout(onLoadingComplete, 1000); 
        }, 2000);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div
            className={`fixed inset-0 bg-gradient-to-br from-green-600 to-green-500 flex z-1000 items-center justify-center
        ${isDisappearing ? 'animate-disappear' : ''}`}
        >
            <div className="relative">
                <div className={`transform ${isDisappearing ? 'animate-spin-out' : ''}`}>
                    <Loader2
                        className="w-24 h-24 text-green-700 animate-spin z-1001"
                        strokeWidth={1}
                    />
                </div>
                <div
                    className={`absolute inset-0 flex items-center justify-center z-1002
            ${isDisappearing ? 'animate-scale-out' : 'animate-pulse'}`}
                >
                    <img className='h-10 z-1002' src={webLogo}/>
                </div>
            </div>
        </div>
    );
};

export default Loader;
