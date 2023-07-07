import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import db from '../../db/db'
import Content from '../../components/content'
const creatorPage = (props) => {
    //let content_arr = []
    const creator = props.slug
    const starterArray = []
    const standardArray = []
    const premiumArray = []
    //const [starterPrice, setStarterPrice] = useState("")
    const [starterDesc, setStarterDesc] = useState("")
    const [starterPrice, setStarterPrice] = useState("")
    const [standardPrice, setstandardPrice] = useState("")
    const [standardDesc, setstandardDesc] = useState("")
    const [premiumPrice, setpremiumPrice] = useState("")
    const [premiumDesc, setpremiumDesc] = useState("")
    const [creatorDesc, setCreatorDesc] = useState("")
    const [content, setContent] = useState([])
    const [image, setImage] = useState("")
    useEffect(() => {

        const getDes = async () => {
            const querySnapshot = await getDocs(collection(db, "creators"))
            querySnapshot.forEach((doc) => {
                if (doc.data().name == creator) {
                    setCreatorDesc(doc.data().description)
                    setImage(doc.data().image)
                }
            })
        }
        const getStarterPriceArray = async () => {
            const querySnapshot = await getDocs(collection(db, "creators"))
            querySnapshot.forEach((doc) => {
                if (doc.data().name == creator) {

                    for (let i = 0; i < 2; i++) {
                        //console.log(doc.data().starter.length())
                        starterArray.push(doc.data().starter[i])
                        //console.log("passes")
                    }

                }

            })
            console.log(starterArray)
            setStarterPrice(starterArray[1])
            setStarterDesc(standardArray[0])
        }
        const getStandardPriceArray = async () => {
            const querySnapshot = await getDocs(collection(db, "creators"))
            querySnapshot.forEach((doc) => {
                if (doc.data().name == creator) {

                    for (let i = 0; i < 2; i++) {
                        //console.log(doc.data().starter.length())
                        standardArray.push(doc.data().standard[i])
                        //console.log("passes")
                    }

                }

            })
            console.log(starterArray)
            setstandardDesc(standardArray[0])
            setstandardPrice(standardArray[1])
        }
        const getPremiumPriceArray = async () => {
            const querySnapshot = await getDocs(collection(db, "creators"))
            querySnapshot.forEach((doc) => {
                if (doc.data().name == creator) {

                    for (let i = 0; i < 2; i++) {
                        //console.log(doc.data().starter.length())
                        premiumArray.push(doc.data().premium[i])
                        //console.log("passes")
                    }

                }

            })
            console.log(starterArray)
            setpremiumDesc(premiumArray[0])
            setpremiumPrice(premiumArray[1])

        }
        getStarterPriceArray()
        getStandardPriceArray()
        getPremiumPriceArray()
        getDes()
    }, [])

    // useEffect(() => {
    //     const array = []
    //     const getContent = async () => {

    //         const q = query(collection(db, "content"));

    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //             content_arr.push({ ...doc.data(), key: doc.id });

    //         });
    //         content_arr = JSON.parse(JSON.stringify(array))

    //         //setContent(JSON.parse(JSON.stringify))
    //         console.log(content)
    //     }
    //     getContent()
    // }, [])
    useEffect(() => {
        const fetch = async () => {
            const colRef = collection(db, "content")
            const snapshot = await getDocs(colRef)

            const docs = snapshot.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            })
            setContent(docs)
            console.log(docs)
        }
        fetch()
    }, [])

    return (
        <>
            <div className='w-full h-1/2
             bg-white flex justify-center py-10'>
                <img
                    className='flex justify-center'
                    src={image} alt='' />
            </div>

            <div className='flex justify-center py-10'>
                <div class="w-full max-w-sm bg-white border-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                            <span class="sr-only">Open dropdown</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>
                        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col items-center pb-10">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="Bonnie image" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{creator}</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{creatorDesc}</span>
                        <div class="flex mt-4 space-x-3 md:mt-6">
                            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-white rounded-lg border border-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">follow</a>
                            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">message</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <h1 className='text-3xl font-extrabold'>select your membership</h1>
            </div>

            <div className='flex justify-center p-10'>

                <div class="mr-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Starter plan</h5>
                    <div class="flex items-baseline text-gray-900 dark:text-white">
                        <span class="text-3xl font-semibold">$</span>
                        <span class="text-5xl font-extrabold tracking-tight">{starterPrice}</span>
                        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                    </div>
                    <div className='mt-2'>
                        <p className='text-black'>
                            {starterDesc}
                        </p>
                    </div>
                    <button type="button" class=" mt-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                </div>
                <div class="mr-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
                    <div class="flex items-baseline text-gray-900 dark:text-white">
                        <span class="text-3xl font-semibold">$</span>
                        <span class="text-5xl font-extrabold tracking-tight">{standardPrice}</span>
                        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                    </div>
                    <div className='mt-2'>
                        <p className='text-black'>
                            {standardDesc}
                        </p>
                    </div>
                    <button type="button" class="mt-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                </div>

                <div class="mr-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Premium plan</h5>
                    <div class="flex items-baseline text-gray-900 dark:text-white">
                        <span class="text-3xl font-semibold">$</span>
                        <span class="text-5xl font-extrabold tracking-tight">{premiumPrice}</span>
                        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                    </div>
                    <div className='mt-2'>
                        <p className='text-black'>
                            {premiumDesc}
                        </p>
                    </div>
                    <button type="button" class="mt-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                </div>


            </div>

            <div className='flex justify-center'>
                <h1 className='text-3xl font-extrabold mb-10'>recent post from {creator}</h1>

            </div>

            
                {content.map((item) => {
                    return (
                        <>
                        <div className='flex justify-center mt-10'>
                            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <img class="rounded-t-lg" src={item.image} alt="" />
                                </a>
                                <div class="p-5">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    </a>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.desc}.</p>
                                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            </div>
                        </>
                    )
                })}

           



        </>
    )
}
export async function getServerSideProps(context) {
    const { slug } = context.query;


    console.log(`slug is my ${slug}`);
    return {
        props: { slug },
    };
}
export default creatorPage