// import dependencies
import {
  Grid,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import constants
import { chainsIds } from "../constants/chains";

// import services
import { getTopHolders } from "../api/services/backend";
import { getTokenData } from "../api/services/thirdParty";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface InputProps {
  setTokenHolders: React.Dispatch<React.SetStateAction<HolderAddress[]>>;
  setTokenData: React.Dispatch<
    React.SetStateAction<TokenData | null | undefined>
  >;
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedChain: string;
  inputValue: string;
}

const Inputs = ({
  setTokenHolders,
  setTokenData,
  setSelectedChain,
  setInputValue,
  selectedChain,
  inputValue,
}: InputProps) => {
  const handleChainChange = (event: SelectChangeEvent) => {
    setSelectedChain(event.target.value);
    setInputValue("");
    console.log("selected chain", event.target.value);
  };

  const handleAddress = (event: any) => {
    setInputValue(event.target.value);
  };

  const getTopHoldersAndTokenData = async () => {
    try {
      const topHolders = await getTopHolders(selectedChain, inputValue);
      setTokenHolders(topHolders);

      const dataToken = await getTokenData(selectedChain, inputValue);
      setTokenData(dataToken);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ mt: 5 }}
    >
      <Grid item>
        <Stack
          sx={{ width: "200vh" }}
          direction={"row"}
          justifyContent={"space-around"}
        >
          <Stack direction={"column"} spacing={2}>
            <Typography variant="h6">Choose chain:</Typography>
            <FormControl fullWidth>
              <Select
                labelId="chose-chain"
                value={selectedChain}
                onChange={handleChainChange}
                sx={{ width: "190px", height: 40, borderRadius: "25px", pl: 2 }}
                color="primary"
              >
                {chainsIds.map((item) => (
                  <MenuItem key={`chain-id-${item.id}`} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={"column"} spacing={2} sx={{ width: "45vh" }}>
            <Typography variant="h6">Paste address</Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <Input
                id="standard-adornment-amount"
                fullWidth
                value={inputValue}
                onChange={handleAddress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={getTopHoldersAndTokenData}
                      color="secondary"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Inputs;
