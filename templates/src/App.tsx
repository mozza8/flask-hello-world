// import dependencies
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import components
import Inputs from "./sections/Inputs";
import DisplaySection from "./sections/DisplaySection";

// import constants

// import types
import { HolderAddress, TokenData } from "./types/types";

// import styles
import { theme } from "./theme/theme";

function App() {
  const [tokenHolders, setTokenHolders] = useState<HolderAddress[]>([]);
  const [tokenData, setTokenData] = useState<TokenData | null>();
  const [selectedChain, setSelectedChain] = useState("1");
  const [inputValue, setInputValue] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={2}
      >
        <Typography variant="h4" color="primary">
          TOP TOKEN HOLDERS
        </Typography>
      </Grid>

      <Inputs
        setTokenHolders={setTokenHolders}
        setTokenData={setTokenData}
        setSelectedChain={setSelectedChain}
        setInputValue={setInputValue}
        selectedChain={selectedChain}
        inputValue={inputValue}
      />

      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            sx={{ width: "130vh" }}
            justifyContent={"center"}
            spacing={10}
          >
            <Typography variant="h6">
              Token:{" "}
              {tokenData && (
                <img height={16} width={16} src={tokenData?.logos[0].uri} />
              )}{" "}
              {tokenData?.symbol}
            </Typography>
            <Typography variant="h6">
              Current price: {tokenData && `${tokenData.current_usd_price} $`}
            </Typography>
          </Stack>

          <Box
            sx={{
              mt: 10,
              width: "1300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DisplaySection
              holders={tokenHolders}
              setTokenHolders={setTokenHolders}
              selectedChain={selectedChain}
              inputValue={inputValue}
              tokenData={tokenData}
            />
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
