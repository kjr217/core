//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import { LiquidityPosition } from '../libraries/LiquidityPosition.sol';
import { Account } from '../libraries/Account.sol';
import { VPoolWrapperMock } from './mocks/VPoolWrapperMock.sol';
import { VTokenAddress } from '../libraries/VTokenLib.sol';

import { VPoolFactory } from '../VPoolFactory.sol';

import { console } from 'hardhat/console.sol';

contract LiquidityPositionTest {
    using LiquidityPosition for LiquidityPosition.Info;
    // using Uint48L5ArrayLib for uint48[5];

    Account.BalanceAdjustments public balanceAdjustments;
    LiquidityPosition.Info public lp;
    VPoolWrapperMock public wrapper;

    constructor() {
        wrapper = new VPoolWrapperMock();
    }

    function initialize(int24 tickLower, int24 tickUpper) external {
        lp.initialize(tickLower, tickUpper);
    }

    function updateCheckpoints() external {
        lp.update(wrapper, balanceAdjustments);
    }

    function netPosition() public view returns (int256) {
        return lp.netPosition(wrapper);
    }

    function liquidityChange(int128 liquidity) public {
        lp.liquidityChange(liquidity, wrapper, balanceAdjustments);
    }

    function maxNetPosition(VTokenAddress vToken) public view returns (uint256) {
        return lp.maxNetPosition(vToken);
    }

    function baseValue(uint160 sqrtPriceCurrent, VTokenAddress vToken) public view returns (uint256) {
        return lp.baseValue(sqrtPriceCurrent, vToken, wrapper);
    }
}
