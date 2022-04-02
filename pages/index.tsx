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

// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> */}
      <h1 className="mb-10 w-52 cursor-pointer text-4xl font-extralight sm:w-80 ">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          PAPAFAM NFt Market Place
        </span>{' '}
      </h1>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-300">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collection.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
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

// const NftImg = () => {
//   const [isLoading, setLoading] = React.useState(true)
//   const [nftData, setNftData] = React.useState([])

//   const options = {
//     method: 'GET' as Method,
//     url: 'https://stoplight.io/mocks/nftport/nftport/5393499/v0/nfts',
//     params: { chain: 'polygon', page_size: '20', include: 'metadata' },
//     headers: {
//       'Content-Type': 'application/json',
//       Prefer: 'code=200, example=default',
//       Authorization: '2d26edc9-68fc-4eca-8dc2-a636ed08602a',
//     },
//   }

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data.nfts)
//     })
//     .catch(function (error) {
//       console.error(error)
//     })

//   return (
//     <a className="group">
//       <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 rounted-lg w-full overflow-hidden bg-gray-200">
//         <Image
//           src="/images/nftpic.jpg"
//           className={cn(
//             'duration-700 ease-in-out group-hover:opacity-75',
//             isLoading
//               ? 'greyscale scale-110 blur-2xl'
//               : 'greyscale-0 scale-100 blur-0'
//           )}
//           alt=""
//           width={90}
//           height={60}
//           // layout="fill"
//           // objectFit="cover"
//           onLoadingComplete={() => setLoading(false)}
//         />
//       </div>
//       <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
//       <p className="mt-1 text-lg font-medium text-gray-900">@leerob</p>
//     </a>
//   )
// }
