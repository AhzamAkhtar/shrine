import React from 'react'

const JoinUs = () => {
    return (
        <>

            <div className=' border-4 border-white px-20 mt-10 ml-5 mr-5 rounded-3xl mb-5'>
                <div className="flex justify-center mt-12">
                    <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-yellow-300 md:text-5xl lg:text-5xl dark:text-white">
                        join us as a creator
                    </h1>
                </div>
                <div class="w-full p-4 mt-10 text-center bg-black rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h2 class="mb-3 text-5xl font-extrabold text-center tracking-tight text-white dark:text-white">Unlock Your Creative Potential
                    </h2>
                    <h2 class="mb-3 text-5xl font-extrabold text-center tracking-tight text-white dark:text-white">Join Our Exclusive Membership Platform and Showcase Your Content to the World!
                    </h2>
                    <p class="mb-5 text-base text-white  sm:text-lg dark:text-gray-400">Calling All Creators: Join Our Thriving Community and Monetize Your Passion on Our Membership Platform! Turn your passion into a profitable venture by joining our dynamic membership platform. We provide the tools, resources, and support you need to monetize your content and transform your creativity into a sustainable career. Join our community of successful creators and embark on a journey towards financial independence while doing what you love!.</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a
                            onClick={() =>
                                handleProceeding()
                            }
                            href="#"
                            class="inline-flex justify-center items-center py-3 px-5 text-xl font-semibold text-center bg-white text-black rounded-full  border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            join us
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinUs