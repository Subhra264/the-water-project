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
        <div className='form-container log-in'>
            <div className='form-title'>{props.formTitle}</div>
            <div className='form'>
                <form>
                    {inputFields}
                    {props.children}
                    <div className={`form-error ${props.error? '' : 'display-none'}`}>
                        {props.error}
                    </div>
                    <input type='submit' className='submit-button' value='Submit' onClick={props.onSubmit}/>
                </form>
            </div>
        </div>
    );
}

export default Form;