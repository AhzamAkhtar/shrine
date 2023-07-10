import React, { useEffect, useState } from "react";
import CreatorList from "./CreatorList";
import { collection, getDocs } from "firebase/firestore"
import db from "../../db/db";
import UpperHero from "./UpperHero";
const FindCreators = () => {

  const [search , setSearch] = useState("")
  const [searchOutput , setSearchOutput] = useState([])
  const [loading , setLoading] = useState(false)

  const getAllCreators = async () => {
    setLoading(true)
    const creatorsArray = []
    const querySnapshot = await getDocs(collection(db , "creators"))
    querySnapshot.forEach((doc)=> {
      creatorsArray.push(doc.data())
    })
    setSearchOutput(creatorsArray)
    setLoading(false)
  }

  useEffect(()=> {
    getAllCreators()
  },[])

  const seachHandler = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }


  const getCreatorsList = async () => {
    setLoading(true)
    const creatorsArray = []
    const querySnapshot = await getDocs(collection(db , "creators"))
    querySnapshot.forEach((doc)=> {
      if(doc.data().name[0,1] == search[0,1]) {
        creatorsArray.push(doc.data())
      }
    })
    setSearchOutput(creatorsArray)
    setLoading(false)
   // console.log(search)
   // console.log(searchOutput)
  }

 

  const getCreatorsByArtist = async () => {
    setLoading(true)
    const creatorsArray = []
    const querySnapshot = await getDocs(collection(db , "creators"))
    querySnapshot.forEach((doc)=> {
      if(doc.data().category == "nft"){
        creatorsArray.push(doc.data())
      }
    })
    setSearchOutput(creatorsArray)
    setLoading(false)
  }

  const getCreatorsByVedio = async () => {
    setLoading(true)
    const creatorsArray = []
    const querySnapshot = await getDocs(collection(db , "creators"))
    querySnapshot.forEach((doc)=> {
      if(doc.data().category == "video"){
        creatorsArray.push(doc.data())
      }
    })
    setSearchOutput(creatorsArray)
    setLoading(false)
  }
  

  return (
    <>
      
      <div className="ml-5 mr-5 border-4 border-white rounded-3xl">
      <div className="flex justify-center mt-10">
        <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl dark:text-white">
          find creators
        </h1>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-1/3">
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              onChange={seachHandler}
              value={search}
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              onClick={()=>getCreatorsList()}
              class="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <span class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          music
        </span>
        <span onClick={()=> getCreatorsByVedio()} class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          videos
        </span>
        <span class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          blogs
        </span>
        <span onClick={()=> getCreatorsByArtist()} class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          artist
        </span>
        <span class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          podcast
        </span>
        <span onClick={()=> getAllCreators()} class="cursor-pointer bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          all
        </span>
      </div>
      <CreatorList CreatorList={searchOutput} loading={loading}/>
      <div>
          <UpperHero className="flex justify-center" />
        </div>
      </div>
    </>
  );
};

export default FindCreators;
