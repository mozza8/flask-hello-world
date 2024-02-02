import { apiKeyChainbase } from "../../constants/api";

export async function getTopHolders(chainId: string, contractAddress: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/top-holders?chain_id=${chainId}&contract_address=${contractAddress}&page=1&limit=100`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKeyChainbase,
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get top holders");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("Error getting top holders:", error);
    throw error;
  }
}

export async function getWatchlist() {
  try {
    const response = await fetch(
      `https://crypto-holders-watchlist.onrender.com/get-wallets`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get wachlist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting top holders:", error);
    throw error;
  }
}

export async function removeFromWatchlist(address: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/remove-wallet-address?address=${address}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from wachlist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error removing address:", error);
    throw error;
  }
}

export async function addToWatchlist(
  address: string,
  tokenSymbol: string,
  value: number,
  timeStamp: number,
  decimals: number,
  chain: string
) {
  try {
    const response = await fetch(
      `http://localhost:5000/add-wallet-address?address=${address}&token=${tokenSymbol}&value=${value}&time=${timeStamp}&decimals=${decimals}&blockchain=${chain}&decimals=${decimals}`,

      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add to wachlist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error adding address:", error);
    throw error;
  }
}
