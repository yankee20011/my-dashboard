export interface PostType {
  id: number;
  title: string;
  description: string;
  date: string | Date;
  tags: string[];
  category: string;
}
