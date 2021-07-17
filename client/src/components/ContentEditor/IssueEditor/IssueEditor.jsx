import ContetntEditor from "../ContentEditor";

export default function IssueEditor (props) {
    const onSubmitClick = (issue) => {
        console.log('Clicked Create Issue button!', issue);

        // TODO: Make the request to create an issue
        // fetch('/api', {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         ...issue
        //     })
        // }).then(res => (
        //     res.json()
        // )).then(result => {

        // }).catch(err => {
        //     //Properly handle the error
        // });
    };

    const contentEditorProps = {
        submit: {
            label: 'Create Issue',
            onClick: onSubmitClick
        },
        contentEditorPlaceholder: 'Describe the issue'
    }

    return (
        <ContetntEditor {...contentEditorProps} />
    );
}