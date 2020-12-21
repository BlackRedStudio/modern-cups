import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';

import { selectCupText } from '../redux/cup/cup-selectors';

class CupBlueprint extends Component {
    state = {
        test: ''
    }
	xDraggables = {};
	isRotating = false;

	handleTextClick(e) {
		const xElem = subjx(e.target);
		this.xDraggables = xElem.drag({
			container: '#containerParent',
			restrict: '#containerParent',
			rotationPoint: true,
			snap: {
				x: 30,
				y: 30,
				angle: 10
			},
			resizable: false,
			onRotate: () => {
				this.isRotating = true;
			},
			onDrop: () => {
				setTimeout(() => {
					this.isRotating = false;
				}, 100);
			}
        });
        this.setState({
            test: 'asdasd'
        })

    }
	componentDidMount() {
		const elBody = document.getElementsByTagName('body')[0];
		elBody.addEventListener('click', e => {
			if(!e.target.classList.contains('sjx-hdl') && !e.target.classList.contains('sjx-controls') && !this.isRotating) {
				if(this.xDraggables.length > 0) {
					this.xDraggables.forEach(item => {
						item.disable();
					});
				}
			}
        });
    }
    componentDidUpdate() {
        let el = document.querySelectorAll('.text-draggable');
        el.forEach(val=>{
            val.style.fontSize = val.getAttribute('font')+'px';
            val.style.color = val.getAttribute('color');
        });
    }


	render() {

		let cupTextsTemplate = this.props.cupText.map(({id, value, fontSize, color}) => (
			<div key={id} className="text-draggable"
            style={{position: 'absolute', 'left': 30, 'top': 30, padding: 20}}
            font={fontSize} color={color} onClick={this.handleTextClick.bind(this)}>{value}</div>
        ));

		return (
			<div id="containerParent" style={{'position': 'relative'}}>
                <img
                style={{width: '100%'}}
                    src="https://via.placeholder.com/900x900"
                    alt="Banner"
                />
                {cupTextsTemplate}
            </div>
		);
	}
};

const mapStateToProps = state => ({
	cupText: JSON.parse(JSON.stringify(selectCupText(state)))
})

export default connect(mapStateToProps)(CupBlueprint);
