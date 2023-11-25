export default interface orderBidding {
  didWin: Boolean;
  price: number;
  biddingId: number;
  product: {
    endDate: Date;
    imgUrl: string;
  };
}
