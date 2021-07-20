import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import { TopicContext } from '../../../utils/contexts';
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

        // POST request to create a progress report
        fetch(`${props.fetchURI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription
            })
        }).then(res => res.json())
        .then(result => {
            console.log('Create a progress report', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            props.setProgressReport(result);
        }).catch(err => {
            console.log('Error creating Progress Report', err.message);
        });
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
        // Delete the task with given taskId
        fetch(`/topics/${topicId}/progress-report/delete-task/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: taskId
            })
        }).then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);

            const existingTasks = [...progressReport.task_set];
            existingTasks.splice(index, 1);
            setProgressReport({
                ...progressReport,
                task_set: existingTasks
            });

        }).catch(err => {
            console.log('Error deleting task', err);
        });
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
        // Request to save the changes
        fetch(`/topics/${topicId}/tasks/save-changes`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: updatedTasks.current
            })
        }).then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
        }).catch(err => {
            console.log('Error saving changes', err);
        });
    };

    useEffect(() => {
        console.log('Rendered again//');

        // Fetch the Progress Report
        fetch(`/topics/${topicId}/progress-report/`)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            console.log('Progress Report', result);
            setProgressReport(result);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching progress report', err);
        });
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
                                                <div className="task-description">{task.description}</div>
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