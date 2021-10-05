import React from 'react'
import ReactDom from 'react-dom';


const OverlayComponent = (props) => {
    return ReactDom.createPortal(
        <div style={{ display: props.collapsed ? 'block' : 'none' }} className="overlay">
        </div>,
        document.getElementById('portal-root')
    );
}

export default OverlayComponent
