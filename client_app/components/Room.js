import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Form, Input, Button } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import _string from 'lodash/string';
import flashObj from '../services/FlashService';

const Room = (props) => {
	const [inputVal, setInputVal] = useState(null);
	const [inputEl, setInputEl] = useState(null);
	const [messages, setMessages] = useState([]);
	let ws;

	function scrollToBottom(elID) {
		let objDiv = document.getElementById(elID);
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	function subscribe(ws, topicID, peer) {
		// This message format is required by GoReal
		const msg = { topicID:  topicID, peer: peer };
		ws = new WebSocket("ws://localhost:4100/subscribe");
		ws.onopen = function () {
		  console.log("WebSocket connection established with server");
			ws.send(JSON.stringify(msg));
		}
		ws.onclose = function () {
		  console.log("WebSocket connection closed by server");
		}
		ws.onmessage = function (event) {
			let mData = JSON.parse(JSON.parse(event.data));
			setMessages(messages => messages.concat(mData));
			scrollToBottom("messages");
		}
	}

	useEffect(() => {
    props.apiService.getMessagesInRoom(props.room.id)
      .then(response => {
				setMessages(response.data.object);
				scrollToBottom("messages");
				subscribe(ws, props.room.id, props.user.name);
			})
			.catch((error) => console.log(error));

		return () => {
    	ws.close();
	  };
	}, []);

	const handleInputChange = (e) => {
		e.persist();
		setInputVal(e.target.value);
		setInputEl(e.target);
	}

	const submitForm = (e) => {
		e.preventDefault();
		props.apiService.submitMessage(inputVal, props.room.id, props.user.id)
      .then(response => {
				flashObj.set('success', response.data.message);
				inputEl.value = null;
			})
      .catch((error) => console.log(error));
	}

	function renderMessages() {
		if (messages.length > 0) {
			return messages.map((message) => {
				let corner = 'right';
				if (message.author._id == props.user.id) corner = 'left';
				return (
					<Row key={message.id} className={"messages-box " + corner}>
						<Col xs="2" className="user-prof">
							<div className='user-img'>
								<img src="https://ptetutorials.com/images/user-profile.png" alt="user" />
							</div>
							<div className='user-name'>
								{ _string.startCase(message.author.name) }
							</div>
						</Col>
						<Col xs="10" style={{ marginTop: '1.4em', padding: 'unset' }}>
							<div className='message'>
								{ message.text }
							</div>
						</Col>
					</Row>
				);
			});
		}
		return null;
	}

	function renderJoinees() {
		if (props.joinees.length > 0) {
			return props.joinees.map((joinee) => {
				return(
					<Row key={joinee.id} className="joinee">
						<Col>
							<div className='prof'>
								<span className='img'>
									<img className='prof-img' src="https://ptetutorials.com/images/user-profile.png" alt="user" />
								</span>
								<span className='name'>
									{ _string.startCase(joinee.name) }
								</span>
							</div>
						</Col>
					</Row>
				);
			});
    }
    return null;
	}

	function renderMessageForm() {
		return (
			<Form onSubmit={submitForm}>
				<InputGroup>
					<Input type="message" name="message" id="message"
						placeholder="Type your message" onChange={handleInputChange}
					/>
					<InputGroupAddon addonType="append">
						<Button color="primary" type="submit">Submit</Button>
					</InputGroupAddon>
				</InputGroup>
			</Form>
		);
	}

	return (
		<Container className="room-container">
			<h4 style={{ textAlign: 'center' }}>
				{_string.startCase(props.room.name)}
			</h4>
			<Row style={{ height: '350px', border: 'gray solid 1px' }}>
				<Col xs="9" id='messages' style={{ border: 'gray solid 1px', height: '348px', overflow: 'auto' }}>
					{ renderMessages() }
				</Col>
				<Col xs="3" style={{ border: 'gray solid 1px' }}>
					{ renderJoinees() }
				</Col>
			</Row>
			<Row>
				<Col xs="12">
					{ renderMessageForm() }
				</Col>
			</Row>
		</Container>
	);
}

export default Room;
