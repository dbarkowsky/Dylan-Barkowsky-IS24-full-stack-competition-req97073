import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import ProductTable from '@/components/ProductTable.js';


export default function Home() {
  const testData = [{
    productId: 1,
    productName: "Cat Food",
    productOwnerName: "Felix",
    developers: [
      "NAME_1",
      "NAME_2",
      "NAME_3",
      "NAME_4",
      "NAME_5"
    ],
    scrumMasterName: "Garfield",
    startDate: "2018-12-10T13:49:51.141Z",
    methodology: "Agile"
  }];

  const [products, setProducts] = useState(testData);

  return (
    <>
      <Head>
        <title>Dylan Barkowsky - Competition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ProductTable data={products} />
      </main>
    </>
  )
}
