import { get } from 'svelte/store';
import { _ } from '/config/i18n.js';

let segmentsMap = [
	{ value: 1, label: _ => _("processor") },
	{ value: 2, label: _ => _("motherboard") },
	{ value: 3, label: _ => _("graphics_card") },
	{ value: 4, label: _ => _("ram") },
	{ value: 5, label: _ => _("hdd_storage") },
	{ value: 6, label: _ => _("ssd_storage") },
	{ value: 7, label: _ => _("power_supply") },
	{ value: 8, label: _ => _("cooling") },
	{ value: 9, label: _ => _("computer_case") },
	{ value: 10, label: _ => _("sound_card") },
	{ value: 11, label: _ => _("monitor") },
	{ value: 12, label: _ => _("network_card") },
	{ value: 13, label: _ => _("mouse") },
	{ value: 14, label: _ => _("keyboard") },
	{ value: 15, label: _ => _("printer") },
	{ value: 16, label: _ => _("printer_ink") },
	{ value: 17, label: _ => _("speakers") },
	{ value: 18, label: _ => _("microphone") },
	{ value: 19, label: _ => _("router") },
	{ value: 20, label: _ => _("webcam") },
	{ value: 21, label: _ => _("license") },
	{ value: 22, label: _ => _("bluetooth_module") },
	{ value: 23, label: _ => _("tablet") },
	{ value: 24, label: _ => _("phone") },
	{ value: 25, label: _ => _("tv") },
	{ value: 26, label: _ => _("projectors") },
	{ value: 27, label: _ => _("drawing_tablet") },
	{ value: 28, label: _ => _("misc_lb") }
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

