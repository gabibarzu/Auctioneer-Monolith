namespace Monolith.Entities.Account
{
    public class AccountStat
    {
        public int TotalNumberOfBids { get; set; }
        public decimal HighestBid { get; set; }
        public decimal LowestBid { get; set; }
        public decimal TotalMoneySpent { get; set; }
    }
}