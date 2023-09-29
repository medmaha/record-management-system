// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authUser: {
				id: number;
				name: string;
				username: string;
				role: 'Read' | 'Staff' | 'Superuser' | 'Manager';
			};
			company: {
				name: string;
				manager: any;
				telephone: any;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
