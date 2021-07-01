import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.scss';

export default function Search(props) {
    return (
        <div className='search-field-container'>
            <div className="search-bar">
                <div className="search-form-container">
                    <form className='search-form'>                    
                        <input type='text' placeholder='Search' className='text-input'/>
                        <button type='submit' className='search-submit-button'><FontAwesomeIcon icon='search' /></button>
                    </form>
                </div>
                <div className="new-topic">
                    <button>
                        <FontAwesomeIcon icon='plus' /> New Problem
                    </button>
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