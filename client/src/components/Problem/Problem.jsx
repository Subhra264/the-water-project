import Card from '../Card/Card';
import useViewport from '../../hooks/useViewport';
import '../Home/Home.scss';
import './Problem.scss';
import probImg1 from '../../assets/img/problem_1.jpg';
import probImg2 from '../../assets/img/problem_2.jpg';
import probImg3 from '../../assets/img/problem_3.jpg';
import probImg4 from '../../assets/img/problem_4.jfif';
import probImg5 from '../../assets/img/problem_5.jpg';
import probImg6 from '../../assets/img/problem_6.jpg';

export default function Problem() {
  const { isMobile } = useViewport();

  return (
    <div className={`problem ${isMobile ? 'mobile' : ''}`}>
      <div className="banner">
        <div className="banner-container">
          <h1>
            There are lot of problems waiting for solutions. Help to solve them.
            Let us fight unitedly.
          </h1>
          {/* <a href="https://the-water-project.eu-gb.mybluemix.net/ui/" target="blank">View our dashboard</a> */}
        </div>
      </div>
      <div className="card-wrapper problem-fact-container">
        <Card className="cards">
          <Card.CardDetails className="card-details">
            <p>
              Around 74 per cent of natural disasters between 2001 and 2018 were
              water-related, including droughts and floods. The frequency and
              intensity of such events are only expected to increase with
              climate change.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg1} alt="problem" />
          </Card.CardImg>
        </Card>
        <Card className="cards alternate-cards">
          <Card.CardDetails className="card-details">
            <p>
              Around 450 million children live in areas of high or extremely
              high water vulnerability. This means they do not have enough water
              to meet their everyday needs.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg2} alt="problem" />
          </Card.CardImg>
        </Card>
        <Card className="cards">
          <Card.CardDetails className="card-details">
            <p>
              Every day, over 700 children under 5 die from diarrhoea linked to
              inadequate water, sanitation and hygiene.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg4} alt="problem" />
          </Card.CardImg>
        </Card>
        <Card className="cards alternate-cards">
          <Card.CardDetails className="card-details">
            <p>
              By 2040, almost 1 in 4 children will live in areas of extremely
              high water stress.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg6} alt="problem" />
          </Card.CardImg>
        </Card>
        <Card className="cards">
          <Card.CardDetails className="card-details">
            <p>
              Rising sea levels are causing fresh water to become salty,
              compromising the water resources millions of people rely on.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg5} alt="problem" />
          </Card.CardImg>
        </Card>
        <Card className="cards alternate-cards">
          <Card.CardDetails className="card-details">
            <p>
              The effects of climate change are first felt through water –
              through droughts, floods or storms. When these disasters hit, they
              can wipe out entire water supplies or leave them contaminated,
              risking the lives of millions of children.
            </p>
          </Card.CardDetails>
          <Card.CardImg className="card-imgs">
            <img src={probImg3} alt="problem" />
          </Card.CardImg>
        </Card>
      </div>
    </div>
  );
}
