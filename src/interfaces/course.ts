
interface Course {
  _id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  featured?: boolean;
  status: CourseStatus;
}

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published"
}

export type { Course };
