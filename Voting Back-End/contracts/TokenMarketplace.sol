// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenMarketplace{

    using SafeERC20 for IERC20;
    using SafeMath for uint;

    uint public tokenPrice = 2e9 wei;
    uint public sellerCount = 1;
    uint public buyerCount;

    IERC20 public aviToken;

    event TokenPriceUpdated(uint newPrice);
    event TokenBought(address indexed buyer, uint amount, uint tokenPrice);
    event TokenSold(address indexed seller, uint amount, uint tokenPrice);

    constructor(address _erc20Token){
        aviToken = IERC20(_erc20Token);
    }

    function calculateTokenPrice() public{
        require(buyerCount!=0, "There must be atleast 1 buyer");
        tokenPrice = (tokenPrice.mul(buyerCount)).div(sellerCount);
        emit TokenPriceUpdated(tokenPrice);
    }

    function buyAVIToken(uint amountOfTokens) public payable {
        uint priceToPay = tokenPrice*(amountOfTokens/1e18);
        require(msg.value==priceToPay, "Insufficient amount!");
        aviToken.safeTransfer(msg.sender, amountOfTokens);      //safeTransfer - safe 'transfer' function from safeERC20
        buyerCount+=1;
        emit TokenBought(msg.sender, amountOfTokens, tokenPrice);
    }

    function sellAVIToken(uint amountOfTokens) public payable {
        require(aviToken.balanceOf(msg.sender) >= amountOfTokens, "Not enough tokens to sell!");
        uint amountToPayTheUser = tokenPrice.mul(amountOfTokens).div(1e18);
        //transfer tokens to the smart contract account
        aviToken.safeTransferFrom(msg.sender, address(this), amountOfTokens);   //safeTransferFrom - safe 'transferFrom' function from safeERC20
        //wei transfer to the user account
        (bool success,) = msg.sender.call{value:amountToPayTheUser}("");
        require(success, "Transfer failed!");
        sellerCount+=1;
        emit TokenSold(msg.sender, amountOfTokens, tokenPrice);
    }

    fallback() external payable {

    }

     receive() external payable {

    }
    
}