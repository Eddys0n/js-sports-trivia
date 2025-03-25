
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {
	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {
		const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
		const response = await fetch(url)
		const json = await response.json()
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	}
	// todo: create your "renderQuestion" function
	const renderQuestion = async ({ question, answers, correct }) => {
			questionElement.textContent = decodeHtml(question)
					
			answers.forEach((incorrect_answers, correct_answer)  => {
				const button = document.createElement('button')
				button.textContent = incorrect_answers, correct_answer
				answersElement.append(button)
				
			})			
			
			if (answer === correct) {
				button.classList.add('correct')
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
				alert('Correct!')
				return
			}
			
			button.disabled = true
			alert('Incorrect!')
			
		})
		
	}

	// todo: add the event listener to the "nextQuestion" button
	const button = document.getElementById('nextQuestion')
	button.addEventListener('click', async ()=> {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
		})
})()
// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
