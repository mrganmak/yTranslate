import { BaseOptions, TranslateOptions } from "../types.js";

export abstract class BaseEngine {
	public abstract translate(text: string, opts: TranslateOptions): Promise<string>

	public abstract detectLanguage(text: string, opts: BaseOptions): Promise<string>
}

