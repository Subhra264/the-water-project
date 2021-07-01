import Search from '../Search/Search';
import SearchResult from '../SearchResult/SearchResult';
import './TopicFinder.scss';

export default function TopicFinder(props) {
    return (
        <div className='topic-finder'>
            <Search />
            <SearchResult />
        </div>
    );
}