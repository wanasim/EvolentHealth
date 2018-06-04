import React, { Component } from 'react';
import ListContacts from './components/ListContacts';
import CreateContact from './components/CreateContact';
import EditForm from './components/EditForm';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addContact, deleteContact, editContact} from './actions';

class App extends Component {
  render() {
    return (
         <div>
            <Route exact path='/' render={() => (
               <ListContacts onDeleteContact={this.props.deleteContact} contacts={this.props.allContacts}/>
            )}/>


            <Route path='/create' render={ ({history}) =>
               <CreateContact onCreateContact={(contact) =>  {
                  this.props.addContact(contact)
                  history.push('/')
               }}/>
            }/>
            <Route path='/edit/:id' render={ (props) =>
               <EditForm {...props} key={this.props.location.key} allContacts={this.props.allContacts} onEditContact={(contact, props) =>  {
                  this.props.editContact(contact)
                  this.props.history.push('/')
                  
               }}/>
            }/>
         </div>
    )
  }
}

function mapStateToProps({contacts}){
  return {
    allContacts: contacts.all_contacts
  }
}

function mapDispatchToProps(dispatch){
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    deleteContact: (contact) => dispatch(deleteContact(contact)), 
    editContact: (contact) => dispatch(editContact(contact))
  }
}
// exporting App.js file so other files can import
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))