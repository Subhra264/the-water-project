import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../../../hooks/useViewport';
import { useMatchURL } from '../../../hooks/useMatch';
import './Search.scss';

export default function Search(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();

    return (
        <div className='search-field-container'>
            <div className="search-bar">
                <div className="search-form-container">
                    <form className='search-form'>                    
                        <input type='text' placeholder='Search' className='text-input'/>
                        <button type='submit' className='search-submit-button'><FontAwesomeIcon icon='search' /></button>
                    </form>
                </div>
                <div className="new-problem">
                    <Link to={`${matchURL}/new-topic`}>
                        <FontAwesomeIcon icon='plus' /> <i className={`${isMobile? 'display-none' : 'new-problem-label'}`}>New Problem</i>
                    </Link>
                </div>
            </div>
            <div className='labels-container'>
                <div className="clear-filters">Clear filters</div>
                <div className="labels">
                    <div className="label">
                        <div className="clear-filter">&times;</div>
                        <div className="label-name">India</div>
                    </div>
                    <div className="label">
                        <div className="clear-filter">&times;</div>
                        <div className="label-name">India</div>
                    </div>
                    <div className="label">
                        <div className="clear-filter">&times;</div>
                        <div className="label-name">India</div>
                    </div>
                </div>
            </div>
        </div>
    )
}