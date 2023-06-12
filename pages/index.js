import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    </>
  )
}
