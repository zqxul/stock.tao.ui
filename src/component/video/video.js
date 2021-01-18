import React from 'react'

export default class LiveVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handlePlay = () => {
        navigator.getUserMedia ||
            (navigator.getUserMedia = navigator.mozGetUserMedia ||
                navigator.webkitGetUserMedia || navigator.msGetUserMedia);

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: true,
                audio: false
            }, this.handleSuccess, this.handleError);
        } else {
            alert('getUserMedia is not supported in this browser.');
        }
    }

    handleSuccess = (stream) => {
        let video = document.getElementById('webcam')
        video.autoplay = true;
        video.src = window.URL.createObjectURL(stream);
    }

    handleError = (error) => {

        console.log('get user media error:', error)
    }


    render() {
        return (
            <div>
                <video id="webcam" controls width="250"></video>
                <button onClick={this.handlePlay}>播放</button>
            </div>
        )
    }



}