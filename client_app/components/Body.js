import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Room from './Room';
import flashObj from '../services/FlashService';
import _string from 'lodash/string';

const Body = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [joinees, setJoinees] = useState([]);
	const [users, setUsers] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [inputVal, setInputVal] = useState(null);
	const [inputEl, setInputEl] = useState(null);
	const [usernamePresent, setUsernamePresent] = useState(false);

  useEffect(() => {
    props.apiService.getUsers()
      .then(response => {
				setUsers(response.data.object);
			})
			.catch((error) => console.log(error));
		props.apiService.getRooms()
		.then(response => {
			setRooms(response.data.object);
		})
		.catch((error) => console.log(error));
	}, []);

	const handleInputChange = (e) => {
		e.persist();
		setInputVal(e.target.value);
		setInputEl(e.target);
	}

	const submitForm = (e) => {
		e.preventDefault();
		if (inputEl.id == 'username') {
			props.apiService.createUser(inputVal)
      .then(response => {
				if (response.status == 202) {
					flashObj.set('primary', response.data.message);
				} else {
					flashObj.set('success', response.data.message);
					setUsers(users => users.concat(response.data.object));
				}
				setCurrentUser(response.data.object);
				inputEl.value = null;
				setUsernamePresent(true);
			})
      .catch((error) => console.log(error));
		} else {
			props.apiService.createRoom(inputVal)
      .then(response => {
				if (response.status == 202) {
					flashObj.set('primary', response.data.message);
				} else {
					flashObj.set('success', response.data.message);
					setRooms(rooms => rooms.concat(response.data.object));
				}
				inputEl.value = null;
			})
      .catch((error) => console.log(error));
		}
	}

	const joinRoom = (room) => {
		setSelectedRoom(room);
		props.apiService.joinRoom(room.id, currentUser.id)
      .then(response => {
				flashObj.set('success', response.data.message);
				setJoinees(joinees => joinees.concat(response.data.object.users));
			})
      .catch((error) => console.log(error));
	}

	function renderNameForm() {
		return (
			<Form inline onSubmit={submitForm}>
				<h4>{'Hi! Please enter your user name.'}</h4>
				<br /><br />
				<FormGroup>
					<Input type="username" name="username" id="username"
						placeholder="@ Username" onChange={handleInputChange}
					/>
				</FormGroup>
				{' '}
				<Button color="primary" type="submit">Submit</Button>
			</Form>
		);
	}

	function renderRoomForm() {
		return (
			<Form inline onSubmit={submitForm}>
				<h4>{`${_string.startCase(currentUser.name)}, please join a listed room or create new.`}</h4>
				<br /><br />
				<FormGroup>
					<Input type="room" name="room" id="room"
						placeholder="@ Room" onChange={handleInputChange}
					/>
				</FormGroup>
				{' '}
				<Button color="primary" type="submit">Submit</Button>
			</Form>
		);
	}

	function renderUsers() {
    if (users.length > 0) {
			function renderUser() {
				return users.map((user) => {
					return(
						<ListGroupItem key={user.id} className="user">
							<span className="link"
								onClick={() => {
									setCurrentUser(user);
									setUsernamePresent(true);
								}}
							>
								{ _string.startCase(user.name) }
							</span>
						</ListGroupItem>
					);
				});
			}
			return (
				<div className="user-list">
					<h5>{'Active Users'}</h5>
					<ListGroup className="users">{ renderUser() }</ListGroup>
				</div>
			);
    }
    return null;
	}

	function renderRooms() {
    if (rooms.length > 0) {
			function renderRoom() {
				return rooms.map((room) => {
					return(
						<ListGroupItem key={room.id} className="room">
							<span className="link" onClick={() => joinRoom(room)}>
								{ _string.startCase(room.name) }
							</span>
						</ListGroupItem>
					);
				});
			}
			return (
				<div className="room-list">
					<h5>{'Chat Rooms'}</h5>
					<ListGroup className="rooms">{ renderRoom() }</ListGroup>
				</div>
			);
    }
    return null;
	}

	function renderForm() {
		if (usernamePresent) {
			return renderRoomForm();
		}
		return renderNameForm();
	}

	function renderList() {
		if (usernamePresent) {
			return renderRooms();
		}
		return renderUsers();
	}

	function renderBody() {
		if (selectedRoom) {
			return (
				<Room room={selectedRoom} user={currentUser}
					joinees={joinees} apiService={props.apiService} />
			);
		}
		return (
			<Container className="form-container">
      	<Row>
					<Col xs="6">
						{ renderForm() }
					</Col>
				</Row>
				<br /><br /><br />
				<Row>
					<Col xs="5">
					{ renderList() }
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<div className="body">
			{ renderBody() }
		</div>
	);
}

export default Body;
