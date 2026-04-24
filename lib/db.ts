// This is a simple in-memory mock database.
// In a real application, you would use Prisma, Mongoose, or another ORM.

export interface Candidate {
  id: string;
  name: string;
}

export interface Election {
  id: string;
  title: string;
  organization: string;
  description: string;
  candidates: Candidate[];
  status: 'active' | 'scheduled' | 'archived' | 'ending_soon';
  voters: number;
  participation: number;
  endDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Verified' | 'Suspicious' | 'Blocked';
  votesCast: number;
  joinedDate: string;
}

// Initial Mock Data
let elections: Election[] = [
  {
    id: "1",
    title: "Student Council President",
    organization: "University Elections 2026",
    description: "Vote for the next student council president who will represent student interests.",
    candidates: [{ id: "c1", name: "Alice" }, { id: "c2", name: "Bob" }],
    status: "active",
    voters: 5420,
    participation: 43,
    endDate: "2026-04-20"
  },
  {
    id: "2",
    title: "Faculty Representative",
    organization: "University Elections 2026",
    description: "Select representatives for each faculty to voice concerns at university meetings.",
    candidates: [{ id: "c3", name: "Charlie" }, { id: "c4", name: "David" }],
    status: "active",
    voters: 2100,
    participation: 12,
    endDate: "2026-04-22"
  }
];

let users: User[] = [
  { id: "1", name: "John Doe", email: "john@university.edu", role: 'user', status: "Verified", votesCast: 4, joinedDate: "Jan 12, 2026" },
  { id: "2", name: "Sarah Smith", email: "sarah.s@gmail.com", role: 'user', status: "Verified", votesCast: 2, joinedDate: "Feb 05, 2026" },
  { id: "3", name: "Admin User", email: "admin@securevote.com", role: 'admin', status: "Verified", votesCast: 0, joinedDate: "Jan 01, 2026" },
];

interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  userId: string;
  timestamp: string;
}

let votes: Vote[] = [];

export const db = {
  getElections: () => elections,
  getElectionById: (id: string) => elections.find(e => e.id === id),
  addElection: (election: Omit<Election, 'id' | 'voters' | 'participation'>) => {
    const newElection: Election = {
      ...election,
      id: Math.random().toString(36).substring(2, 9),
      voters: 0,
      participation: 0
    };
    elections.push(newElection);
    return newElection;
  },
  deleteElection: (id: string) => {
    elections = elections.filter(e => e.id !== id);
    votes = votes.filter(v => v.electionId !== id);
  },
  
  getUsers: () => users,
  getUserById: (id: string) => users.find(u => u.id === id),
  deleteUser: (id: string) => {
    users = users.filter(u => u.id !== id);
    // Optionally remove their votes too
    // votes = votes.filter(v => v.userId !== id);
  },

  castVote: (electionId: string, candidateId: string, userId: string) => {
    // Check if user already voted in this election
    if (votes.some(v => v.electionId === electionId && v.userId === userId)) {
      return { error: "User already voted" };
    }

    const newVote: Vote = {
      id: Math.random().toString(36).substring(2, 9),
      electionId,
      candidateId,
      userId,
      timestamp: new Date().toISOString()
    };
    votes.push(newVote);

    // Update election stats (simple simulation)
    const election = elections.find(e => e.id === electionId);
    if (election) {
      election.voters += 1;
      // participation is usually a percentage, let's just increment for demo
      election.participation = Math.min(100, Math.round((election.voters / 100) * 100)); 
    }

    return { success: true };
  },

  getResults: (electionId: string) => {
    const election = elections.find(e => e.id === electionId);
    if (!election) return null;

    const results = election.candidates.map(candidate => ({
      ...candidate,
      votes: votes.filter(v => v.electionId === electionId && v.candidateId === candidate.id).length
    }));

    return {
      title: election.title,
      totalVotes: votes.filter(v => v.electionId === electionId).length,
      results
    };
  }
};
