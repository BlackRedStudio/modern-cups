import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';
import BlueprintText from './cup-blueprint-elements/BlueprintText';

class CupBlueprint extends Component {

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

	render() {
		const cupText = this.props.cup.cupText;
		let cupTextsTemplate = cupText.map(props => (
			<BlueprintText key={props.id} props={props} click={this.handleTextClick.bind(this)} />
        ));

		return (
			<div id="containerParent" style={{'position': 'relative'}}>
                <img
                style={{width: '100%'}}
                    src="./img/kubek1.jpg"
                    alt="Banner"
                />
                {cupTextsTemplate}
            </div>
		);
	}
};

const mapStateToProps = state => ({
	cup: state.cup
})

export default connect(mapStateToProps)(CupBlueprint);
