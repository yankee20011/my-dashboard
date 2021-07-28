export interface PostType {
  id?: number;
  title?: string;
  description?: string;
  date?: string | number | readonly string[] | undefined;
  tags?: string;
  category?: string;
}
