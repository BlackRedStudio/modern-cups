import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';
import BlueprintImage from './cup-blueprint-elements/BlueprintImage';
import BlueprintText from './cup-blueprint-elements/BlueprintText';

class CupBlueprint extends Component {
	xDraggables = {};
	isRotating = false;

	handleElementClick(e) {
		const xElem = subjx(e.target);

		this.xDraggables = xElem.drag({
			container: '#containerParent',
			restrict: '#containerParent',
			snap: {
				x: 10,
				y: 10,
				angle: 10,
			},
			resizable: e.target.nodeName === 'IMG' ? true : false,
			onRotate: () => {
				this.isRotating = true;
			},
			onDrop: () => {
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
	}

	render() {
		const { cupText, cupImage } = this.props.cup;
		let cupTextsTemplate = cupText.map(props => (
			<BlueprintText key={props.id} props={props} click={this.handleElementClick.bind(this)} />
		));

		let cupImagesTemplate = cupImage.map(image => (
			image.imgPreviewUrl && <BlueprintImage
				key={image.key}
				imgSrc={image.imgPreviewUrl}
				click={this.handleElementClick.bind(this)}
			/>
		));
		return (
			<div id="containerParent" style={{ position: 'relative' }}>
				<img style={{ width: '100%', objectFit: 'cover', maxHeight: 'calc(100vh - 64px)' }} src="./img/kubek1.jpg" alt="Banner" />
				{cupImagesTemplate}
				{cupTextsTemplate}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cup: state.cup,
});

export default connect(mapStateToProps)(CupBlueprint);
