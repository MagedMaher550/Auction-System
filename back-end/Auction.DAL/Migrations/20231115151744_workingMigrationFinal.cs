using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auction.DAL.Migrations
{
    /// <inheritdoc />
    public partial class workingMigrationFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isFinished",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isFinished",
                table: "Products");
        }
    }
}
