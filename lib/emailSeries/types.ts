// A block is a paragraph of simple HTML (strong, em, a), or one of these.
export type Block =
  | string
  | { button: [label: string, href: string] }
  | { center: string }
  | { small: string };

export type SeriesEmail = {
  // Days after sign-up (or after the quiz) that this email goes out.
  day: number;
  subject: string;
  preview: string;
  blocks: Block[];
};
