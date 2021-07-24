import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../utils/contexts';
import { getRequest, protectedRequest } from '../../../utils/fetch-request';
import ContentEditor from '../ContentEditor';
import './TopicEditor.scss';

export function Country (props) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const successHandler = (result) => {
            setCountries(result.countries);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching countries', errMessage);
        };

        // TODO: Fetch the countries API
        // fetch('/available-countries')
        // .then(res => res.json())
        // .then(result => {
        //     if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
        //     console.log('Countries', result);
        //     setCountries(result.countries);
        // }).catch(err => {
        //     console.log('Error fetching country names', err.message);
        // });

        getRequest('/available-countries/', null, successHandler, errorHandler);
    }, []);

    return (
        <div className="topic-address">
            <div className="topic-address-label">Country (Required)</div>
            <div className="topic-address-input">
                <select name='category' id='category' ref={props.selectedCountry} placeholder='Choose Country' >
                    {
                        countries.map(country => (
                            <option key={country.code} value={country.code}>{country.country}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default function TopicEditor (props) {
    const [address, setAddress] = useState('');
    const [cityOrArea, setCityOrArea] = useState('');
    const selectedCountry = useRef('');
    const onSubmitClick = useRef(null);
    const contentEditorProps = useRef(null);
    const history = useHistory();
    const { userState } = useContext(UserContext);

    const onAddressChange = (ev) => {
        setAddress(ev.target.value);
    };

    const onCityOrAreaChange = (ev) => {
        setCityOrArea(ev.target.value);
    };

    onSubmitClick.current = (topic) => {
        console.log('Creating topic', topic.content);
        console.log('Creating topic', address);

        const successHandler = (result) => {
            history.push('/discussion/');
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating Topic', errMessage);
        };

        const fetchDetails = {
            fetchURI: '/topics/',
            method: 'POST',
            body: {
                title: topic.title,
                description: topic.content,
                tags: topic.tags,
                country: selectedCountry.current.value,
                city_or_area: cityOrArea,
                address
            }
        };

        protectedRequest(fetchDetails, userState.access, successHandler, errorHandler);
    };

    contentEditorProps.current = {
        submit: {
            label: 'Create Topic',
            onClick: onSubmitClick.current
        },
        contentEditorPlaceholder: 'Describe the topic with as much detail as possible'
    };

    return (
        <ContentEditor {...contentEditorProps.current}>
            <div className="topic-address-container">
                <Country selectedCountry={selectedCountry} />
                <div className="topic-address">
                    <div className="topic-address-label">
                        City/Area
                    </div>
                    <div className="topic-address-input">
                        <input type='text' value={cityOrArea} onChange={onCityOrAreaChange} placeholder='City/Area, e.g.London' />
                    </div>
                </div>
                <div className="topic-address">
                    <div className="topic-address-label">
                        Address
                    </div>
                    <div className="topic-address-input">
                        <textarea value={address} onChange={onAddressChange} placeholder='Detailed address' maxLength='150' />
                    </div>
                </div>
            </div>
        </ContentEditor>
    );
}