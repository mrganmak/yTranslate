export interface BaseOptions {
	key: string;
}

export interface TranslateOptions extends BaseOptions {
	from?: string;
	to: string;
}

export interface NewestTranslateOpions extends TranslateOptions {
	glossaryConfig?: Glossary;
}

export interface Glossary {
	glossaryData: { glossaryPairs: GlossaryPair[] };
}

export interface GlossaryPair {
	sourceText: string;
	translatedText: string;
}

export enum Engines {
	LEGACY = 'legacy',
	NEWEST = 'newest'
}
