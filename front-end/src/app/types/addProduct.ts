export default interface AddProduct {
  title: string;
  category: string;
  imgUrl: string;
  initialPrice: number;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: number;
}
