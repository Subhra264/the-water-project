import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import { TopicContext } from '../../../utils/contexts';
import { getRequest, protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import parseHTML from '../../../utils/parseHTML';
import Editor from '../../Editor/Editor';
import Loader from '../../Loader/Loader';
import './ProgressReport.scss';

// Editor to add task or create a Progress Report
function ProgressReportEditor (props) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const onTaskDescriptionChange = (ev, editor) => {
        setTaskDescription(editor.getData());
    };

    const onTaskTitleChange = (ev) => {
        setTaskTitle(ev.target.value);
    };

    const onCreateProgressReport = (ev) => {
        ev.preventDefault();
        console.log('taskdescription', taskDescription);

        const successHandler = (result) => {
            props.setProgressReport(result);
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating progress report', errMessage);
        };

        // POST request to create a progress report
        const fetchDetails = {
            fetchURI: `${props.fetchURI}`,
            method: 'POST',
            body: {
                title: taskTitle,
                description: taskDescription
            }
        };

        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
    };

    return (
        <div className="create-progress-report-form">
            <div className="create-progress-report-title">
                <input type="text" placeholder='Task title' value={taskTitle} onChange={onTaskTitleChange} />
            </div>
            <Editor 
                editorContent={taskDescription}
                onContentChange={onTaskDescriptionChange}
                placeholder='Describe the task'
            />
            <div className="create-progress-report-submit">
                <button className="create-report-submit-button" onClick={onCreateProgressReport}>
                    {props.submitLabel}
                </button>
            </div>
        </div>
    );
}

export default function ProgressReport (props) {
    const [progressReport, setProgressReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const { topicId } = useContext(TopicContext);
    const updatedTasks = useRef([]);

    const deleteTask = (taskId, index) => {

        const successHandler = (result) => {
            const existingTasks = [...progressReport.task_set];
            existingTasks.splice(index, 1);
            setProgressReport({
                ...progressReport,
                task_set: existingTasks
            });
        };

        const errorHandler = (errMessage) => {
            console.log('Error deleting task', errMessage);
        };

        // Delete the task with given taskId
        const fetchDetails = {
            fetchURI: `/topics/${topicId}/progress-report/delete-task/`,
            method: 'DELETE',
            body: {
                id: taskId
            }
        };

        protectedRequest(
            fetchDetails,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    };

    const toggleCompletedMark = (taskId, index) => {
        const existingTasks = [...progressReport.task_set];

        // Toggle the is_completed property
        existingTasks[index].is_completed = !existingTasks[index].is_completed;

        // If the taskId is present in the comple
        const indexOfTask = updatedTasks.current.indexOf(taskId);
        if (indexOfTask >= 0) {
            updatedTasks.current.splice(indexOfTask, 1);
        } else {
            updatedTasks.current.push(taskId);
        }

        setProgressReport({
            ...progressReport,
            task_set: existingTasks
        });
    };

    const saveChanges = () => {
        console.log('Updated tasks', updatedTasks.current);

        const successHandler = (result) => {
            // Do nothing
        };

        const errorHandler = (errMessage) => {
            console.log('Error saving changes', errMessage);
        };

        // Request to save the changes
        const fetchDetails = {
            fetchURI: `/topics/${topicId}/tasks/save-changes/`,
            method: 'PATCH',
            body: {
                ids: updatedTasks.current
            }
        };

        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
    };

    useEffect(() => {
        console.log('Rendered again//');

        const successHandler = (result) => {
            setProgressReport(result);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching progress report', errMessage);
        };

        // Fetch the Progress Report
        // fetch(`/topics/${topicId}/progress-report/`)
        // .then(res => res.json())
        // .then(result => {
        //     if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
        //     console.log('Progress Report', result);
        //     setProgressReport(result);
        //     setLoading(false);
        // }).catch(err => {
        //     console.log('Error fetching progress report', err);
        // });

        getRequest(
            `/topics/${topicId}/progress-report/`,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );

    }, []);

    return (
        <div className="progress-report">
            {
                loading?
                    <Loader width='5em' />
                :
                    <>
                        {
                            Object.keys(progressReport).length? 
                                <div className="progress-report-tasks">
                                    {
                                        progressReport.task_set.map((task, index) => (
                                            <div className="progress-report-task" key={task.id}>
                                                <div className="task-title">{task.title}</div>
                                                <div className="task-description">{parseHTML(task.description)}</div>
                                                <div className="task-buttons-container">
                                                    <div className="task-buttons">
                                                        <span className="task-button" onClick={() => deleteTask(task.id, index)} title='Delete Task' >
                                                            <FontAwesomeIcon icon='trash-alt' color='red' />
                                                        </span>
                                                        <span className="task-button done-button" onClick={() => toggleCompletedMark(task.id, index)} title={`Mark as ${task.is_completed? 'In' : '' }Completed`} >
                                                            <FontAwesomeIcon icon={[`${task.is_completed? 'fas' : 'far'}`, 'check-square']} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="save-changes">
                                        <button className="save-changes-button" onClick={saveChanges}>
                                            Save Changes
                                        </button>
                                    </div>
                                    <ProgressReportEditor
                                        fetchURI={`/topics/${topicId}/progress-report/add-task/`}
                                        setProgressReport={setProgressReport}
                                        submitLabel='Add Task'
                                    />
                                </div>
                            :
                                <div className="create-progress-report">
                                    <div className="create-progress-report-banner">
                                        This topic doesn't have a Progress Report. Create one to track progress!
                                    </div>
                                    <ProgressReportEditor
                                        fetchURI={`/topics/${topicId}/progress-report/`}
                                        setProgressReport={setProgressReport}
                                        submitLabel='Create Report'
                                    />
                                </div>
                        }
                    </>
            }
        </div>
    );
}