import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../utils/contexts';
import { getRequest, protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import ContentEditor from '../ContentEditor';
import ImgSelector from '../ImgSelector/ImgSelector';
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

        // Fetch the countries API
        getRequest('/available-countries/', null, successHandler, errorHandler);
    }, []);

    return (
        <div className="topic-address">
            <div className="topic-address-label">Country {props.required? '(Required)' : ''}</div>
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
    const [error, setError] = useState('');
    const selectedCountry = useRef('');
    const onSubmitClick = useRef(null);
    const contentEditorProps = useRef(null);
    const inputFileRef = useRef(null);
    const ngoSelector = useRef(null);
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

        if (!topic.title || !topic.content || !cityOrArea || !address) {
            setError('Fill all the required fields!');
            return;
        };

        const successHandler = (result) => {
            history.push('/discussion/');
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating Topic', errMessage);
        };

        let formData = new FormData();
        if (inputFileRef.current.files.length) {
            const file = inputFileRef.current.files[0];
            formData.append('img', file, file.name);
        }

        formData.append('title', topic.title);
        formData.append('description', topic.content);
        formData.append('tags', topic.tags);
        formData.append('country', selectedCountry.current.value);
        formData.append('city_or_area', cityOrArea);
        formData.append('address', address);

        if (ngoSelector.current.value) {
            console.log('NgoSelector.current.value', ngoSelector.current.value);
            formData.append('associated_ngo', ngoSelector.current.value);
        }

        const fetchDetails = {
            fetchURI: '/topics/',
            method: 'POST',
            isFormData: true,
            body: formData
        };

        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
    };

    contentEditorProps.current = {
        submit: {
            label: 'Create Topic',
            onClick: onSubmitClick.current
        },
        contentEditorPlaceholder: 'Describe the topic with as much detail as possible'
    };

    return (
        <ContentEditor {...contentEditorProps.current} error={error}>
            <div className="topic-address-container">
                <Country selectedCountry={selectedCountry} required/>
                <div className="topic-address">
                    <div className="topic-address-label">
                        City/Area (Required)
                    </div>
                    <div className="topic-address-input">
                        <input type='text' value={cityOrArea} onChange={onCityOrAreaChange} placeholder='City/Area, e.g.London' />
                    </div>
                </div>
                <div className="topic-address">
                    <div className="topic-address-label">
                        Address (Required)
                    </div>
                    <div className="topic-address-input">
                        <textarea value={address} onChange={onAddressChange} placeholder='Detailed address' maxLength='150' />
                    </div>
                </div>
                {
                    (userState.owned_orgs.length || userState.membered_orgs.length) &&
                        <div className="topic-address"  >
                            <div className="topic-address-label">Want To Post as NGO?</div>
                            <div className="topic-address-input">
                                <select ref={ngoSelector} placeholder='Choose NGO'>
                                    <option value='' key='default-ngo'></option>
                                    {
                                        userState.owned_orgs.map(ngo => (
                                            <option value={ngo.id} key={ngo.id} >{ngo.name}</option>
                                        ))
                                    }
                                    {
                                        userState.membered_orgs.map(ngo => (
                                            <option value={ngo.id} key={ngo.id} >{ngo.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                }
            </div>
            <ImgSelector inputFileRef={inputFileRef} title='Choose an image for the thumbnail' />
        </ContentEditor>
    );
}