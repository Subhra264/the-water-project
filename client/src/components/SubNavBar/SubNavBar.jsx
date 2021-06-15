import { Link } from 'react-router-dom';

export default function SubNavBar(props) {
    const barItems = [
        <div className='sub-navbar-item' key='home'>
            <Link to='/home'>Home</Link>
        </div>,
        <div className='sub-navbar-item' key='problems'>
            <Link to='/problems'>Problems</Link>
        </div>,
        <div className='sub-navbar-item' key='solutions'>
            <Link to='/solutions'>Solutions</Link>
        </div>,
        <div className='sub-navbar-item' key='discussion'>
            <Link to='/discussion'>Discussion</Link>
        </div>
    ];

    return (
        barItems.map(barItem => barItem)
    )
}