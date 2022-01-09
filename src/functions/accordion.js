export default function accordion(node, isOpen) {
	node.style.height = isOpen ? 'auto' : 0;
	node.style.overflow = 'hidden';
	return {
		update(isOpen) {
			let initialHeight = 28;
			node.childNodes.forEach((child) => {
				console.log(child.clientHeight)
				initialHeight += child.clientHeight ? child.clientHeight : 0;
			})
			let animation = node.animate(
				[
					{
						height: initialHeight + 'px',
						overflow: 'hidden'
					},
					{
						height: 0,
						overflow: 'hidden'
					}
				],
				{ duration: 60, fill: 'both' }
			);
			animation.pause();
			if (!isOpen) {
				animation.play();
			} else {
				animation.reverse();
			}
		}
	};
}
