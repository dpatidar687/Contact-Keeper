//when we require only one input space in the form we can use useRef hook from the react
import React, { Fragment, useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';
import Speech from './Speech';


const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  
  const onChange = (e) => {
    // console.log(e);
    if (text.current.value !== '') 
    {
      if(e.target.value)
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  const speechData = (data)=>{
    console.log(data);
    if(data!=null){
      text.current.value = data;
      filterContacts(text.current.value);
    }
    else{
      clearFilter();
    }
  }
  return (
    <Fragment>
    <form className= 'search'>
      <input
        ref={text}
        type="text"
        placeholder="Search Contacts..."
        onChange={onChange}
       />
       <Speech speechData = {speechData}/>
     </form>
    
    </Fragment>
  );
};
export default ContactFilter;
