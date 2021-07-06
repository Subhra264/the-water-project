import useViewport from '../../../hooks/useViewport';
import './Filters.scss';

export default function Filters(props) {
    const { isMobile } = useViewport();

    return (
        <div className={`filters ${isMobile? 'mobile' : ''}`}>
            <div className="filters-actual">Filters</div>
        </div>
    );
}