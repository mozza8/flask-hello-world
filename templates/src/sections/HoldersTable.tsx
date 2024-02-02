// import dependencies
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// import components
import TableRowHolders from "./TableRowHolders";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface HoldersTableProps {
  holders: HolderAddress[];
  selectedChain: string;
  inputValue: string;
  tokenData: TokenData | null | undefined;
}

const HoldersTable = ({
  holders,
  selectedChain,
  inputValue,
  tokenData,
}: HoldersTableProps) => {
  return (
    <TableContainer
      sx={{ borderRadius: "25px" }}
      component={Paper}
      elevation={1}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "100px" }}
              align="left"
            >
              Number
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "520px" }}
              align="left"
            >
              Address
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "310px" }}
              align="left"
            >
              Token Amount
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "290px" }}
              align="left"
            >
              Usd value
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "200px" }}
              align="right"
            >
              Add to watchlist
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holders &&
            holders.map((holder: HolderAddress, index) => (
              <TableRowHolders
                key={holder.wallet_address}
                index={index}
                holder={holder}
                selectedChain={selectedChain}
                inputValue={inputValue}
                tokenData={tokenData}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldersTable;
