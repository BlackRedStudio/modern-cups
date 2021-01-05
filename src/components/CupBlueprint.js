import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';
import BlueprintText from './cup-blueprint-elements/BlueprintText';

class CupBlueprint extends Component {
	xDraggables = {};
	isRotating = false;
	blueprintRef = React.createRef();
	prevPos = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}];
	previousImgHeight = 100;

	handleTextClick(e) {
		const xElem = subjx(e.target);
		this.xDraggables = xElem.drag({
			container: '#containerParent',
			restrict: '#containerParent',
			snap: {
				x: 30,
				y: 30,
				angle: 10,
			},
			resizable: false,
			onRotate: () => {
				this.isRotating = true;
			},
			onDrop: () => {
				this.updatePositions();
				setTimeout(() => {
					this.isRotating = false;
				}, 100);
			},
		});
	}
	componentDidMount() {
		const elBody = document.getElementsByTagName('body')[0];
		elBody.addEventListener('click', e => {
			if (
				!e.target.classList.contains('sjx-hdl') &&
				!e.target.classList.contains('sjx-controls') &&
				!this.isRotating
			) {
				if (this.xDraggables.length > 0) {
					this.xDraggables.forEach(item => {
						item.disable();
					});
				}
			}
		});

		let childNodes = this.blueprintRef.current.childNodes;
		let ratio = 1;

		window.onresize = () => {
			childNodes.forEach((v, k) => {
				if (k === 0) {
					ratio = v.offsetHeight / this.previousImgHeight;
					ratio = ratio.toFixed(3);
					console.log(ratio)
				}
				if (v.classList.contains('text-draggable')) {
					let matrix = v.style.transform;
					matrix = matrix.slice(7, -1);
					let matrixArr = matrix.split(',');
					matrixArr[0] = ratio;
					matrixArr[3] = ratio;
					matrixArr[4] = this.prevPos[k - 1].x * ratio;
					matrixArr[5] = this.prevPos[k - 1].y * ratio;
					matrix = 'matrix(' + matrixArr.join() + ')';
					v.style.transform = matrix;
				}
			});
		};
	}
	componentDidUpdate() {
		let childNodes = this.blueprintRef.current.childNodes;
		this.previousImgHeight = childNodes[0].offsetHeight;

		this.updatePositions();
	}
	updatePositions() {
		let childNodes = this.blueprintRef.current.childNodes;
		childNodes.forEach((v, k) => {
			if (v.classList.contains('text-draggable')) {
				let matrix = v.style.transform;
				matrix = matrix.slice(7, -1);
				let matrixArr = matrix.split(',');
				this.prevPos[k - 1].x = matrixArr[4];
				this.prevPos[k - 1].y = matrixArr[5];
			}
		});
	}

	render() {
		const cupText = this.props.cup.cupText;
		let cupTextsTemplate = cupText.map(props => (
			<BlueprintText key={props.id} props={props} click={this.handleTextClick.bind(this)} />
		));

		return (
			<div ref={this.blueprintRef} id="containerParent" style={{ position: 'relative' }}>
				<img id="test" style={{ width: '100%' }} src="./img/kubek1.jpg" alt="Banner" />
				{cupTextsTemplate}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cup: state.cup,
});

export default connect(mapStateToProps)(CupBlueprint);
