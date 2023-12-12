# yTranslate

## Getting started

First of all install the library:
```bash
npm install ytranslate
```
Then import Translator:

```js
import { Translator } from "ytranslate";
```
# Usage
After including package you can choose which engine you want to use (newest by default):
```js
import { Engines, Translator } from "ytranslate";

Translator.setEngine(Engines.LEGACY);
```

The Legacy engine is used if you are using the old API and have **trns1.1...** format keys.
And then newest engine is used for new API version with **XXXXXXXXXX-XXXXXXX-XXXXXX** format keys.

Translation example
```js
import { Translator } from "ytranslate";

const KEY = '<Your-seecret-key>';

const result = await Translator.translate('hello, world', { key: KEY, to: 'ru' });
console.log(result);
```

## All methods
- **`translate`** This method is designed to translate the specified text. Takes a `string` and `translateSettings` as input.
- **`detectLanguage`** This method is designed to determine the writing language for the specified text. Takes the `string` and `baseSettings` as input.

## baseSettings
- **`key`** The value is of type `string`. **Obligatory field**. Your secret key to access the API.

## translateSettings
- **`key`** The value is of type `string`. **Obligatory field**. Your secret key to access the API.
- **`to`** The value is of type `string`. **Obligatory field**. Language to be translated into.
- **`from`** The value is of type `string`. **Optional field**. Language to be translated from.
- **`glossaryConfig`** (ONLY IN NEWEST ENGINE) The value is of type `object`. **Optional field**. Glossary for use in translation.
	-  **`glossaryData`** The value is of type `object`. **Obligatory field**. Pass the contents of the glossary in the request.
		- **`glossaryPairs[]`** The value is of type `object`. **Obligatory field**. Array of text pairs. The maximum total length of all source texts is 10,000 characters. The maximum total length of all translated texts is 10,000 characters. The number of elements must be in the range from 1 to 50.
			- **`sourceText`** The value is of type `string`. **Obligatory field**. Text in original language.
			- **`translatedText`** The value is of type `string`. **Obligatory field**. Text in target language.
