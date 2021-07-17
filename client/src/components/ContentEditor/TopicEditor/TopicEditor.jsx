import { useEffect, useRef, useState } from 'react';
import ContentEditor from '../ContentEditor';
import './TopicEditor.scss';

function TopicLocation (props) {
    const [countries, setCountries] = useState([]);
    const selectedCountry = useRef(null);

    useEffect(() => {
        // TODO: Fetch the countries API
    }, []);

    return (
        <div className="topic-address">
            <div className="topic-address-label">Country</div>
            <div className="topic-address-input">
                <select name='category' id='category' ref={selectedCountry} placeholder='Choose Country' >
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

    const onAddressChange = (ev) => {
        setAddress(ev.target.value);
    };

    const onCityOrAreaChange = (ev) => {
        setCityOrArea(ev.target.value);
    };

    const onSubmitClick = (content) => {
        console.log('Creating topic', content);
        console.log('Creating topic', address);
        // fetch('/create-topic', {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         ...content,
        //         address
        //     })
        // }).then(res => (
        //     res.json()
        // )).then(result => {
        //     // TODO: Do something
        // }).catch(err => {
        //     // TODO: Handle the error
        // });
    }

    const contentEditorProps = {
        submit: {
            label: 'Create Topic',
            onClick: onSubmitClick
        },
        contentEditorPlaceholder: 'Describe the topic with as much detail as possible'
    }

    return (
        <ContentEditor {...contentEditorProps}>
            <div className="topic-address-container">
                <TopicLocation />
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