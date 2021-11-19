import React, { useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from "@components/image";
import { API_MAP } from "modules/api";
import InfiniteScroll from "react-infinite-scroll-component";
import useDidMountEffect from 'hooks/useDidMountEffect';

const Query = (props) => {
  const { medias } = props;
  const router = useRouter()
  const { service, q } = router.query
  const [images, setImages] = useState(medias.results);
  const [pagination, setPaginataion] = useState(1);

  const getData = async (page = 1) => {
    const ApiService = API_MAP[service];
    const data = await ApiService(q, page);
    if (page === data.totalPage || data.totalPage === 0) {
      setPaginataion(-1);
    } else {
      setPaginataion(page);
    }
    setImages((prev) => [...prev, ...data.results]);
  };
  const next = () => {
    getData(pagination + 1);
  };

  useDidMountEffect(() => {
      setImages([]);
      getData(1)
  } , [q, service])

  return (
    <InfiniteScroll
      dataLength={images.length} // This is important field to render the next data
      next={next}
      hasMore={pagination !== -1}
      loader={<h4>Loading...</h4>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 rounded">
        {images.map((img) => (
       
          <Link href={`/${img.type}/photo/${img.id}`} key={img.id} passHref>
          <Image
            urls={img.urls}
            height={300}
            width={300}
            type={img.type}
            className="rounded shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
          />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Query;

export async function getServerSideProps(context) {
  const { q, service } = context.query;
  const ApiService = API_MAP[service];
  const medias = await ApiService(q);

  return {
    props: {
      medias,
    },
  };
}
