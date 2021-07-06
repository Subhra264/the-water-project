import Filters from './Filters/Filters';
import TopicFinder from './TopicFinder/TopicFinder';
import './Discussion.scss';
import useViewport from '../../hooks/useViewport';

export default function Discussion(props) {
    const { isMobile } = useViewport();

    return (
        <div className={`discussion ${isMobile? 'mobile' : ''}`}>
            <Filters />
            <TopicFinder />
        </div>
    );
}