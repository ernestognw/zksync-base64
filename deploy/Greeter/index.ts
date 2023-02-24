import { HardhatRuntimeEnvironment } from "hardhat/types";
import { fullDeploy } from "../utils";
import constructorArgs from "./args";

export default (hre: HardhatRuntimeEnvironment) =>
  fullDeploy(hre, {
    name: "Greeter",
    constructorArgs,
    // OPTIONAL: Deposit funds to L2
    // Comment this line if you already have funds on zkSync.
    // fund: true
  });
