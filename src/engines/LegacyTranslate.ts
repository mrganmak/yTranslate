import { BaseOptions, TranslateOptions } from "../types.js";
import { BaseEngine } from "./BaseEngine.js";
import fetch from 'node-fetch';

const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json';

export class LegacyTranslate extends BaseEngine {
	public async translate(text: string, opts: TranslateOptions): Promise<string> {
		const fetchResults = await fetch(
			`${API_URL}/translate?key=${opts.key}&lang=${opts.from ? `${opts.from}-${opts.to}` : `${opts.to}`}&text=${encodeURIComponent(text)}`, 
			{
				headers: {
					'Content-Type': 'application/json',
				},
				body: '',
				method: 'POST'
			}
		);

		const response = await fetchResults.json() as any;

		if (response.code !== 200) throw new Error(response.message);
		else return response.text[0];
	}
	
	public async detectLanguage(text: string, opts: BaseOptions): Promise<string> {
		const fetchResults = await fetch(`${API_URL}/detect?key=${opts.key}&text=${encodeURIComponent(text)}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			body: '',
			method: 'POST'
		});

		const response = await fetchResults.json() as any;

		if (response.code !== 200) throw new Error(response.message);
		else return response.lang;
	}
}
