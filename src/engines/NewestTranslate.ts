import { BaseOptions, NewestTranslateOpions } from "../types.js";
import { BaseEngine } from "./BaseEngine.js";
import fetch from 'node-fetch';

const API_URL = 'https://translate.api.cloud.yandex.net/translate/v2';

export class NewestTranslate extends BaseEngine {
	public async translate(text: string, opts: NewestTranslateOpions): Promise<string> {
		const fetchResults = await fetch(`${API_URL}/translate`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Api-Key ${opts.key}`
			},
			body: JSON.stringify({
				texts: text,
				targetLanguageCode: opts.to,
				sourceLanguageCode: opts.from,
				glossaryConfig: opts.glossaryConfig
			}),
			method: 'POST'
		});

		const response = await fetchResults.json() as any;

		if (response.message) throw new Error(response.message);
		else return response.translations[0].text;
	}
	
	public async detectLanguage(text: string, opts: BaseOptions): Promise<string> {
		const fetchResults = await fetch(`${API_URL}/detect`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Api-Key ${opts.key}`
			},
			body: JSON.stringify({
				text: text,
			}),
			method: 'POST'
		});

		const response = await fetchResults.json() as any;

		if (response.message) throw new Error(response.message);
		else return response.languageCode;
	}
}
