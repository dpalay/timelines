import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { data } from "../../assets/data";
import { Difficulties, EventCategories, TimeEvent } from "../../Model";
import { CategoriesState, ScoreState } from "../../Recoil/recoilState";
import style from "./style.css";

interface Props {
  difficulty: Difficulties;
}

const Compare: FunctionalComponent<Props> = (props) => {
  const categories = useRecoilValue(CategoriesState);
  const [score, setScore] = useRecoilState(ScoreState);

  const event1ref = useRef<HTMLDivElement>(null);
  const event2ref = useRef<HTMLDivElement>(null);
  const [dirty, setDirty] = useState(false);

  const [event1, setEvent1] = useState<TimeEvent>({
    name: "",
    date: new Date(Date.now()),
    categories: [EventCategories.Art],
  });
  const [event2, setEvent2] = useState<TimeEvent>({
    name: "",
    date: new Date(Date.now()),
    categories: [EventCategories.Art],
  });
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDirty(() => false);
    const filteredList = data.filter(
      (value) =>
        value.categories.filter((category) => categories.includes(category))
          .length > 0
    );
    if (filteredList.length > 0) {
      const e1 =
        filteredList[Math.floor(Math.random() * filteredList.length) | 0];
      const e2 =
        filteredList[Math.floor(Math.random() * filteredList.length) | 0];
      setEvent1(e1);
      setEvent2(e2);
      setCorrectAnswer(e1.date < e2.date ? e1.name : e2.name);
    }
  }, [props, dirty, categories]);

  const makeGuess: h.JSX.EventHandler<
    h.JSX.TargetedMouseEvent<HTMLDivElement>
  > = (event): void => {
    if (submitted) return;

    event1ref.current?.classList.remove(style.guessed);
    event2ref.current?.classList.remove(style.guessed);
    const target = event.target as HTMLDivElement;
    target.classList.add(style.guessed);
    setSelectedAnswer(target.innerText);
  };

  const submitGuess: h.JSX.EventHandler<
    h.JSX.TargetedMouseEvent<HTMLInputElement>
  > = (): void => {
    setSubmitted(true);
    setScore((previous) => correctAnswer === selectedAnswer ? previous+1 : previous)
  };
  const nextGuess: h.JSX.EventHandler<
    h.JSX.TargetedMouseEvent<HTMLInputElement>
  > = (): void => {
    event1ref.current?.classList.remove(style.guessed);
    event2ref.current?.classList.remove(style.guessed);
    setSelectedAnswer("");
    setCorrectAnswer("");
    setSubmitted(false);
    setDirty(true);
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <h1>Compare {submitted &&
          (correctAnswer === selectedAnswer ? (
            <span className={style.correct}>Correct!</span>
          ) : (
            <span className={style.incorrect}>Incorrect!</span>
          ))} </h1>
      <div className={style.comparisons}>
        <div className={style.event1}>
          <h2 onClick={makeGuess} ref={event1ref}>
            {event1.name}
          </h2>
          <div hidden={!submitted}>{event1.date.toLocaleDateString()}</div>
        </div>
        <div id="vs">vs.</div>
        <div className={style.event2}>
          <h2 ref={event2ref} onClick={makeGuess}>
            {" "}
            {event2.name}
          </h2>
          <div hidden={!submitted}>{event2.date.toLocaleDateString()}</div>
        </div>
      </div>
  
    <div className={style.scoreArea}>
        <input
          type="button"
          value="Submit"
          hidden={submitted}
          onClick={submitGuess}
        />
        <input
          type="button"
          value="Next"
          hidden={!submitted}
          onClick={nextGuess}
        />
        <br />
        Score: {score}
      </div>
    </div>
  );
};

export default Compare;
