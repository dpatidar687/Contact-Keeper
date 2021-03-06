import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import Qrcode from '../qrcode/Qrcode';


const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light formPadding contactItem">
       <div className = 'contactData'>
      <h3 className="text-primary text-left">
        {name}{'     '}
        <span
          style={{ float: 'right' ,'font-size' : '15px','color' :'black'}}
          className={
            'badge' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
          {/*it is done to make the first letter capital and the rest as small */}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-lg deledit"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-lg deledit" onClick={onDelete}>
          Delete
        </button>
      </p>
      </div>
      <div><Qrcode qrString = {'Name :- '+name+'\n'+'Email :- '+email+'\n'+'Phone :- '+phone} /></div>
      {/* <div><EmailShare contact= {contact} /></div> */}
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
