export const addressDummyData = [
	{
		name: '123 Bakau New Town',
		region: 'BJL'
	},
	{
		name: '456 Serrekunda',
		region: 'BJL'
	},
	{
		name: '789 Fajara',
		region: 'BJL'
	},
	{
		name: '101 Banjulinding',
		region: 'BJL'
	},
	{
		name: '202 Lamin',
		region: 'BJL'
	},
	{
		name: '303 Brikama',
		region: 'WCR'
	},
	{
		name: '404 Soma',
		region: 'LRR'
	},
	{
		name: '505 Farafenni',
		region: 'NBR'
	},
	{
		name: '606 Georgetown',
		region: 'CRR'
	},
	{
		id: 10,
		name: '707 Janjanbureh',
		region: 'CRR'
	},
	{
		id: 11,
		name: '808 Bansang',
		region: 'CRR'
	},
	{
		id: 12,
		name: '909 Kuntaur',
		region: 'CRR'
	}
	// Add more items as needed
];

export const branchDummyData = [
	{
		name: 'Banjul Branch',
		staffId: 1,
		receiptId: 1,
		addressId: 1,
		telephone: '123-456-7890',
		date_opened: '2023-01-01T09:00:00Z'
	},
	{
		name: 'Serrekunda Branch',
		staffId: 2,
		receiptId: 2,
		addressId: 2,
		telephone: '987-654-3210',
		date_opened: '2023-02-15T10:30:00Z'
	},
	{
		name: 'Brikama Branch',
		staffId: 3,
		receiptId: 3,
		addressId: 3,
		telephone: '555-123-4567',
		date_opened: '2023-03-10T11:15:00Z'
	},
	{
		name: 'Banjulinding Branch',
		staffId: 4,
		receiptId: 4,
		addressId: 4,
		telephone: '999-888-7777',
		date_opened: '2023-04-20T14:00:00Z'
	},
	{
		name: 'Lamin Branch',
		staffId: 5,
		receiptId: 5,
		addressId: 5,
		telephone: '333-444-5555',
		date_opened: '2023-05-05T15:45:00Z'
	},
	{
		name: 'Farafenni Branch',
		staffId: 6,
		receiptId: 6,
		addressId: 6,
		telephone: '111-222-3333',
		date_opened: '2023-06-18T09:30:00Z'
	},
	{
		name: 'Georgetown Branch',
		staffId: 7,
		receiptId: 7,
		addressId: 7,
		telephone: '777-888-9999',
		date_opened: '2023-07-02T12:20:00Z'
	}
];

export const transferDummyData = [
	{
		id: 1,
		fromBranchId: 1,
		toBranchId: 2,
		staffId: 1,
		receiptId: 1,
		transfer_remarks: 'Moving staff to new branch',
		transferDate: '2023-01-10T14:00:00Z'
	},
	{
		id: 2,
		fromBranchId: 2,
		toBranchId: 3,
		staffId: 2,
		receiptId: 2,
		transfer_remarks: 'Staff relocation for better performance',
		transferDate: '2023-02-20T15:30:00Z'
	},
	{
		id: 3,
		fromBranchId: 3,
		toBranchId: 1,
		staffId: 3,
		receiptId: 3,
		transfer_remarks: 'Addressing staffing needs',
		transferDate: '2023-03-15T11:45:00Z'
	},
	{
		id: 4,
		fromBranchId: 1,
		toBranchId: 4,
		staffId: 4,
		receiptId: 4,
		transfer_remarks: 'Opening a new branch location',
		transferDate: '2023-04-05T10:15:00Z'
	},
	{
		id: 5,
		fromBranchId: 4,
		toBranchId: 2,
		staffId: 5,
		receiptId: 5,
		transfer_remarks: 'Staff reallocation for efficiency',
		transferDate: '2023-05-12T13:45:00Z'
	}
];

function getRandomDate(start: any, end: any) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Example usage
const startDate = new Date('2023-01-01T00:00:00Z'); // Start date
const endDate = new Date('2023-12-31T23:59:59Z'); // End date

const randomDate = getRandomDate(startDate, endDate);
console.log(randomDate);

