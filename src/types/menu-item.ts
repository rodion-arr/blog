export type MenuItem = {
  anchor: string;
} & ({ link: string } | { children: MenuItem[] });
