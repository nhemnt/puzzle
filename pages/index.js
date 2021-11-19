import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import Image from "components/image";
import { searchPixabay } from "modules/api";

export default function IndexPage() {
  const [images, setImages] = useState([]);
  const [pagination, setPaginataion] = useState(1);
  const defaultImage = "meta";

  const getData = async (q, page = 1) => {
    const data = await searchPixabay(q, page);
    if (page === data.totalPage || data.totalPage === 0) {
      setPaginataion(-1);
    } else {
      setPaginataion(page);
    }
    setImages((prev) => [...prev, ...data.results]);
  };
  useEffect(() => {
    getData(defaultImage);
  }, []);

  const next = () => {
    getData(defaultImage, pagination + 1);
  };
  return (
    <InfiniteScroll
      dataLength={images.length} // This is important field to render the next data
      next={next}
      hasMore={pagination !== -1}
      loader={<h4>Loading...</h4>}
    >
      <div className="grid grid-cols-3 gap-4 rounded">
        {images.map(
          (img) =>(
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                key={img.id}
                urls={img.urls}
                height={200}
                width={200}
                className="rounded shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
              />
            )
        )}
      </div>
    </InfiniteScroll>
  );
}
