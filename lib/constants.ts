export enum ProjectColors {
  watermelon = "bg-gradient-to-r from-rose-300 to-green-400",
  bluegreen = "bg-gradient-to-r from-green-300 to-indigo-600 ",
  purplish = "bg-gradient-to-r from-blue-200 to-indigo-600",
  vividpink = "bg-gradient-to-r from-fuchsia-600 to-pink-600",
  peachy = "bg-gradient-to-r from-rose-300 to-yellow-400",
  brightgreen = "bg-gradient-to-r from-lime-300 to-emerald-600",
}

export type ProjectColor = keyof typeof ProjectColors;
