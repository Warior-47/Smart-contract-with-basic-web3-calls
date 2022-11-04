import mycont from "./contract.json"; //contract.json7
import { React, useState } from "react";
import Web3Modal from "web3modal";

const contaddress = "0xBb09a5633689C86Ede1E7f034E4cb9b598Eb5156"; //Replace this address with your contract address
const Web3 = require("web3");
const { ethers, BigNumber } = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);

var web3 = new Web3("HTTP://127.0.0.1:7545");

const App = (props) => {
  const [amount, setAmount] = useState("");
  const [stakingTime, setStakingTime] = useState("");
  const [stakingReward, setStakingReward] = useState("");
  const [amountContract, setamountContract] = useState("");
  const [stakeToken, setStakeToken] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractConenction = new ethers.Contract(contaddress, mycont, signer);

    const tx = (signer.signature = await contractConenction.mint_token(amount));
    console.log(tx);
  };
  const handleOnClickTime = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
    const contractConenction = new ethers.Contract(contaddress, mycont, signer);

    const tx = (signer.signature = await contractConenction.setStakingTime(amount));
    console.log(tx);
  };

  const handleOnClickReward = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
    const contractConenction = new ethers.Contract(contaddress, mycont, signer);

    const tx = (signer.signature = await contractConenction.setStakingReward(amount));
    console.log(tx);
  };
  const handleOnClickTokenToContract = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
    const contractConenction = new ethers.Contract(contaddress, mycont, signer);

    const tx = (signer.signature = await contractConenction.transferContractStakeRewards(amount));
    console.log(tx);
  };
  const handleSetStake = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
    const contractConenction = new ethers.Contract(contaddress, mycont, signer);
    
    const tx = await contractConenction.stakeTokens(stakeToken)
    await tx.wait()

    console.
    console.log(tx);
  };
  return (
    <div>
      <form>
        <label>
          Mint Token:
          <input
            name="name"
            type="text"
            placeholder="Token minting ammount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" onClick={handleOnClick} />
      </form>
      <form>
        <label>
          Staking Time:
          <input
            name="name"
            type="text"
            placeholder="Set Staking Time"
            value={stakingTime}
            onChange={(e) => setStakingTime(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" onClick={handleOnClickTime} />
      </form>
      <form>
        <label>
          Staking Reward:
          <input
            name="name"
            type="text"
            placeholder="Set Staking Reward"
            value={stakingReward}
            onChange={(e) => setStakingReward(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" onClick={handleOnClickReward} />
      </form>
      <form>
        <label>
          Staking Reward:
          <input
            name="name"
            type="text"
            placeholder="Set Staking Reward"
            value={amountContract}
            onChange={(e) => setamountContract(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" onClick={handleOnClickTokenToContract} />
      </form>
      <form>
        <label>
          Stake Tokens:
          <input
            name="name"
            type="text"
            placeholder="Enter Token for Stake"
            value={stakeToken}
            onChange={(e) => setStakeToken(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" onClick={handleSetStake} />
      </form>
    </div>
  );
};

export default App;
