import React, { Component } from 'react';
import { connect } from 'react-redux';

import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';
import BlueprintImage from './cup-blueprint-elements/BlueprintImage';
import BlueprintText from './cup-blueprint-elements/BlueprintText';
import '../style.scss';

class CupBlueprint extends Component {
	xDraggables = {};
	isRotating = false;

	componentDidUpdate() {
		this.initializeSjxLibrary();
	}
	componentDidMount() {
		this.initializeSjxLibrary();
	}
	initializeSjxLibrary = () => {
		setTimeout(()=>{
			if (this.xDraggables.length > 0) {
				this.xDraggables.forEach(item => {
					item.disable();
				});
			}
			let xElem = subjx('.text-draggable, .image-draggable');

			this.xDraggables = xElem.drag({
				restrict: '#containerParent',
				snap: {
					x: 10,
					y: 10,
					angle: 10,
				},
				resizable: true,
				onRotate: () => {
					this.isRotating = true;
				},
				onDrop: () => {
					setTimeout(() => {
						this.isRotating = false;
					}, 100);
				},
			});
			if (this.xDraggables.length > 0) {
				let sjxWrapper = document.querySelectorAll('.sjx-wrapper');
				sjxWrapper.forEach(v => v.style.display = 'none');
			}
		}, 1)

	}
	handleElementMouseOver = e => {
		let index = e.target.getAttribute('index');
		let sjxWrappers = document.querySelectorAll('#containerParent > .sjx-wrapper');
		let sjxWrapper = sjxWrappers[index - 1];
		sjxWrapper.style.display = 'initial';
	}
	handleImageElementMouseOver = e => {
		let index = e.target.getAttribute('index');
		let sjxWrappers = document.querySelectorAll('#containerImages > .sjx-wrapper');
		let sjxWrapper = sjxWrappers[index];
		sjxWrapper.style.display = 'initial';
	}
	handlePreviewImageMouseOver = e => {
		let sjxWrappers = document.querySelectorAll('.sjx-wrapper');
		sjxWrappers.forEach(v => v.style.display = 'none');
	}

	render() {
		const { cupText, cupImage } = this.props.cup;
		let cupTextsTemplate = cupText.map(props => (
			<BlueprintText key={props.id} index={props.id} props={props} mouseOver={this.handleElementMouseOver} />
		));

		let cupImagesTemplate = cupImage.map(image => (
			image.imgPreviewUrl && <BlueprintImage
				key={image.key}
				index={image.key}
				imgSrc={image.imgPreviewUrl}
				mouseOver={this.handleImageElementMouseOver}
			/>
		));
		return (
			<div id="containerParent" style={{ position: 'relative' }}>
				<img onMouseOver={this.handlePreviewImageMouseOver} style={{ width: '100%', objectFit: 'cover', maxHeight: 'calc(100vh - 64px)' }} src="./img/kubek1.jpg" alt="Banner" />
				<div id="containerImages">
					{cupImagesTemplate}
				</div>
				{cupTextsTemplate}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cup: state.cup,
});

export default connect(mapStateToProps)(CupBlueprint);
