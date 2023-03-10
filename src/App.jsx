import { useState } from 'react'
import './App.css'
import {Configuration, OpenAIApi} from "openai";

const OPENAI_API_KEY = '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';


function App() {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [answer, setAnswer] = useState("");
    const [answerShown, setAnswerShown] = useState(false);


    const generateResponse = async (question) => {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Give a similar test question to this: " + question,
            max_tokens: 100,
        })
        setResponse(completion.data.choices[0].text);

        const answer = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Answer and give an explanation for this question: " + completion.data.choices[0].text,
            max_tokens: 100,
        })
        setAnswer(answer.data.choices[0].text);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        generateResponse(prompt)
    }

    const toggleAnswer = (e) => {
        e.preventDefault();
        setAnswerShown(!answerShown);
    }


    return (
        <div>
            <h1>Study App</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder={"Enter your question"}
                    rows="4"
                    cols="50"
                    onChange={(e)=>setPrompt(e.target.value)}
                />
                <br/>
                <br/>
                <button type={"submit"}>
                    generate similar question
                </button>
            </form>
            <p>{response}</p>
            {!answerShown && (response !== "") &&
                <>
                    <button onClick={toggleAnswer}>
                        Show Answer
                    </button>
                </>
            }
            {answerShown &&
                <>
                    <button onClick={toggleAnswer}>
                    Hide answer
                    </button>
                    <p>{answer}</p>
                </>
            }
        </div>
    );
}

export default App
