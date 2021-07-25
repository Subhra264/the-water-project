import { useState } from 'react';
import Search from '../Search/Search';
import SearchResult from '../SearchResult/SearchResult';
import './TopicFinder.scss';

export default function TopicFinder(props) {
    const [queryToSearch, setQueryToSearch] = useState('');

    return (
        <div className='topic-finder'>
            <Search searchParams={props.searchParams} setQueryToSearch={setQueryToSearch}/>
            <SearchResult queryToSearch={queryToSearch} />
        </div>
    );
}