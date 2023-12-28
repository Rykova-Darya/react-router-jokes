import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import Loader from '../UI/Loader';
import styles from './JokeForm.module.css';

const JokeForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const topicInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsFormFocused(true);
    console.log('Form is focused');
  }

  const sendDataHandler = () => {
    setIsFormFocused(false);
  }

  return (
    <Fragment>
    <Prompt when={isFormFocused} message={(location) => `вы действительно хотите перейти на страницу ${location}? Все данные, введенные в форму будут утрачены!`} />
    <Card>
      <form onFocus={formFocusHandler} className={styles.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}

        <div className={styles.control}>
          <label htmlFor='topic'>Topic</label>
          <input type='text' id='topic' ref={topicInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={styles.actions}>
          <button onClick={sendDataHandler} className='btn'>Add Joke</button>
        </div>
      </form>
    </Card>
    </Fragment>

  );
};

export default JokeForm;
