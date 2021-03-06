import React from 'react';
import QRCode from 'qrcode.react';

const qrcode = (props)=>{
    return (
        <div className='qrcodediv'>
        <QRCode className = 'qrcode' value={props.qrString} />
        </div>
      );
}

export default qrcode;