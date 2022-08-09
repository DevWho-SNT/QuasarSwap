import addresses from "../constants/contracts";
import { Address } from "../types";

export const getNftAddress = (nftAddresses: Address, chainId: number): string => {
  return nftAddresses[chainId];
};

export const getQuasarProfileAddress = (chainId: number): string => {
  return addresses.quasarProfile[chainId];
};
