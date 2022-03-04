import { get } from 'svelte/store';
import { _ } from '/config/i18n.js';

let segmentsMap = [
	{ value: 1, label: _ => _("Processor") },
	{ value: 2, label: _ => _("Motherboard") },
	{ value: 3, label: _ => _("Graphics Card") },
	{ value: 4, label: _ => _("RAM") },
	{ value: 5, label: _ => _("HDD Storage") },
	{ value: 6, label: _ => _("SSD Storage") },
	{ value: 7, label: _ => _("Power Supply") },
	{ value: 8, label: _ => _("Cooling") },
	{ value: 9, label: _ => _("Computer case") },
	{ value: 10, label: _ => _("Sound card") },
	{ value: 11, label: _ => _("Monitor") },
	{ value: 12, label: _ => _("Network card") },
	{ value: 13, label: _ => _("Mouse") },
	{ value: 14, label: _ => _("Keyboard") },
	{ value: 15, label: _ => _("Printer") },
	{ value: 16, label: _ => _("Printer Ink") },
	{ value: 17, label: _ => _("Speakers") },
	{ value: 18, label: _ => _("Microphone") },
	{ value: 19, label: _ => _("Router") },
	{ value: 20, label: _ => _("Webcam") },
	{ value: 21, label: _ => _("License") },
	{ value: 22, label: _ => _("Bluetooth Module") },
	{ value: 23, label: _ => _("Tablet") },
	{ value: 24, label: _ => _("Phone") },
	{ value: 25, label: _ => _("TV") },
	{ value: 26, label: _ => _("Projectors") },
	{ value: 27, label: _ => _("Drawing Tablet") },
	{ value: 28, label: _ => _("Misc") }
];
segmentsMap = segmentsMap.map(segment => {
	return {
		value: segment.value,
		label: segment.label(get(_))
	}
});
const segmentsLabels = segmentsMap.map(segment => segment.label);
export { segmentsLabels };
export default segmentsMap;
