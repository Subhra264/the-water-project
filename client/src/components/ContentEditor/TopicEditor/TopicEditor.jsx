import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ContentEditor from '../ContentEditor';
import './TopicEditor.scss';

function TopicLocation (props) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // TODO: Fetch the countries API
        fetch('/available-countries')
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            console.log('Countries', result);
            setCountries(result.countries);
        }).catch(err => {
            console.log('Error fetching country names', err.message);
        });
    }, []);

    return (
        <div className="topic-address">
            <div className="topic-address-label">Country</div>
            <div className="topic-address-input">
                <select name='category' id='category' ref={props.selectedCountry} placeholder='Choose Country' >
                    {
                        countries.map(country => (
                            <option key={country} value={country}>{country}</option>
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

    const onAddressChange = (ev) => {
        setAddress(ev.target.value);
    };

    const onCityOrAreaChange = (ev) => {
        setCityOrArea(ev.target.value);
    };

    onSubmitClick.current = (topic) => {
        console.log('Creating topic', topic.content);
        console.log('Creating topic', address);
        fetch('/topics/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: topic.title,
                description: topic.content,
                tags: topic.tags,
                country: selectedCountry.current.value,
                city_or_area: cityOrArea,
                address
            })
        }).then(res => (
            res.json()
        )).then(result => {
            // TODO: Do something
            console.log('Created topic', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            history.push('/discussion/topics/');

        }).catch(err => {
            // TODO: Handle the error
            console.log('Error creating Topic', err.message);
        });
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
                <TopicLocation selectedCountry={selectedCountry} />
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