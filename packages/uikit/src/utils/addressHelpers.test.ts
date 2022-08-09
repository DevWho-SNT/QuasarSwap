import addresses from "../constants/contracts";
import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from "../constants/common";
import { getQuasarProfileAddress } from "./addressHelpers";

describe("addressHelpers", () => {
  it("getAddress returns correct mainnet address", () => {
    const profileAddress = getQuasarProfileAddress(MAINNET_CHAIN_ID);
    expect(profileAddress).toBe(addresses.quasarProfile[MAINNET_CHAIN_ID]);
  });
  it("getAddress returns correct testnet address", () => {
    const profileAddress = getQuasarProfileAddress(TESTNET_CHAIN_ID);
    expect(profileAddress).toBe(addresses.quasarProfile[TESTNET_CHAIN_ID]);
  });
});
