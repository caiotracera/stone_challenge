export default interface IAddFavoriteDTO {
  user_id: string;
  favorite_id: number;
  type: 'characters' | 'comics';
}
