import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { data } from "../../assets/data";
import { Difficulties, EventCategories, TimeEvent } from "../../Model";
import { CategoriesState } from "../../Recoil/recoilState";
import style from "./style.css";

interface Props {
  difficulty: Difficulties;
}

const Compare: FunctionalComponent<Props> = (props) => {

    const categories = useRecoilValue(CategoriesState)

    const event1ref = useRef<HTMLDivElement | undefined>(null);
    const event2ref = useRef<HTMLDivElement | undefined>(null);
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

  useEffect(() => {
    setDirty(() => false);
    console.log(props);
    console.log(categories)
    console.log()
    const filteredList = data.filter(value =>  value.categories.filter(category => categories.includes(category)).length > 0);
    console.log(filteredList);
    if (filteredList.length > 0) {  
      const e1 =
        filteredList[Math.floor(Math.random() * filteredList.length) | 0];
      const e2 =
        filteredList[Math.floor(Math.random() * filteredList.length) | 0];
      console.log(e1, e2,e1.date < e2.date ? e1.name : e2.name );
      setEvent1(e1);
      setEvent2(e2);
        setCorrectAnswer(e1.date < e2.date ? e1.name : e2.name);
    }
  }, [props, dirty]);


  const makeGuess: h.JSX.EventHandler<h.JSX.TargetedMouseEvent<HTMLDivElement>> = (event): void => {
    event1ref.current?.classList.remove(style.guessed);
    event2ref.current?.classList.remove(style.guessed);
    const target = event.target as HTMLDivElement;
    target.classList.add(style.guessed)
    setSelectedAnswer(target.innerHTML);
}

const submitGuess: h.JSX.EventHandler<h.JSX.TargetedMouseEvent<HTMLInputElement>> = (event): void => {
if (correctAnswer === selectedAnswer) {
  alert(`Correct!
${event1.name} was on ${event1.date.toLocaleDateString()}  
${event2.name} was on ${event2.date.toLocaleDateString()}`);
}
else {
    alert(`Incorrect!
${event1.name} was on ${event1.date.toLocaleDateString()}  
${event2.name} was on ${event2.date.toLocaleDateString()}`);
}
event1ref.current?.classList.remove(style.guessed);
event2ref.current?.classList.remove(style.guessed);
setSelectedAnswer("");
setCorrectAnswer("");
setDirty(true);
}

  return (
    <div>
      <h1>Compare</h1>
      <div ref={event1ref} id="event1" onClick={makeGuess}>{event1.name}</div>
      <div id="vs">vs.</div>
      <div ref={event2ref} id="event2" onClick={makeGuess}>{event2.name}</div>
      <input type="button" value="Submit" onClick={submitGuess} />
    </div>
  );
};

export default Compare;
