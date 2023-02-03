import Gig from './Gig/Gig';

export default function Gigs(props) {
  return (
    <>
      {!props.gigList.length ? (
        <div className="no-results-container">
          <div className="no-results">No Blogs</div>
        </div>
      ) : (
        props.gigList.map((gig) => <Gig {...gig} key={gig.id} />)
      )}
    </>
  );
}
