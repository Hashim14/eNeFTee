import { GetServerSideProps } from 'next'
import React from 'react'
import { sanityClient } from '../../sanity'
import { Collection } from '../../typings'

interface Props {
  collection: Collection
}
const Gal = ({ collection }: Props) => {
  return <div>{collection.slug.current}</div>
}

export default Gal

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == papafam-ape-gallery][0]{
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

  const collection = await sanityClient.fetch(query, {
    id: 'papafam-ape-gallery',
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      collection,
    },
  }
}
