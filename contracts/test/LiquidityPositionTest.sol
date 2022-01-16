//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import { LiquidityPosition } from '../libraries/LiquidityPosition.sol';
import { Account } from '../libraries/Account.sol';
import { VPoolWrapperMock } from './mocks/VPoolWrapperMock.sol';
import { IVToken } from '../libraries/VTokenLib.sol';
import { IVToken } from '../libraries/VTokenLib.sol';

import { IClearingHouse } from '../interfaces/IClearingHouse.sol';
import { IVPoolWrapper } from '../interfaces/IVPoolWrapper.sol';

import { AccountProtocolInfoMock } from './mocks/AccountProtocolInfoMock.sol';

import { console } from 'hardhat/console.sol';

contract LiquidityPositionTest is AccountProtocolInfoMock {
    using LiquidityPosition for LiquidityPosition.Info;
    // using Uint48L5ArrayLib for uint48[5];

    IClearingHouse.BalanceAdjustments public balanceAdjustments;
    LiquidityPosition.Info public lp;
    VPoolWrapperMock public wrapper;

    constructor() {
        wrapper = new VPoolWrapperMock();
    }

    function initialize(int24 tickLower, int24 tickUpper) external {
        lp.initialize(tickLower, tickUpper);
    }

    function updateCheckpoints() external {
        IVPoolWrapper.WrapperValuesInside memory wrapperValuesInside = wrapper.getValuesInside(
            lp.tickLower,
            lp.tickUpper
        );
        lp.update(0, IVToken(address(0)), wrapperValuesInside, balanceAdjustments);
    }

    function netPosition() public view returns (int256) {
        return lp.netPosition(wrapper);
    }

    function liquidityChange(int128 liquidity) public {
        lp.liquidityChange(0, IVToken(address(0)), liquidity, wrapper, balanceAdjustments);
    }

    function maxNetPosition() public view returns (uint256) {
        return lp.maxNetPosition();
    }

    function baseValue(uint160 sqrtPriceCurrent) public view returns (int256) {
        return lp.baseValue(sqrtPriceCurrent, wrapper);
    }
}
