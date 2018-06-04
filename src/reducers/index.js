import {combineReducers} from 'redux'
import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT} from '../actions'

const initialState = {
  all_contacts: [
    {
      id : "nlwfk5xa8h",
      firstName : "Walid",
      lastName : "Nasim",
      email : "wnasim@test.com",
      phone : "9802296897",
      status : "Active"
    },
  ]
}

function contacts(state=initialState, action){
  switch(action.type){
    case ADD_CONTACT:
      return {
        ...state,
        all_contacts: state.all_contacts.concat({
            id:action.contact.id,
            firstName: action.contact.firstName,
            lastName: action.contact.lastName,
            email: action.contact.email,
            phone: action.contact.phone,
            status: action.contact.status
          })
      }
    case DELETE_CONTACT:
      return {
        ...state,
        all_contacts: state.all_contacts.filter(contact => contact.id !== action.contact.id)
      }
    case EDIT_CONTACT:
      return {
        ...state,
        all_contacts: state.all_contacts.map(contact=>{
          if(contact.id===action.contact.id){
            return {
              ...contact,
              firstName: action.contact.firstName,
              lastName: action.contact.lastName,
              email: action.contact.email,
              phone: action.contact.phone,
              status: action.contact.status
            }
          }
          return contact
        })
      }
    default:
      return state
  }
}

export default combineReducers({contacts})
