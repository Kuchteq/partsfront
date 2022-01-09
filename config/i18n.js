import {
    locale,
    addMessages,
    _,
    init,
    getLocaleFromNavigator
} from 'svelte-i18n';
import en from '/config/lang/en.json';
import pl from '/config/lang/pl.json';

addMessages('en', en);
addMessages('pl', pl);
init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
})

function setupI18n({ withLocale: _locale } = { withLocale: 'pl' }) {
    locale.set(_locale);
}
export {
    _,
    setupI18n
};