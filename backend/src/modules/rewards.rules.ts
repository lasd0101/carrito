export const REWARD_RULES = {
  ADD_TO_CART: 5,
  FAVORITE: 3,
} as const;

export type RewardAction = keyof typeof REWARD_RULES;

export const REWARD_ACTIONS = Object.keys(REWARD_RULES) as [RewardAction, ...RewardAction[]];

export function pointsFor(action: RewardAction): number {
  return REWARD_RULES[action];
}