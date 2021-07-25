import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../../../hooks/useViewport';
import { useMatchURL } from '../../../hooks/useMatch';
import './Search.scss';
import { useEffect, useRef, useState } from 'react';

export default function Search(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();
    const [addedFilters, setAddedFilters] = useState([]);
    const urlSearchParams = useRef(new URLSearchParams(''));
    const searchELem = useRef(null);

    // Search for topics
    const searchResult = (ev) => {
        ev.preventDefault();
        if (searchELem.current.value) {
            urlSearchParams.current.set('search', searchELem.current.value); 
        } else {
            urlSearchParams.current.delete('search');
        }
        console.log('URLsearchparams, search', urlSearchParams.current.toString());
        props.setQueryToSearch(urlSearchParams.current.toString());
    };

    // Clear all the filters 
    const clearFilters = () => {
        const paramsToDelete = [];

        urlSearchParams.current.forEach((paramValue, param) => {
            // The below code won't work
            // urlSearchParams.current.delete(param);
            paramsToDelete.push(param);
        });

        paramsToDelete.forEach(param => {
            urlSearchParams.current.delete(param);
        });

        console.log('Deleted urlSearchparams', urlSearchParams.current.toString());
        setAddedFilters([]);
    }

    const removeFilter = (index, filterQuery) => {
        // Delete the query from the urlSearchParams
        urlSearchParams.current.delete(filterQuery);

        const updatedFilters = [...addedFilters];
        updatedFilters.splice(index, 1);

        console.log('Updated urlSearchParams', urlSearchParams.current);
        // Update the addedFilters state array
        setAddedFilters([...updatedFilters]);
    };

    useEffect(() => {
        console.log('Iterating through props.searchParams', props.searchParams);
        const addedFilters_ = [];
        for (const param in props.searchParams) {
            if (props.searchParams[param].value) {
                urlSearchParams.current.set(props.searchParams[param].query, props.searchParams[param].value);
                addedFilters_.push(props.searchParams[param]);
            }
        }

        console.log('Added filters_', addedFilters_);
        setAddedFilters([...addedFilters_]);
    }, [props.searchParams]);

    return (
        <div className='search-field-container'>
            <div className="search-bar">
                <div className="search-form-container">
                    <form className='search-form'>                    
                        <input type='text' placeholder='Search' className='text-input' ref={searchELem} />
                        <button type='submit' className='search-submit-button' onClick={searchResult}><FontAwesomeIcon icon='search' /></button>
                    </form>
                </div>
                <div className="new-problem">
                    <Link to={`${matchURL}/new-topic`}>
                        <FontAwesomeIcon icon='plus' /> <i className={`${isMobile? 'display-none' : 'new-problem-label'}`}>New Problem</i>
                    </Link>
                </div>
            </div>
            <div className='labels-container'>
                <div className="clear-filters" onClick={clearFilters}>Clear filters</div>
                <div className="labels">
                    {
                        addedFilters.map((filter, index) => (
                            // <div className="label" key={filter.query}>
                            //     <div className="clear-filter" onClick={() => removeFilter(index, filter.query)}>&times;</div>
                            //     <div className="label-name">{filter.label}{filter.value}</div>
                            // </div>
                            <span className="label" key={filter.query}>
                                <span className="clear-filter" onClick={() => removeFilter(index, filter.query)}>&times;</span>
                                <span className="label-name">{filter.label}{filter.value}</span>
                            </span>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    )
}