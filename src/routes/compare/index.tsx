import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { data } from "../../assets/data";
import { Difficulties, EventCategories, TimeEvent } from "../../Model";
import style from "./style.css";

interface Props {
  category: number;
  difficulty: Difficulties;
}

const Compare: FunctionalComponent<Props> = (props) => {

    const makeGuess = (event: MouseEvent) => {
        console.log(event.target.innerHTML);
    }

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
  useEffect(() => {
    console.log(props);
    const filteredList = data.filter((x) =>
      x.categories.find((y) => y & props.category)
    );
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
  }, [props]);

  return (
    <div>
      <h1>Compare</h1>
      <div id="event1" onClick={makeGuess}>{event1.name}</div>
      <div id="vs">vs.</div>
      <div id="event2" onClick={makeGuess}>{event2.name}</div>
    </div>
  );
};

export default Compare;