export const staffDummyData = [
	{
		id: 1,
		name: 'Aminata Jallow',
		position: 'Software Developer',
		department: 'Development',
		gender: 'Female',
		telephone: '+220 123-4567',
		branchId: 1,
		addressId: 1,
		receiptId: 1,
		date_hired: '2023-01-05T09:00:00Z'
	},
	{
		id: 2,
		name: 'Baboucarr Touray',
		position: 'Network Administrator',
		department: 'IT',
		gender: 'Male',
		telephone: '+220 234-5678',
		branchId: 2,
		addressId: 2,
		receiptId: 2,
		date_hired: '2023-02-10T10:30:00Z'
	},
	{
		id: 3,
		name: 'Fatoumata Sowe',
		position: 'Database Analyst',
		department: 'IT',
		gender: 'Female',
		telephone: '+220 345-6789',
		branchId: 3,
		addressId: 3,
		receiptId: 3,
		date_hired: '2023-03-15T11:45:00Z'
	},
	{
		id: 4,
		name: 'Sulayman Njie',
		position: 'Systems Engineer',
		department: 'IT',
		gender: 'Male',
		telephone: '+220 456-7890',
		branchId: 4,
		addressId: 4,
		receiptId: 4,
		date_hired: '2023-04-20T14:00:00Z'
	},
	{
		id: 5,
		name: 'Mariama Sarr',
		position: 'UI/UX Designer',
		department: 'Design',
		gender: 'Female',
		telephone: '+220 567-8901',
		branchId: 5,
		addressId: 5,
		receiptId: 5,
		date_hired: '2023-05-25T15:30:00Z'
	},
	{
		id: 6,
		name: 'Lamin Ceesay',
		position: 'Technical Support Specialist',
		department: 'Support',
		gender: 'Male',
		telephone: '+220 678-9012',
		branchId: 6,
		addressId: 6,
		receiptId: 6,
		date_hired: '2023-06-30T16:45:00Z'
	},
	{
		id: 7,
		name: 'Ndey Sallah',
		position: 'Project Manager',
		department: 'Management',
		gender: 'Female',
		telephone: '+220 789-0123',
		branchId: 7,
		addressId: 7,
		receiptId: 7,
		date_hired: '2023-07-05T17:30:00Z'
	},
	{
		id: 8,
		name: 'Omar Jagne',
		position: 'Software Engineer',
		department: 'Development',
		gender: 'Male',
		telephone: '+220 890-1234',
		branchId: 1,
		addressId: 8,
		receiptId: 8,
		date_hired: '2023-08-10T18:15:00Z'
	},
	{
		id: 9,
		name: 'Sainabou Jammeh',
		position: 'IT Consultant',
		department: 'Consulting',
		gender: 'Female',
		telephone: '+220 901-2345',
		branchId: 2,
		addressId: 9,
		receiptId: 9,
		date_hired: '2023-09-15T19:00:00Z'
	},
	{
		id: 10,
		name: 'Modou Ndiaye',
		position: 'Network Engineer',
		department: 'IT',
		gender: 'Male',
		telephone: '+220 912-3456',
		branchId: 3,
		addressId: 10,
		receiptId: 10,
		date_hired: '2023-10-20T20:00:00Z'
	},
	{
		id: 11,
		name: 'Yassin Jallow',
		position: 'System Analyst',
		department: 'IT',
		gender: 'Male',
		telephone: '+220 923-4567',
		branchId: 4,
		addressId: 11,
		receiptId: 11,
		date_hired: '2023-11-25T21:00:00Z'
	},
	{
		id: 12,
		name: 'Sira Njie',
		position: 'Database Administrator',
		department: 'IT',
		gender: 'Female',
		telephone: '+220 934-5678',
		branchId: 5,
		addressId: 12,
		receiptId: 12,
		date_hired: '2023-12-01T22:00:00Z'
	}
];

export const userDummyData = [
	{
		id: 1,
		name: 'Fatou Bah',
		username: 'fatoubah',
		password: 'test123',
		phone: '+220 123-4567',
		isActive: true,
		createdAt: '2023-01-01T10:00:00Z',
		updatedAt: '2023-01-01T10:00:00Z',
		role: 'Read',
		receiptId: 1
	},
	{
		id: 2,
		name: 'Lamin Sarr',
		username: 'laminsarr',
		password: 'test123',
		phone: '+220 234-5678',
		isActive: true,
		createdAt: '2023-01-02T11:30:00Z',
		updatedAt: '2023-01-02T11:30:00Z',
		role: 'Staff',
		receiptId: 2
	},
	{
		id: 3,
		name: 'Aminata Jallow',
		username: 'aminataj',
		password: 'test123',
		phone: '+220 345-6789',
		isActive: true,
		createdAt: '2023-01-03T12:45:00Z',
		updatedAt: '2023-01-03T12:45:00Z',
		role: 'Superuser',
		receiptId: 3
	},
	{
		id: 4,
		name: 'Omar Ceesay',
		username: 'omarceesay',
		password: 'test123',
		phone: '+220 456-7890',
		isActive: true,
		createdAt: '2023-01-04T14:15:00Z',
		updatedAt: '2023-01-04T14:15:00Z',
		role: 'Manager',
		receiptId: 4
	},
	{
		id: 5,
		name: 'Ndey Sallah',
		username: 'ndeysallah',
		password: 'test123',
		phone: '+220 567-8901',
		isActive: true,
		createdAt: '2023-01-05T15:30:00Z',
		updatedAt: '2023-01-05T15:30:00Z',
		role: 'Read',
		receiptId: 5
	},
	{
		id: 6,
		name: 'Kebba Jagne',
		username: 'kebbajagne',
		password: 'test123',
		phone: '+220 678-9012',
		isActive: true,
		createdAt: '2023-01-06T16:45:00Z',
		updatedAt: '2023-01-06T16:45:00Z',
		role: 'Staff',
		receiptId: 6
	},
	{
		id: 7,
		name: 'Mariama Ceesay',
		username: 'mariamaceesay',
		password: 'test123',
		phone: '+220 789-0123',
		isActive: true,
		createdAt: '2023-01-07T17:30:00Z',
		updatedAt: '2023-01-07T17:30:00Z',
		role: 'Read',
		receiptId: 7
	},
	{
		id: 8,
		name: 'Sulayman Jammeh',
		username: 'sulaymanj',
		password: 'test123',
		phone: '+220 890-1234',
		isActive: true,
		createdAt: '2023-01-08T18:15:00Z',
		updatedAt: '2023-01-08T18:15:00Z',
		role: 'Read',
		receiptId: 8
	},
	{
		id: 9,
		name: 'Binta Dibba',
		username: 'bintadibba',
		password: 'test123',
		phone: '+220 901-2345',
		isActive: true,
		createdAt: '2023-01-09T19:00:00Z',
		updatedAt: '2023-01-09T19:00:00Z',
		role: 'Staff',
		receiptId: 9
	},
	{
		id: 10,
		name: 'Ebrima Jallow',
		username: 'ebrimaj',
		password: 'test123',
		phone: '+220 912-3456',
		isActive: true,
		createdAt: '2023-01-10T20:00:00Z',
		updatedAt: '2023-01-10T20:00:00Z',
		role: 'Read',
		receiptId: 10
	}
];
