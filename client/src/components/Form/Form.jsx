import './Form.scss';

const Form = (props) => {
    const inputFields = [];

    for (const field in props.fields) {
        const inputField = props.fields[field];
        inputFields.push(
            <input placeholder={field} {...inputField} key={field}/>
        );
    }

    return (
        <div className='form'>
            <form>
                {inputFields}
                <input type='submit' className='submit-button' value='Submit' onClick={props.onSubmit}/>
            </form>
        </div>
    );
}

export default Form;