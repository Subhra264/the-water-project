import { useState } from 'react';
import Filters from './Filters/Filters';
import TopicFinder from './TopicFinder/TopicFinder';

export default function DiscussionHome(props) {
  const [searchParams, setSearchParams] = useState(null);

  return (
    <>
      <Filters setSearchParams={setSearchParams} />
      <TopicFinder searchParams={searchParams} />
    </>
  );
}
