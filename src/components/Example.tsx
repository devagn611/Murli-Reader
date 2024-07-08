import React, { type ReactNode, useState, useEffect } from 'react'

type Props = {
  title: string
  actions?: ReactNode
  above?: ReactNode
  children: ReactNode
}

export const Example = ({ title, actions, children, above = null }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`grid grid-cols-1 gap-4 ${isFullscreen ? 'h-screen' : 'md:h-screen'}`}>
      {!isFullscreen && (
        <>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <h1 className="h1">{title}</h1>
            {actions && (
              <div className="flex items-start flex-wrap gap-2">{actions}</div>
            )}
          </div>
          {above}
        </>
      )}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} md:relative md:z-auto`}>
        <div className={`h-full w-full ${isFullscreen ? 'aspect-[3/4]' : 'md:aspect-video aspect-[3/4]'} border border-stone-300 md:rounded overflow-hidden relative`}>
          <button 
            className="absolute top-4 right-4 z-10 md:hidden bg-gray-800 text-white px-2 py-1 rounded"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};