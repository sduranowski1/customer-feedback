import React, { useState, useCallback, useEffect } from "react";
import axios, { Axios } from "axios";
import ReactPaginate from 'react-paginate'

export default function App({ setOpenModal}) {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const [questions, setQuestions] = useState([]);
	const [requestError, setRequestError] = useState()

	const [users, setUsers] = useState([]);

	const [popup, setPop] = useState(false)
	const handleClickOpen=()=>{
		setPop(!questions)
	}
	const ClosePopup=()=>{
		setPop(false)
	}

	

	const apiUrl = 'http://localhost:5000'


	useEffect(() => {
		async function fetchData() {
			try {
				const req = await axios.get(`${apiUrl}/card`)
				console.log('Data has been received')
				console.log(axios.get(`${apiUrl}/card`))
				setQuestions(req.data)
			} catch(err) {
				setRequestError(err.message)
			}
		}
		fetchData();	
	}, [])


	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	const handleDelete = async (_id) => {
        await fetch(`${apiUrl}/card` + _id, {
            method: "DELETE"
        } )

	

        const newQuestions = questions.filter(question => question._id != _id)
        setQuestions(newQuestions)
    }

	function delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	  }

	const [visible, setVisible] = useState(true);

	const removeElement = () => {
		delay(1000).then(() => setVisible((prev) => !prev))
		
	};

	const date1 = new Date();

	var req = new XMLHttpRequest();
	req.open('GET', document.location, false);
	req.send(null);
	const headers = req.getAllResponseHeaders().split("\n")
		.map(x=>x.split(/: */,2))
		.filter(x=>x[0])
		.reduce((ac, x)=>{ac[x[0]] = x[1];return ac;}, {});

	async function sleep(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}



	const [friends, setFriends] = useState([])

	function handleClick(e) {
		e = e || window.event;
		e = e.target || e.srcElement;

		friends.push(e.innerText);
		console.log(e.innerText)
		console.log(friends)
		
	}


	

	const url = "http://localhost:3000/answer"
	let friends1 = {
		answer1: friends[0],
		answer2: friends[1],
		answer3: friends[2],
		answer4: friends[3],
		answer5: friends[4],
	}

	const [data, setData] = useState({
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		answer5: "",
	})

	console.log('POST data', friends1);
    let payloadString = JSON.stringify(friends1);

	function submit(e) {
		e.preventDefault()
		axios.post(url,{
			answer1: friends[0],
			answer2: friends[1],
			answer3: friends[2],
			answer4: friends[3],
			answer5: friends[4],
			answer6: friends[5],
			answer7: friends[6],
			answer8: friends[7],
			answer9: friends[8],
			answer10: friends[9],
			appCodeName: String(navigator.appCodeName),
			product: String(navigator.product),
			appVersion: String(navigator.appVersion),
			cookiesEnabled: String(navigator.cookiesEnabled),
			language: String(navigator.language),
			appName: String(navigator.appName),
			onLine: String(navigator.onLine),
			userAgent: String(navigator.userAgent),
			timeZoneOffset: date1.getTimezoneOffset(),
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			fonts: String(document.fonts.length),
			dnt: String(navigator.doNotTrack),
			platform: String(navigator.platform),
			maxTouchPoints: String(navigator.maxTouchPoints),
			cpuClass: String(navigator.oscpu),
			hardwareConcurrency: String(navigator.hardwareConcurrency),
			devMemory: String(navigator.deviceMemory),
			plugins: navigator.plugins.length
			
		})
		.then(res=>{
			console.log(res.data)
		})
	}


	return (
		<div >
			<form action="POST" onClick={handleClick} onSubmit={(e) => submit(e)}>
				<div className='app'>
					<h1>The final step</h1>
					{visible && (
						<button type="submit" onClick={removeElement}>Submit</button>
					)}
				</div>
			
			{questions.map((question, i) => (
				
				<div className='app' key={i}>

						<>
							<div className='question-section'>
								<h1>{question.question}</h1>
							</div>
							
							<div className='answer-section' >
								{question.item.map((x, i) => 
									<span value={x} key={i} onClick={() => handleDelete(question._id)}>{x}</span>
								)}
							</div>

						</>
					
				</div>

				
			))}
			</form>
		</div>
		
	);
}

