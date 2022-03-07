import { useState } from "react";
import "./App.css";

const exampleText =
  "jnx bjcrqyxbj trchx zq jnx oqzpxcbx zb g novgq exzqy szpzqy hrqbzbjxqjsd lzjn nzb zaxqjzjd --jrqd creezqb";
const exampleText2 = `bzskfbl fj fyczjjfhaw; skw rznp fsjwae jiqj "f'y czjjfhaw!" --ivpnwq kwchvnb`;
const exampleText3 = `sicv sj crvntnlcvj zjaeho httybz, qyv sicv sj ajczv juljtv djrjbcaax iclljrz --qjrgconr enzbcjan`;
const exampleText4 = `rw'z hm wf afh yfb jpv afh xdw afhvzdxj jpxx ptc yfb xftu rw wpndz afh wf udw opqn hm ptc zqptc ft afhv fbt wbf jddw --ldjjvda srwqydxx`;
const exampleText5 = `tgz nvt bgl prvjcor cl fyrb cl yvmmrbh, dzl v ecke cb lyr lrrly nvt dr lyr drhl lycbw cb lyr fgpja xgp tgz --fvjl achbrt`;
const exampleText6 = `dnk aufx tix xac wix eayyked dnk oig dnpulz pu xacy sizd pz da igg okddky dnpulz da xacy jcdcyk --znpfan wayypzau`;

const alphabet = "abcdefghijklnmopqrstuvwxyz".split("");

function CodedCell({ char, guess }) {
  console.log("DEBUG: CodedCell", char, guess);

  let value;
  if (/[a-z]/.test(char)) {
    value = guess ?? "\u00a0";
  } else {
    value = char;
  }

  return (
    <div className="decoded_text_cell">
      {char}
      <br />
      <div className="decoded_text_guess">{value}</div>
    </div>
  );
}

function App() {
  const [rubric, setRubric] = useState({});
  const [codedText, setCodedText] = useState(exampleText5);

  const letterUsage = {};
  codedText.split("").forEach((char) => {
    if (/[a-z]/.test(char)) {
      const count = letterUsage[char] ?? 0;
      letterUsage[char] = count + 1;
    }
  });

  const words = codedText.split(/\s+/);
  console.log("DEBUG: words", words);

  return (
    <div className="app">
      Rubric
      <br />
      <br />
      <div className="alphabet">
        {alphabet.map((letter) => (
          <div className="alphabet_letter" key={letter}>
            {letter.toUpperCase()}
            <br />
            <select
              onChange={(e) => {
                const value = e.target.value;
                const nextLetter = value === "-" ? undefined : value;

                setRubric({
                  ...rubric,
                  [letter]: nextLetter,
                });
              }}
              value={rubric[letter]}
            >
              <option value="-"></option>
              {alphabet.map((letter) => (
                <option key={`option-${letter}`} value={letter}>
                  {letter.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <hr />
      <div>
        Coded text
        <br />
        <br />
        <textarea
          className="coded_text_input"
          onChange={(e) => {
            setCodedText(e.target.value);
          }}
          value={codedText}
        />
      </div>
      <hr />
      <div className="coded_text">
        {words.map((word) => (
          <div className="coded_text_word">
            {word.split("").map((char, i) => (
              <CodedCell char={char} guess={rubric[char]} key={`char-${i}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
