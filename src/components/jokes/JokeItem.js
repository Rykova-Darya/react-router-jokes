import styles from './JokeItem.module.css';
import { Link, useLocation } from 'react-router-dom';

const JokeItem = (props) => {
  const location = useLocation();
  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.topic}</figcaption>
      </figure>
      <Link to={`${location.pathname}/${props.id}`} className='btn'>Expand</Link>
    </li>
  );
};

export default JokeItem;
