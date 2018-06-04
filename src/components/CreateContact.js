import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import serializeForm from 'form-serialize';
import FormLayout from './FormLayout.js'

class CreateContact extends Component {
   state = {
     finalInput:{}
   }
  
   _handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, { hash: true})
      values.firstName = values.firstName.charAt(0).toUpperCase()
      values.lastName = values.lastName.charAt(0).toUpperCase()
      values.id = Math.random().toString(36).substr(2,10)
      if ( this.props.onCreateContact){
      this.setState({finalInput:values}, ()=>{
        
        this.props.onCreateContact(values)
      })}
   }
   
   _handleInput = (e) => {
     const input = e.target.value
     const name = e.target.name 
     this.setState({name:input}, () =>{
       this._validateInput(name, input)
     })
   }
   
   _validateInput = (name, input) => {
     let firstNameValid
     const nameError = "Names must be at least 2 characters"
     switch(name){
      case 'firstName':
        firstNameValid = input.length > 1;
        break;
      case 'lastName':
        firstNameValid = input.length > 1;
        
        break;
      default:
        break;
     }
     this.setState({firstNameValid}, this._validateForm)
   }
   
   _validateForm = () => {
     this.setState({validForm: this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.phoneValid})
   }

   render() {
      return(
         <div>
            <Link className="close-create-contact" to="/">Close</Link>
            <form onSubmit={this._handleSubmit} className="create-contact-form">
               <FormLayout form={"create"}/>
            </form>
         </div>
      )
   }
}

export default CreateContact
