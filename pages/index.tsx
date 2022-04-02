import { createClient } from '@supabase/supabase-js'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import axios, { Method } from 'axios'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import Link from 'next/link'

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL || ''
//   process.env.SUPABASE_SERVICE_ROLE_KEY || ''
// )

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// interface CustomMethod {
//   method?: Method
//   url?: string
//   params: {
//     chain: string
//     continuation: string
//     include: string
//   }
//   headers: {}
// }

interface Props {
  collection: Collection[]
}

const Home = ({ collection }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0 ">
      <Head>
        <title>NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> */}
      <h1 className="mb-10 w-52 cursor-pointer text-4xl font-extralight sm:w-80 ">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          PAPAFAM
        </span>{' '}
        NFT Market Place
      </h1>
      <main className="items-center bg-slate-100 p-10 shadow-xl shadow-rose-300">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collection.map((collection) => (
            <Link
              href={
                `/nft/${collection.slug.current}`
                // collection.slug.current === 'papafam-apes-hashim14'
                //   ? `/nft/${collection.slug.current}`
                //   : `/nft/papafam-ape-gallery`
              }
            >
              <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105 ">
                <img
                  className="h-96 w-60 rounded-2xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />
                <div className="p-5 ">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
    //   </div>
    // </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    description,
    nftCollectionName,
    mainImage {
    asset
    },
    previewImage {
    asset
    },
    slug {
    current
    },
    creator-> {
    _id,
    name,
    address,
    slug {
current
},
},
}`

  const collection = await sanityClient.fetch(query)
  console.log({ collection })

  return {
    props: {
      collection,
    },
  }
}
