export interface IPhoto {
  _id?: string;
  image?: string;
  title: string;
  name: string;
  social: SocialLink[];
}
export interface SocialLink {
  platform: string;
  url: string;
}
