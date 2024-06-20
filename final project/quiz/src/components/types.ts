export type Login = {
	username: string,
	password: string;
	user: string;
};

export type Quiz = {
	qid: number;
	question: string;
	answers: [];
	right: string;
};

export type Score = {
	username: string,
	qid: number;
	score: number;
};

export type props = {
    score: number;
}
