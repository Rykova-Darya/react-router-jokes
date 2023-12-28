import { useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import { Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import HighlightedJoke from '../components/jokes/HighlightedJoke';
import { Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";
// const DUMMY_JOKES = [
//     {
//       id: "j1",
//       topic: "Атака титанов",
//       text: "Почему Микаса, Леви и Эрен отказались строить замок из песка на необитаемом острове? Потому что у них было достаточно стен.",
//     },
//     {
//       id: "j2",
//       topic: "Атака титанов",
//       text: "Почему Микс, Леви и Эрен отказались пить в баре? Потому что боялись титанического похмелья!",
//     },
//   ];
const JokeDetails = () => {
  const routeMatch = useRouteMatch();
  console.log(routeMatch);
    const params = useParams();
    const { jokeId} = params;

    const {sendHttpRequest, status, data: loadedJoke, error} = useHttp(getJoke, true)

    useEffect(() => {
      sendHttpRequest(jokeId)
    }, [sendHttpRequest, jokeId])

    if (status === 'pending') {
      return (
        <div className='centered'>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <p className='centered focused'>{error}</p>;
    }


    if (!loadedJoke.text) {
        return <h1 className="centered">Joke is not found</h1>
    }
    return (
        <Fragment>
            <HighlightedJoke text={loadedJoke.text} topic={loadedJoke.topic}/>
            <Route path={`${routeMatch.path}`} exact>
            <div className='centered'>
              <Link className='btn--empty' to={`${routeMatch.url}/comments`}>Show Comments</Link>
            </div>
            </Route>

            <Route path={`${routeMatch.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>


    )
}

export default JokeDetails;