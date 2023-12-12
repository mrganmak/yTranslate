import { LegacyTranslate } from './engines/LegacyTranslate.js'
import { NewestTranslate } from './engines/NewestTranslate.js'
import { BaseOptions, Engines, NewestTranslateOpions, TranslateOptions } from './types.js';
import ISO6391 from 'iso-639-1';

export * from './types.js'

export class Translator {
	private static _engineName: Engines = Engines.NEWEST;

	public static setEngine(engineName: Engines): void {
		this._engineName = engineName;
	}

	public static async translate(text: string, opts: NewestTranslateOpions | TranslateOptions): Promise<string> {
		if (!opts.to || !ISO6391.validate(opts.to)) throw new Error('Translation language (to) does not match ISO-639-1');
		if (opts.from && !ISO6391.validate(opts.from)) throw new Error('Translation language (from) does not match ISO-639-1');
		if (!opts.key) throw new Error('Unknown api key');
		Translator._checkTextOnErrors(text);

		const Engine = enginesList[this._engineName];
		if (!Engine) throw new Error(`Unknown engine name ${this._engineName}`);

		const engine = new Engine();
		return await engine.translate(text, opts);
	}

	public static async detectLanguage(text: string, opts: BaseOptions): Promise<string> {
		if (!opts.key) throw new Error('Unknown api key');
		Translator._checkTextOnErrors(text);

		const Engine = enginesList[this._engineName];
		if (!Engine) throw new Error(`Unknown engine name ${this._engineName}`);

		const engine = new Engine();
		return await engine.detectLanguage(text, opts);
	}

	private static _checkTextOnErrors(text: string): void {
		if (!text) throw new Error('Texts is undefined');
		if (typeof text !== 'string') throw new Error('Text can be only string');
	}
}

const enginesList = {
	[Engines.LEGACY]: LegacyTranslate,
	[Engines.NEWEST]: NewestTranslate
}
