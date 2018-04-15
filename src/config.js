/** Game constants */
import ifEmoji from "if-emoji";

export const ROUNDS_COUNT = 12;
export const TIMEOUT = 1200;
export const MIN_RESULTS_COUNT = 6;
export const LEVELS = [
  {
    allowZero: false,
    maxValue: 10
  }
];

export const POLICE_ICONS = [
  "🚓",
  "🚔",
  "🚔",
  "👮‍♂",
  "👮‍♀️",
  "🚨",
  "👮🏻",
  "👮🏿",
  "👮🏽",
  "👮🏽‍♀️",
  "👮🏻‍♂️",
  "👮🏾",
  "👮🏽‍♂️",
  "👮🏻‍♀️",
  "👮🏿‍♂️",
  "👮🏿‍♀️",
  "👮🏼",
  "👮🏾‍♀️",
  "👮🏼‍♂️",
  "👮🏾‍♂️"
].filter(ifEmoji);

export const PALEONTOLOGIST_ICONS = [
  "🦕",
  "🦖",
  "⛏️",
  "🔬",
  "⚒️",
  "🎒",
  "🗺️",
  "🖌️",
  "🏜️",
  "🛩️",
  "📚",
  "📖"
].filter(ifEmoji);

export const GENERAL_ICONS = [
  "💀",
  "♥️",
  "👅",
  "🔥",
  "🐰",
  "🍎",
  "🍌",
  "🍐",
  "🚂",
  "🐱",
  "🐵",
  "🐶",
  "🐷",
  "🐹",
  "🦒",
  "🥑",
  "🥦",
  "🦁",
  "🐗",
  "🐧",
  "🐦",
  "🐸",
  "🦎",
  "🦋",
  "🐜",
  "🐛",
  "🐝",
  "🌱",
  "🍄",
  "🌷",
  "🌻",
  "🌙",
  "☀️",
  "⭐",
  "☁️",
  "☃️",
  "🍇",
  "🍉",
  "🍋",
  "🍍",
  "🥥",
  "🍅",
  "🍆",
  "🥕",
  "🌽",
  "🧀"
].filter(ifEmoji);

export const ICONS = PALEONTOLOGIST_ICONS;
