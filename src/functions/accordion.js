export default function accordion(node, isOpen) {
	let initialHeight = node.offsetHeight;
	node.style.height = isOpen ? 'auto' : 0;
	node.style.overflow = 'hidden';
	return {
		update(isOpen) {
			console.log(initialHeight);
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
				{ duration: 75, fill: 'both' }
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
