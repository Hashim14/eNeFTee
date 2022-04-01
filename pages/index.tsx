import { createClient } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import axios, { Method } from 'axios'

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL || ''
//   process.env.SUPABASE_SERVICE_ROLE_KEY || ''
// )

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface CustomMethod {
  method?: Method
  url?: string
  params: {
    chain: string
    continuation: string
    include: string
  }
  headers: {}
}

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <NftImg />
        </div>
      </div>
    </div>
  )
}

export default Home

const NftImg = () => {
  const [isLoading, setLoading] = React.useState(true)
  const [nftData, setNftData] = React.useState([])

  const options = {
    method: 'GET' as Method,
    url: 'https://stoplight.io/mocks/nftport/nftport/5393499/v0/nfts',
    params: { chain: 'polygon', page_size: '20', include: 'metadata' },
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'code=200, example=default',
      Authorization: '2d26edc9-68fc-4eca-8dc2-a636ed08602a',
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data.nfts)
    })
    .catch(function (error) {
      console.error(error)
    })

  return (
    <a className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 rounted-lg w-full overflow-hidden bg-gray-200">
        <Image
          src="/images/nftpic.jpg"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'greyscale scale-110 blur-2xl'
              : 'greyscale-0 scale-100 blur-0'
          )}
          alt=""
          width={90}
          height={60}
          // layout="fill"
          // objectFit="cover"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">@leerob</p>
    </a>
  )
}
