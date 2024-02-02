// import dependecies
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import components
import Watchlist from "./Watchlist";
import HoldersTable from "./HoldersTable";

// import services
import { getTopHolders, getWatchlist } from "../api/services/backend";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface DisplaySectionProps {
  holders: HolderAddress[];
  setTokenHolders: React.Dispatch<React.SetStateAction<HolderAddress[]>>;
  selectedChain: string;
  tokenData: TokenData | null | undefined;
  inputValue: string;
}

const DisplaySection = ({
  holders,
  setTokenHolders,
  selectedChain,
  inputValue,
  tokenData,
}: DisplaySectionProps) => {
  const [value, setValue] = useState("1");
  const [watchlistAddresses, setWatchlistAddresses] = useState([]);

  const changeTable = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleWatchlist = async () => {
    try {
      const watchlistData = await getWatchlist();
      setWatchlistAddresses(watchlistData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleTopHolders = async () => {
    try {
      const topHolders = await getTopHolders(selectedChain, inputValue);
      setTokenHolders(topHolders);
    } catch (error) {
      console.log("Error getting holders");
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        width: "1300px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TabContext value={value}>
        <TabList onChange={changeTable} aria-label="basic tabs example">
          <Tab
            key="Tab one"
            label="Holders"
            onClick={handleTopHolders}
            value="1"
          />
          <Tab
            key="Tab two"
            onClick={handleWatchlist}
            label="Watchlist"
            value="2"
          />
        </TabList>
        <TabPanel value="1">
          <HoldersTable
            holders={holders}
            selectedChain={selectedChain}
            inputValue={inputValue}
            tokenData={tokenData}
          />
        </TabPanel>
        <TabPanel value="2">
          <Watchlist
            holders={watchlistAddresses}
            handleWatchlist={handleWatchlist}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DisplaySection;
