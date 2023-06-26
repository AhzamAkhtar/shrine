import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import HeroLD from '../components/LD/HeroLD'

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HeroLD/>
    </>
  )
}
