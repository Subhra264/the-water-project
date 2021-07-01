import Filters from './Filters/Filters';
import TopicFinder from './TopicFinder/TopicFinder';
import './Discussion.scss';

export default function Discussion(props) {
    return (
        <div className='discussion'>
            <Filters />
            <TopicFinder />
        </div>
    );
}