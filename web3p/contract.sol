// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    
    address public owner;
    mapping(address => StakingInfo) StakingAmount;
    
    uint256 Time = 86400;
    uint256 stakeReward = 1;

    struct  StakingInfo { 
    uint256 stakingRewardPercentage;
    uint256 stakingAmount;
    uint256 startTime;
    uint256 stkaingTime;

    }

    constructor(uint256 initialSupply) ERC20("TEST", "TT") {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
       
    }
      function mint_token(uint256 amount) public {
        require(msg.sender == owner);
        _mint(owner, amount);
    }
    // being 1 is 0.01
    function transferContractStakeRewards(uint256 amount) payable public {
        require(msg.sender == owner);
        transfer(address(this), amount);
    }
    function setStakingReward(uint256 rewardPercentage) public {
        
        require(msg.sender == owner);
        require(rewardPercentage > 0 && rewardPercentage < 10001);
        stakeReward = rewardPercentage;
    }

    function setStakingTime(uint256 amount) public {
        require(msg.sender == owner);
        require(amount > 86400);
        _mint(owner, amount);
    }

    function stakeTokens (uint256 amount) public {
     require(amount > 999); 
     _transfer(msg.sender,address(this),amount);
     StakingInfo memory newUserStake;
     newUserStake.stakingRewardPercentage = stakeReward;
     newUserStake.stakingAmount = amount ;
     newUserStake.startTime = block.timestamp;
     newUserStake.stkaingTime = Time;

     StakingAmount[msg.sender] = newUserStake;

    } 
    function showMystake() public view returns (StakingInfo memory mystake) {

        return StakingAmount[msg.sender];
    }
    function unstake () payable public {
     require(StakingAmount[msg.sender].startTime + StakingAmount[msg.sender].stkaingTime < block.timestamp,"Your staking time is not over please wait");
     require(StakingAmount[msg.sender].stakingAmount>0, "You have no stkaing at the moment");
     uint256 totalTokens = StakingAmount[msg.sender].stakingAmount + StakingAmount[msg.sender].stakingAmount/100*StakingAmount[msg.sender].stakingRewardPercentage;
     _transfer(address(this), msg.sender,totalTokens);
     delete StakingAmount[msg.sender];

    } 

    

}