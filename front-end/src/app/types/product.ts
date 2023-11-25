export default interface Product {
  id: number;
  title: string;
  imgUrl: string;
  initialPrice: number;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: number;
}
