export const imageUrl = import.meta.env.VITE_IMG_URL || "/images/";
export const defaultLimit = 200;
export const limitArray = [10, 20, 30, 40, 50];


export const ACCOUNT_ROLES = [
  { value: "user", label: "User", canCreate: [] },
  { value: "agent", label: "Agent", canCreate: ["user"] },
  { value: "master", label: "Master", canCreate: ["agent", "user"] },
  { value: "supermaster", label: "SuperMaster", canCreate: ["master", "agent", "user"] },
];

export function getCreatableRoles(currentRole) {
  const roleObj = ACCOUNT_ROLES.find(r => r.value === currentRole);
  if (!roleObj || !Array.isArray(roleObj.canCreate)) return [];

  return ACCOUNT_ROLES.filter(r => roleObj.canCreate.includes(r.value));
}

export const gameNames = [
  { id: 1, title: "Football" },
  { id: 2, title: "Tennis" },
  { id: 26420387, title: "Mixed Martial Arts" },
  { id: 4, title: "Cricket" },
  { id: 3, title: "Golf" },
  { id: 6, title: "Boxing" },
  { id: null, title: "Beach Volleyball" },
  { id: null, title: "Table Tennis" },
  { id: null, title: "Futsal" },
  { id: 7, title: "Horse Racing" },
  { id: null, title: "E Games" },
  { id: 7522, title: "Basketball" },
  { id: null, title: "MotoGP" },
  { id: null, title: "Chess" },
  { id: 998917, title: "Volleyball" },
  { id: null, title: "Ice Hockey" },
  { id: null, title: "Badminton" },
  { id: 11, title: "Cycling" },
  { id: null, title: "Motorbikes" },
  { id: null, title: "Athletics" },
  { id: null, title: "Basketball 3X3" },
  { id: null, title: "Sumo" },
  { id: null, title: "Virtual sports" },
  { id: null, title: "Handball" },
  { id: 2378961, title: "Politics" },
  { id: 8, title: "Motor Sports" },
  { id: 7511, title: "Baseball" },
  { id: 5, title: "Rugby Union" },
  { id: 1477, title: "Rugby League" },
  { id: 3503, title: "Darts" },
  { id: 6423, title: "American Football" },
  { id: 6422, title: "Snooker" },
  { id: 1, title: "Soccer" },
  { id: 27454571, title: "Esports" },
  { id: 4339, title: "Greyhound Racing" },
  { id: null, title: "Kabaddi" },
  { id: null, title: "Boat Racing" },
  { id: null, title: "Esoccer" },
  { id: null, title: "Wrestling" },
];

export const specialGames = ["7", "4339"];