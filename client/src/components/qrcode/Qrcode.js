import React from 'react';
import QRCode from 'qrcode.react';

const qrcode = (props)=>{
    return (
        <div className='qrcodediv'>
        <QRCode className = 'qrcode' value={props.qrString}  includeMargin='true' renderAs='svg'/>
        </div>
      );
}

export default qrcode;