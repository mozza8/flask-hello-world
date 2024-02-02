// import dependecies
import { Button, TableCell, TableRow, Typography } from "@mui/material";

// import services
import {
  getLastTransactionBscScan,
  getLastTransactionEtherscan,
} from "../api/services/thirdParty";
import { addToWatchlist } from "../api/services/backend";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface TableRowHoldersProps {
  holder: HolderAddress;
  index: number;
  selectedChain: string;
  inputValue: string;
  tokenData: TokenData | null | undefined;
}
const TableRowHolders = ({
  holder,
  index,
  selectedChain,
  inputValue,
  tokenData,
}: TableRowHoldersProps) => {
  const handleAddToWatchlist = async () => {
    console.log("selectedChain", selectedChain);
    console.log("selectedChain", typeof selectedChain);
    // const blockchain = chainsIds.find((item) => item.id = selectedChain)

    switch (selectedChain) {
      case "1":
        console.log("get Ether tx");
        try {
          const lastTransaction = await getLastTransactionEtherscan(
            inputValue,
            holder.wallet_address
          );
          if (tokenData) {
            await addToWatchlist(
              holder.wallet_address,
              lastTransaction.tokenSymbol,
              lastTransaction.value,
              lastTransaction.timeStamp,
              tokenData?.decimals,
              "Ethereum"
            );
          }
        } catch (error) {
          console.log("Some error", error);
        }
        break;

      case "56":
        console.log("get Bsc tx");
        try {
          const lastTransaction = await getLastTransactionBscScan(
            inputValue,
            holder.wallet_address
          );
          if (tokenData) {
            console.log("lastTransaction", lastTransaction);
            await addToWatchlist(
              holder.wallet_address,
              lastTransaction.tokenSymbol,
              lastTransaction.value,
              lastTransaction.timeStamp,
              tokenData?.decimals,
              "Binance Smart Chain"
            );
          }
        } catch (error) {
          console.log("Some error", error);
        }
        break;
    }
  };

  return (
    <TableRow
      key={holder.wallet_address}
      sx={{
        backgroundColor: "secondary",
        borderRadius: "10px",
      }}
    >
      <TableCell align="left">
        <Typography variant="body1"> {index + 1}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{holder.wallet_address}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">
          {Math.trunc(holder.amount).toLocaleString("fi-FI")}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">
          ${Math.trunc(holder.usd_value).toLocaleString("fi-FI")}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1">
          <Button color={"primary"} onClick={handleAddToWatchlist}>
            Add
          </Button>
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowHolders;
