import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../../../hooks/useViewport';
import { Country } from '../../ContentEditor/TopicEditor/TopicEditor';
import './Filters.scss';

export default function Filters(props) {
  const { isMobile } = useViewport();
  const [showFilters, setShowFilters] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [noOfIssues, setNoOfIssues] = useState('');
  const [progressReportCompleted, setProgressReportCompleted] = useState(false);
  const [noOfProgressReportTasks, setNoOfProgressReportTasks] = useState('');
  const [issuesGTE, setIssuesGTE] = useState('');
  const [issuesLTE, setIssuesLTE] = useState('');
  const [country, setCountry] = useState('');
  const selectedCountry = useRef(null);

  const changeTopicStatus = (ev) => {
    setIsClosed(ev.target.value);
  };

  const changeNoOfIssues = (ev) => {
    setNoOfIssues(ev.target.value);
  };

  const changeProgressReportCompleted = (ev) => {
    setProgressReportCompleted(ev.target.value);
  };

  const changeNoOfProgressReportTasks = (ev) => {
    setNoOfProgressReportTasks(ev.target.value);
  };

  const changeIssuesGTE = (ev) => {
    setIssuesGTE(ev.target.value);
  };

  const changeIssuesLTE = (ev) => {
    setIssuesLTE(ev.target.value);
  };

  const changeCountry = (value) => {
    setCountry(value);
  };

  const toggleShowFilters = () => {
    // if (!shouldLoadComment.current) shouldLoadComment.current = true;
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const onChange = (ev) => {
      changeCountry(ev.target.value);
    };

    selectedCountry.current.addEventListener('change', onChange);

    // return () => {
    //     selectedCountry.current.removeEventListener('change', onChange);
    // };
  }, []);

  useEffect(() => {
    // Update the search params if any of the filters change
    props.setSearchParams({
      isClosed: {
        label: 'Closed: ',
        value: isClosed,
        query: 'is_closed',
      },
      noOfIssues: {
        label: 'issues: ',
        value: noOfIssues,
        query: 'no_of_issues',
      },
      progressReportCompleted: {
        label: 'progress report completed: ',
        value: progressReportCompleted,
        query: 'progress_report__is_completed',
      },
      noOfProgressReportTasks: {
        label: 'tasks in progress report: ',
        value: noOfProgressReportTasks,
        query: 'progress_report__total_no_of_tasks',
      },
      issuesGTE: {
        label: 'issues >= ',
        value: issuesGTE,
        query: 'no_of_issue__gte',
      },
      issuesLTE: {
        label: 'issues <= ',
        value: issuesLTE,
        query: 'no_of_issues__lte',
      },
      country: {
        label: '',
        value: country,
        query: 'country',
      },
    });
  }, [
    isClosed,
    noOfIssues,
    progressReportCompleted,
    noOfProgressReportTasks,
    issuesGTE,
    issuesLTE,
    country,
  ]);

  return (
    <div className={`filters-container ${isMobile ? 'mobile' : ''}`}>
      <div className="filters-label-container">
        <div className="filters-label">Filters</div>
        {isMobile && (
          <div className="toggle-filters" onClick={toggleShowFilters}>
            <FontAwesomeIcon
              icon={`${showFilters ? 'chevron-up' : 'chevron-down'}`}
            />
          </div>
        )}
      </div>
      <div
        className={`filters ${
          isMobile ? (showFilters ? '' : 'display-none') : ''
        }`}
      >
        <div className="filter-group">
          <div className="filter-label">Topic status</div>
          <select
            id="topic-status"
            value={isClosed}
            onChange={changeTopicStatus}
          >
            <option value={false}>Open</option>
            <option value={true}>Closed</option>
          </select>
        </div>
        <div className="filter-group">
          <div className="filter-label">Number of Issues</div>
          <input
            type="number"
            value={noOfIssues}
            min={0}
            onChange={changeNoOfIssues}
          />
        </div>

        <div className="filter-group">
          <div className="filter-label">Progress Report Status</div>
          <select
            id="progress-report-status"
            value={progressReportCompleted}
            onChange={changeProgressReportCompleted}
          >
            <option value={true}>Completed</option>
            <option value={false}>Not Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <div className="filter-label">Number of Tasks in Progress Report</div>
          <input
            type="number"
            value={noOfProgressReportTasks}
            min={0}
            onChange={changeNoOfProgressReportTasks}
          />
        </div>

        <div className="filter-group">
          <div className="filter-label">
            Number of Issues Greater than/Equal to :
          </div>
          <input
            type="number"
            value={issuesGTE}
            min={0}
            onChange={changeIssuesGTE}
          />
        </div>

        <div className="filter-group">
          <div className="filter-label">
            Number of Issues Less than/Equal to :
          </div>
          <input
            type="number"
            value={issuesLTE}
            min={0}
            onChange={changeIssuesLTE}
          />
        </div>

        <Country selectedCountry={selectedCountry} />
      </div>
    </div>
  );
}
