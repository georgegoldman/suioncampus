import React from 'react';

const BrickLayoutSection = () => {
  const contentBlocks = [
    {
      content: (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full"></div>
            <span className="text-lg sm:text-xl text-gray-200 dark:text-gray-300">Active</span>
          </div>
          <div className="text-2xl sm:text-3xl text-gray-200 dark:text-gray-300 mb-3">Mentors</div>
          <div className="text-5xl sm:text-6xl font-bold">50+</div>
        </div>



      )
    },
    {
      content: (
        <div className="text-right">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Business</div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Track</div>
        </div>

      )
    },
    {
      content: (
        <>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Engineering</div>
          <div className="text-xl sm:text-2xl mb-2">Track</div>
          <div className="text-lg sm:text-xl">Move Development</div>
          <div className="text-lg sm:text-xl">dApp Building</div>
        </>

      )
    },
    {
      content: (
        <div className="text-center text-white dark:text-gray-100">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold">SUI</div>
          <div className="text-sm sm:text-base lg:text-lg">Blockchain</div>
        </div>

      )
    },
    {
      content: (
        <div className='text-center'>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-100 dark:text-green-200 mb-2">Students</div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-100 dark:text-green-200 mb-2">Per Cohort</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">20–30</div>

        </div>
      )
    }
  ];
  return (
    <>
      {/* Google Font Link */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap" 
        rel="stylesheet" 
      />
      
      <section className="bg-transparent px-2 py-1 sm:px-6 sm:py-4 lg:px-8 lg:py-6" style={{ fontFamily: '"Just Me Again Down Here", cursive', }}>
        <div className="grid grid-cols-3 grid-rows-3 gap-0 h-96 sm:h-[500px] lg:h-[600px]">
        
          {/* Block 1 - Top Left Large */}
          <div className="text-base sm:text-lg col-span-2 row-span-2 bg-blue-500 dark:bg-blue-800 p-3 sm:p-4 lg:p-6 text-white dark:text-gray-100 flex flex-col justify-center border-2 border-white dark:border-gray-800">
            {contentBlocks[0].content}
          </div>

          {/* Block 2 - Top Right */}
          <div className="text-base sm:text-lg col-span-1 row-span-1 bg-blue-500 dark:bg-blue-800 p-2 sm:p-3 lg:p-4 text-white dark:text-gray-100 flex flex-col justify-center border-2 border-white dark:border-gray-800">
            {contentBlocks[1].content}
          </div>

          {/* Block 3 - Middle Right */}
          <div className="text-base sm:text-lg col-span-1 row-span-1 bg-blue-500 dark:bg-blue-800 p-2 sm:p-3 lg:p-4 text-white dark:text-gray-100 flex flex-col justify-center border-2 border-white dark:border-gray-800">
            {contentBlocks[2].content}
          </div>

          {/* Block 4 - Bottom Left */}
          <div className="text-base sm:text-lg col-span-1 row-span-1 bg-blue-500 dark:bg-blue-800 p-2 sm:p-3 lg:p-4 text-white dark:text-gray-100 flex flex-col justify-center border-2 border-white dark:border-gray-800">
            {contentBlocks[3].content}
          </div>

          {/* Block 5 - Bottom Right */}
          <div className="text-base sm:text-lg col-span-2 row-span-1 bg-blue-500 dark:bg-blue-800 p-2 sm:p-3 lg:p-4 text-white dark:text-gray-100 flex flex-col justify-center border-2 border-white dark:border-gray-800">
            {contentBlocks[4].content}
          </div>

        </div>
      </section>
    </>
  );
};

export default BrickLayoutSection;