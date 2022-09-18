import React from "react";
import '../App.css';
import { useEffect } from "react";
import '../styles/profile.css';
import Delete from '../assets/image/delete.png';
import Edit from '../assets/image/edit.png'
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setUsers,setTodo,setMessage,setEdit,setValueAddTodo} from '../redux/actions/todo';


function ProfileComponent ({setUsers,setTodo,setMessage,setEdit,setValueAddTodo,users,todo,message,edit,valueAddTodo}) {

  function deleteTodo (id) {
    let newTodo = [...todo].filter(item => item.id !== id);
    setTodo(newTodo);
    localStorage.setItem('post', JSON.stringify(newTodo));
  };

  function saveTodo () {
    if(!message){
      return
    }
    const currentTodo = [...todo,{
      id: uuidv4(),
      title:message,
    }]
    setTodo(
      currentTodo
    )
    localStorage.setItem('post', JSON.stringify(currentTodo));
    setMessage('');
  };

  function editTodo (id,title) {
    setEdit(id);
    setValueAddTodo(title);
    localStorage.setItem('post', JSON.stringify(todo));
  };

  function saveEditTodo (id) {
    let newTodo = [...todo].map(item => {
      if(item.id === id) {
        item.title = valueAddTodo
      }
      return item
    })
    setTodo(newTodo);
    setEdit(null);
    localStorage.setItem('post', JSON.stringify(todo))
  }
  
  useEffect(() => {
    if(localStorage.getItem('users') !== null){
        let user = JSON.parse(localStorage.getItem('users'));
        setUsers(user);
    } else {
      fetch('https://fakestoreapi.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        localStorage.setItem('users',JSON.stringify(data));
      })
    };
  }, []);

  useEffect(() => {
    if(localStorage.getItem('post') !== null){
      let post = JSON.parse(localStorage.getItem('post'));
      setTodo(post);
    } else {
          localStorage.setItem('post', JSON.stringify(todo));
    }
  }, []);

  return (
    <div className="profileWrapper">
      <div>
        <div className="wrapperUser">
          <img className="avatar" src="https://www.awicons.com/free-icons/download/application-icons/dragon-soft-icons-by-artua.com/png/512/User.png" alt="" />
          <div className="infoUser">
            <div>Name : {users?.name.firstname}</div>
            <div>Lastname :{users?.name.lastname}</div>
            <div> E-mail :{users?.email}</div>
            <div>City: {users?.address.city}</div>
            <div> Street : {users?.address.street}</div>
            <div> Phone: {users?.phone}</div>
          </div>
        </div>
      </div>
      <div className="toDoList">
        <div className="addTodo">
          <textarea className="createTodo"  placeholder='Введите текст' value={message} onChange={(e) => setMessage(e.target.value)}/>
          <Button className="publish" onClick={saveTodo} variant="success">Опубликовать</Button>
        </div>
          {todo.map(item =>(
            <div className="post" key={item.id}>
              {
                edit == item.id ? 
                  <div>
                    <input className="editInput" value={valueAddTodo} onChange={(e) => setValueAddTodo(e.target.value)} type="text"/>
                  </div> :
                  <div> {item.title} </div>    
              }
              {
                edit == item.id ?
                  <div className="save">
                    <Button className="saveEdit" onClick={() => saveEditTodo(item.id)} variant="warning">Сохранить</Button>
                  </div>:
                  <div className="test">
                    <img className="iconPost" src={Delete} onClick={() => deleteTodo(item.id)}/>
                    <img className="iconPost" src={Edit} onClick={() => editTodo(item.id, item.title)}/>
                  </div>
              }
              </div>
            ))
          }
      </div>
    </div>
  )
};

const mapStateToProps = state => (
  {
    users : state.todo.users,
    todo : state.todo.todo,
    message: state.todo.message,
    edit: state.todo.edit,
    valueAddTodo: state.todo.valueAddTodo,
  }
);

const mapDispatchToProps = dispatch => bindActionCreators({
  setUsers: setUsers,
  setTodo: setTodo,
  setMessage: setMessage,
  setEdit: setEdit,
  setValueAddTodo: setValueAddTodo,
},dispatch);

export const Profile = connect(mapStateToProps,mapDispatchToProps)(ProfileComponent);