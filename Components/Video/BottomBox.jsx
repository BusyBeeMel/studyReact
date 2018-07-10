import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components


// Styles
import styleVideo from '../../Styles/Components/Video.css';
import styles from '../../Styles/App.css';

// Utils
import CKEditor from "react-ckeditor-component";

class BottomBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            content: 'content',
        }

        this.config = {
            language: 'ko',
            height:485,
            removePlugins :'elementspath',
            resize_enabled: false,
            filebrowserUploadUrl: 'http://13.124.177.122/media/image/ckeditor',
            toolbar : [
                {name: 'clipboard', items: ['Undo', 'Redo', '-']},
                {name: 'styles', items: ['Styles', 'Format']},
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']},
                {name: 'links', items: ['Link', 'Unlink']},
                {name: 'insert', items: ['Image', 'HorizontalRule', 'Table', ]},
                {name: 'tools', items: ['Maximize']},
                {name: 'editing', items: ['Scayt']},
            ]
        }
    }

    onChange(evt){
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.props.descriptionChange(newContent);
    }

    onBlur(evt){
        console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt){
        console.log("afterPaste event called with event info: ", evt);
    }

    render() {
        return (
            <div className={styleVideo.formBottomBox}>
                <div className={styleVideo.top}>
                    <label className={styleVideo.topTitle}>영상 설명</label>
                </div>

                <div className={styleVideo.editorContainer}>

                    <CKEditor
                        content={this.props.description}
                        events={{
                            "blur": this.onBlur,
                            "afterPaste": this.afterPaste,
                            "change": this.onChange
                        }}
                        config={this.config}
                    />

                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BottomBox));