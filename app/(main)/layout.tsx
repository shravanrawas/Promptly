'use client';

import Sidebar from '@/components/sidebar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full relative'>
            
            <div className='hidden h-full md:flex md:w-[350px] md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
                <div>
                    <Sidebar /> 
                </div>
            </div>

            <main className='md:pl-[350px]'>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;