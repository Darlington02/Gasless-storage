import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
require('dotenv').config()

import { Greeter } from "../config"
import GreeterAbi from "./GreeterAbi.json"

export default function Home() {

  const [ greeting, setGreeting ] = useState('')
  const [ storedGreeting, setStoredGreeting ] = useState('')

  useEffect(() => {

    async function getGreeting() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(Greeter, GreeterAbi.abi, signer)

        const greeting = await contract.greet()
        setStoredGreeting(greeting)
    }

    getGreeting()

  }, [])

  async function greet() {

    const webhook = `https://api.defender.openzeppelin.com/autotasks/${process.env.NEXT_PUBLIC_AUTOTASK_WEBHOOK}`

    try{
 
      let autotaskResponse = await fetch(
        webhook,
        {
          method: 'POST',
          body: JSON.stringify({ // Autotask webhook expects a JSON string in the request's body hence we use JSON.stringify
            greeting: greeting
          })
        }
      );

      const autotaskResult = await autotaskResponse.json();

      console.log(autotaskResult)

      if (autotaskResult.status === 'success') {
        alert("Greeting was set successfully")
      } else {
        alert("Greeting was  not set successfully")
        console.error(`Autotask run failed with result ${JSON.stringify(autotaskResult)}`);
        return res.status(500).json({})
      }

      window.location.reload()
    }
    catch(error){
      alert(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Gasless Transactions using Relayers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Gasless <a href="#">Storage</a>
        </h1>

        <p className={styles.description}>
          This demo app practices the use of relayers for sending gasless transactions.
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Ensure to connect to Rinkeby! &rarr;</h2>
            <p>Insert a greeting to store on Contract.</p>

            <div className={styles.greetingForm}>
              <input type="text" className={styles.input} placeholder="Enter greeting" onChange={(e) => setGreeting(e.target.value)} />

              <input type="submit" className={styles.button} value="Greet" onClick={() => greet()} />
            </div>

            <p>Greeting: {storedGreeting}</p>
          </a>
        </div>
      </main>
    </div>
  )
}
