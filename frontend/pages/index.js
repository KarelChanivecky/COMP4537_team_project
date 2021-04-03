import Head from 'next/head'
import styles from '../styles/Home.module.css'
import _app from "./_app";
import {ListItem} from "../../sharedSymbols/models.mjs";

export default function Home() {
    const listItem  = new ListItem("just do it please");
  return (
    <div>
      <Head>
        <title>COMP 4537 - Team assignment - Do Todo</title>
      </Head>
      <main>
          {listItem.description}
      </main>
    </div>
  )
}
