import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Form, Input, Button } from 'reactstrap';
import _string from 'lodash/string';

const Room = (props) => {
	const [inputVal, setInputVal] = useState(null);
	const [inputEl, setInputEl] = useState(null);
	const [messages, setMessages] = useState([]);

	const handleInputChange = (e) => {
		e.persist();
		setInputVal(e.target.value);
		setInputEl(e.target);
	}
	
	const submitForm = (e) => {
		e.preventDefault();
		props.apiService.submitMessage(inputVal)
      .then(response => {
				flashObj.set('success', response.data.message);
				setMessages(messages => messages.push(response.data.object));
				inputEl.value = null;
			})
      .catch((error) => console.log(error));
	}

	function renderMessagesBox() {
		if (messages.length > 0) {
			console.log(messages);
		}
		return (
			<div className="messages-box">
				<Row>
					<Col xs="6">
						<div className='user-prof'>
							<div className='user-img'>
								<img src="https://ptetutorials.com/images/user-profile.png" alt="user" />
							</div>
							<div className='user-name'>
								John
							</div>
						</div>
					</Col>
					<Col xs="5">
						<div className='message'>
							This is a test message.
						</div>
					</Col>
				</Row>
			</div>
		);
	}

	function renderJoinees() {
		return (
			<div className="joinees">
				<Row>
					<Col xs="6">
						<div className='user-prof'>
							<span className='user-img'>
								<img className='prof-img' src="https://ptetutorials.com/images/user-profile.png" alt="user" />
							</span>
							<span className='user-name'>
								John
							</span>
						</div>
					</Col>
				</Row>
			</div>
		);
	}

	function renderMessageForm() {
		return (
			<div className="message-form">
				<Form onSubmit={submitForm}>
					<Input type="message" name="message" id="message" 
						placeholder="Type your message" onChange={handleInputChange}
					/>
					<Button color="primary" type="submit">Submit</Button>
				</Form>
			</div>
		);
	}

	return (
		<Container className="room-container">
			<h4>{_string.startCase(props.room.name)}</h4>
			<Row>
				<Col xs="6">
					{ renderMessagesBox() }
				</Col>
				<Col xs="5">
					{ renderJoinees() }
				</Col>
			</Row>
			<Row>
				<Col xs="5">
				{ renderMessageForm() }
				</Col>
			</Row>
		</Container>
	);
}

export default Room;