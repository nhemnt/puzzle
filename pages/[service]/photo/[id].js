
import Image from '@components/image'
import {  API_MAP } from 'modules/api'
import { isEmpty } from 'modules/utils';
import React from 'react'

const Id = (props) => {
  const {media} = props;
  if(isEmpty(media)) {
    return null;
  }

    return (
/* eslint-disable jsx-a11y/alt-text */
        <Image
            urls={media.urls}
            height={600}
            width={600}
            type={media.type}
            className="rounded shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
          />

    )
}

export default Id

export async function getServerSideProps(context) {
    const { service, id } = context.query;
    const ApiService = API_MAP[`photo-${service}`];
    const media = await ApiService(id);
    console.log(media);
  
    return {
      props: {
        media,
      },
    };
  }
  