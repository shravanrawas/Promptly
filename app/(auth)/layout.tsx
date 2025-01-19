import React from 'react';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex mt-20 items-center justify-center h-full'>
      {children}
    </div>
  );
}

export default Authlayout;
