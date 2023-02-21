import { Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

import dotenv from "dotenv";

dotenv.config();

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment, a: any) {
  console.log(`Running deploy script for the Greeter contract`);

  let here = -1;

  console.log(++here, "🔵 Initialize wallet");
  const wallet = new Wallet(process.env.PRIVATE_KEY as string);
  console.log(++here, "🔵 Wallet initializated");

  console.log(++here, "🔵 Creating deployer");
  const deployer = new Deployer(hre, wallet);

  console.log(++here, "🔵 Load artifact");
  const artifact = await deployer.loadArtifact("Greeter");

  const greeting = "Hi there!";

  console.log(++here, "🔵 Estimate contract deployment fee");
  const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);
  console.log(`🔵 Estimated gas cost ${deploymentFee}`);

  // OPTIONAL: Deposit funds to L2
  // Comment this block if you already have funds on zkSync.
  // console.log("🔵 Sending ETH from L1 (goerli)", ++here);
  // const depositHandle = await deployer.zkWallet.deposit({
  //   to: deployer.zkWallet.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: deploymentFee.mul(2), // Double so it's enough in case of miss-estimation
  // });
  // // Wait until the deposit is processed on zkSync
  // await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(
    ++here,
    `🔵 The deployment is estimated to cost ${parsedFee} ETH`
  );

  console.log(++here, "🔵 Deploying greeting");
  const greeterContract = await deployer.deploy(artifact, [greeting]);

  // Obtain the Constructor Arguments
  console.log(
    ++here,
    `🔵 Constructor Args: ${greeterContract.interface.encodeDeploy([greeting])}`
  );

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(
    ++here,
    `🔵 ${artifact.contractName} was deployed to ${contractAddress}`
  );
}
